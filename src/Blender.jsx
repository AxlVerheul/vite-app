import React, { useRef, useState } from 'react';

function Blender({fruits = []}) {
    console.log('Blender received fruits:', fruits);
    const imgRef = useRef(null);
    const [replaced, setReplaced] = useState(false);
    const [animating, setAnimating] = useState(false);

    // Click handler: rotate 360deg with a ramp-up feel and shrink during the last 180deg.
    function handleClick() {
        if (animating || replaced) return;
        const el = imgRef.current;
        if (!el) return;
        setAnimating(true);

        // Keyframes approximate a ramp-up by spacing offsets; the last half scales down.
        const keyframes = [
            { transform: 'rotate(0deg) scale(1)' , offset: 0 },
            { transform: 'rotate(90deg) scale(1)' , offset: 0.25 },
            { transform: 'rotate(180deg) scale(0.95)' , offset: 0.5 },
            { transform: 'rotate(270deg) scale(0.8)' , offset: 0.75 },
            { transform: 'rotate(360deg) scale(0.6)' , offset: 1 }
        ];

        const timing = {
            duration: 1400,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // gives an initial acceleration feel
            iterations: 1,
            fill: 'forwards'
        };

        const animation = el.animate(keyframes, timing);
        animation.onfinish = () => {
            setAnimating(false);
            // replace the image with the placeholder text
            setReplaced(true);
        };
    }

    // Hover styles are applied via event handlers so the hover effect is disabled while animating.
    function handleMouseEnter(e) {
        if (animating || replaced) return;
        const t = e.currentTarget;
        // Use drop-shadow so the glow follows the PNG alpha (not the image's bounding box)
        t.style.transition = 'transform 160ms ease, filter 160ms ease';
        t.style.transform = 'scale(1.08)';
        t.style.filter = 'drop-shadow(0 6px 18px rgba(0, 120, 255, 0.8))';
    }

    function handleMouseLeave(e) {
        if (animating || replaced) return;
        const t = e.currentTarget;
        t.style.transform = 'scale(1)';
        t.style.filter = 'none';
    }

    function generateMilkshakeName(fruits) {
        if (fruits.length !== 3) return "Pick exactly 3 fruits!";

        const fruitMap = {
            "🍌": "Banana",
            "🍓": "Strawberry",
            "🍑": "Peach",
            "🍒": "Cherry"
        };

        // Convert emojis to names
        const fruitNames = fruits.map(f => fruitMap[f] || "fruit");

        // Count occurrences
        const counts = {};
        fruitNames.forEach(fruit => counts[fruit] = (counts[fruit] || 0) + 1);
        const uniqueFruits = Object.keys(counts);

        // All three the same
        if (uniqueFruits.length === 1) {
            return `Triple ${uniqueFruits[0]} Delight`;
        }

        // Two the same
        if (uniqueFruits.length === 2) {
            const doubleFruit = uniqueFruits.find(fruit => counts[fruit] === 2);
            const singleFruit = uniqueFruits.find(fruit => counts[fruit] === 1);
            return `Double ${doubleFruit} + ${singleFruit} Twist`;
        }

        // All different → creative names
        const templates = [
            `${fruitNames[0]}-${fruitNames[1]} ${fruitNames[2]} Surprise`,
            //`Tropical ${fruitNames[0]} & ${fruitNames[1]} Mix`,
            //`Rainbow ${fruitNames.join(", ")}!`,
            `Fruity ${fruitNames.join("-")} Explosion`,
            `${fruitNames[0]} Meets ${fruitNames[1]} & ${fruitNames[2]}`
        ];

        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        return randomTemplate;
    }


    return (
        <div>
            {!replaced ? (
                <img
                    ref={imgRef}
                    src="blender.png"
                    alt="Blender"
                    style={{ width: '100px', height: '100px', cursor: animating ? 'default' : 'pointer' }}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            ) : (
                <div style={{ fontSize: '16px', fontWeight: 600 }}>{generateMilkshakeName(fruits)}</div>
            )}
        </div>
    );
}

export default Blender;
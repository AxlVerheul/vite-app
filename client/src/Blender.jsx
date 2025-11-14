import React, { useRef, useState } from 'react';
import NutritionFacts from './NutritionFacts';
import fruitEmojis from './fruitEmojis';

function Blender({fruits = [], selectedFruits = [], onDeselectFruit, onToggleFruit, milkshakeReady = false, onMilkshakeReady}) {
    const [animating, setAnimating] = useState(false);
    const [hoveredFruitIndex, setHoveredFruitIndex] = useState(null);
    const imgRef = useRef(null);

    // Click handler: rotate 360deg with a ramp-up feel and shrink during the last 180deg.
    function handleClick() {
        if (animating || milkshakeReady) return;
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

            // Notify parent that milkshake is ready
            onMilkshakeReady(true);
        };
    }

    // Hover styles are handled via CSS classes in `src/App.css` (.blender / .blender--disabled)

    return (
        <div>
            <h2>2. Make your milkshake </h2>

            <div className="selected-fruits">
                {selectedFruits.map((item, index) => {
                    const fruitData = fruits.find(f => f.name === item.name);
                    const isHovered = hoveredFruitIndex === index;
                    
                    // Calculate totals for percentage calculation
                    const totals = {
                        calories: 0,
                        fat: 0,
                        sugar: 0,
                        protein: 0
                    };
                    
                    selectedFruits.forEach(selectedItem => {
                        if (!selectedItem.disabled) {
                            const f = fruits.find(fruit => fruit.name === selectedItem.name);
                            if (f && f.nutritions) {
                                totals.calories += f.nutritions.calories || 0;
                                totals.fat += f.nutritions.fat || 0;
                                totals.sugar += f.nutritions.sugar || 0;
                                totals.protein += f.nutritions.protein || 0;
                            }
                        }
                    });
                    
                    const getPercentage = (value, total) => {
                        if (total === 0) return '0%';
                        return ((value / total) * 100).toFixed(1) + '%';
                    };
                    
                    return (
                        <div
                            key={index}
                            style={{ position: 'relative', display: 'inline-block' }}
                            onMouseEnter={() => milkshakeReady && !item.disabled && setHoveredFruitIndex(index)}
                            onMouseLeave={() => setHoveredFruitIndex(null)}
                        >
                            <button 
                                className="emoji-button"
                                onClick={() => milkshakeReady ? onToggleFruit(index) : onDeselectFruit(index)}
                                style={{ opacity: milkshakeReady && item.disabled ? 0.3 : 1 }}
                            >
                                {fruitEmojis[item.name] || '❓'}
                            </button>
                            {isHovered && milkshakeReady && !item.disabled && fruitData && fruitData.nutritions && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    color: '#fff',
                                    padding: '0.75rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '0.5rem',
                                    zIndex: 10
                                }}>
                                    Cal: {getPercentage(fruitData.nutritions.calories, totals.calories)}<br/>
                                    Fat: {getPercentage(fruitData.nutritions.fat, totals.fat)}<br/>
                                    Sugar: {getPercentage(fruitData.nutritions.sugar, totals.sugar)}<br/>
                                    Protein: {getPercentage(fruitData.nutritions.protein, totals.protein)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div>
                {!milkshakeReady ? (
                    <img
                        ref={imgRef}
                        src="blender.png"
                        alt="Blender"
                        className={`blender ${animating ? 'blender--disabled' : ''}`}
                        onClick={selectedFruits.length > 0 ? handleClick : undefined}
                    />
                ) : (
                    <div>
                        <NutritionFacts fruits={selectedFruits
                            .filter(item => !item.disabled)
                            .map(item => fruits.find(fruit => fruit.name === item.name))
                            .filter(Boolean)} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Blender;
import React from 'react';
import Button from './Button';
import Blender from './Blender';

function Milkshake() {
    const [fruits, setFruits] = React.useState([]);

    function addFruit(fruit) {
        setFruits([...fruits, fruit])
        console.log('Added fruit:', fruit);
    }
    return (
        <div>
            <h2>Pick your fruits:</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden', maxHeight: fruits.length < 3 ? 500 : 0, transition: 'max-height 0.5s ease'}}>
                <Button name="🍌 Banana" onClick={() => addFruit("🍌")} />
                <Button name="🍓 Strawberry" onClick={() => addFruit("🍓")} />
                <Button name="🍑 Peach" onClick={() => addFruit("🍑")} />
                <Button name="🍒 Cherry" onClick={() => addFruit("🍒")} />
            </div>

            <h1>{fruits.join(' + ')}</h1>

            {fruits.length === 3 ? <Blender fruits={fruits} /> : null}

        </div>
    );
}

export default Milkshake;
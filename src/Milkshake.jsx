import React from 'react';
import Button from './Button';

function Milkshake() {
    const [fruits, setFruits] = React.useState([]);

    function addFruit(fruit) {
        setFruits([...fruits, fruit])
        console.log('Added fruit:', fruit);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2>{"Pick your fruits:"}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'  }}>
                <Button name="🍌 Banana" onClick={() => addFruit("🍌")} />
                <Button name="🍓 Strawberry" onClick={() => addFruit("🍓")} />
                <Button name="🍑 Peach" onClick={() => addFruit("🍑")} />
                <Button name="🍒 Cherry" onClick={() => addFruit("🍒")} />
            </div>
            <h1>{fruits.join(' + ')}</h1>
        </div>
    );
}

export default Milkshake;
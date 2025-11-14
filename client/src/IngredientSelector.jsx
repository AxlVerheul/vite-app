import popularFruits from './popularFruits';

function IngredientSelector({ fruits = [], selectedFruits = [], onSelectFruits = () => {}, smoothieReady = false }) {

    function selectFruit(fruit) {
        const updated = [...selectedFruits, { name: fruit, disabled: false }];
        onSelectFruits(updated);
    }

    function deselectFruit(fruitIndex) {
        const updated = selectedFruits.filter((_, index) => index !== fruitIndex);
        onSelectFruits(updated);
    }

    return (
        <div>
            <h2>1. Pick your ingredients</h2>
            <div>
                {fruits
                    .filter(fruit => popularFruits.includes(fruit.name))
                    .map(fruit => (
                        <button
                            key={fruit.name}
                            className="fruit-button"
                            onClick={() => selectFruit(fruit.name)}
                            disabled={smoothieReady}
                        >
                            {fruit.name}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default IngredientSelector;
function NutritionFacts({ fruits = [] }) {
    // Calculate nutrition totals
    const totals = {
        calories: 0,
        fat: 0,
        sugar: 0,
        protein: 0
    };

    fruits.forEach(fruit => {
        if (fruit.nutritions) {
            totals.calories += fruit.nutritions.calories || 0;
            totals.fat += fruit.nutritions.fat || 0;
            totals.sugar += fruit.nutritions.sugar || 0;
            totals.protein += fruit.nutritions.protein || 0;
        }
    });

    return (
        <div className="nutrition-facts">
            <h3>Nutrition Facts</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nutrient</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Calories</td>
                        <td>{totals.calories.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>Fat</td>
                        <td>{totals.fat.toFixed(1)}g</td>
                    </tr>
                    <tr>
                        <td>Sugar</td>
                        <td>{totals.sugar.toFixed(1)}g</td>
                    </tr>
                    <tr>
                        <td>Protein</td>
                        <td>{totals.protein.toFixed(1)}g</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default NutritionFacts;
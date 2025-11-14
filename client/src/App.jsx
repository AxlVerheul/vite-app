import { useState, useEffect } from 'react'
import './App.css'
import { getAllFruits } from './api';
import IngredientSelector from './IngredientSelector';
import Blender from './Blender';

function App() {
  const [fruits, setFruits] = useState([]);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [smoothieReady, setSmoothieReady] = useState(false);
  const [theme, setTheme] = useState('all'); // 'all', 'low-calorie', 'low-fat', 'low-sugar', 'high-protein'

  const thresholds = {
    'low-calorie': { calories: 33.0 },
    'low-fat': { fat: 0.2 },
    'low-sugar': { sugar: 4.5 }
  };

  const filteredFruits = theme === 'all' ? fruits : fruits.filter(fruit => {
    const threshold = thresholds[theme];
    const nutrition = fruit.nutritions;
    
    if (theme === 'low-calorie') return nutrition.calories <= threshold.calories;
    if (theme === 'low-fat') return nutrition.fat <= threshold.fat;
    if (theme === 'low-sugar') return nutrition.sugar <= threshold.sugar;
    
    return true;
  });

  useEffect(() => {
    getAllFruits()
      .then(fruits => setFruits(fruits))
      .catch(error => alert('Error fetching fruits:', error));
  }, []);

  function resetSelection() {
    setSelectedFruits([]);
    setSmoothieReady(false);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smoothie.app</h1>
        <p>Create your own, personalised smoothie!</p>
      </header>

      <div className="theme-switcher">
        <button 
          className={`theme-button ${theme === 'all' ? 'active' : ''}`}
          onClick={() => setTheme('all')}
        >
          All
        </button>
        <button 
          className={`theme-button ${theme === 'low-calorie' ? 'active' : ''}`}
          onClick={() => setTheme('low-calorie')}
        >
          Low Calorie
        </button>
        <button 
          className={`theme-button ${theme === 'low-fat' ? 'active' : ''}`}
          onClick={() => setTheme('low-fat')}
        >
          Low Fat
        </button>
        <button 
          className={`theme-button ${theme === 'low-sugar' ? 'active' : ''}`}
          onClick={() => setTheme('low-sugar')}
        >
          Low Sugar
        </button>
      </div>

      <div className="app-content">
        <section className="app-section ingredient-section">
          <IngredientSelector 
            fruits={filteredFruits} 
            selectedFruits={selectedFruits}
            smoothieReady={smoothieReady}
            onSelectFruits={setSelectedFruits} 
          />
        </section>

        <div className="app-divider"></div>

        <section className="app-section blender-section">
          <Blender 
            fruits={fruits} 
            selectedFruits={selectedFruits}
            smoothieReady={smoothieReady}
            onSmoothieReady={setSmoothieReady}
            onDeselectFruit={(index) => setSelectedFruits(prev => prev.filter((_, i) => i !== index))}
            onToggleFruit={(index) => setSelectedFruits(prev => {
              const updated = [...prev];
              updated[index] = { ...updated[index], disabled: !updated[index].disabled };
              return updated;
            })} 
          />
        </section>
      </div>

      {smoothieReady === true && (
        <button className="reset-button" onClick={resetSelection}>
          Make another one
        </button>
      )}
      {smoothieReady === false && selectedFruits.length > 0 && (
        <button 
          className="reset-button" 
          onClick={resetSelection}
          style={{ border: 'none', backgroundColor: 'transparent' }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default App

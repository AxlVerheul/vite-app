/**
 * Fetches all fruits from the Fruityvice API.
 * @returns {Promise<Array>} Array of fruit objects with properties like name, family, order, etc.
 * @throws {Error} If the request fails or response is not ok.
 */
export async function getAllFruits() {
  //const response = await fetch('https://www.fruityvice.com/api/fruit/all');
  const response = await fetch('/api/api/fruit/all'); // Goes through Vite proxy

  if (!response.ok) {
    throw new Error(`Failed to fetch fruits: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetches a single fruit by name.
 * @param {string} name - The name of the fruit to fetch.
 * @returns {Promise<Object>} Fruit object with properties like name, family, order, etc.
 * @throws {Error} If the request fails or response is not ok.
 */
export async function getFruitByName(name) {
  //const response = await fetch(`https://www.fruityvice.com/api/fruit/${name}`);
  const response = await fetch('/api/api/fruit/all/${name}'); // Goes through Vite proxy

  if (!response.ok) {
    throw new Error(`Failed to fetch fruit "${name}": ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

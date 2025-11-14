// Fetches all fruits from the Fruityvice API.
export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.status(200).json(data); // Return JSON to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

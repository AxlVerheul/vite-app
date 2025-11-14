// Fetch through serverless backend to avoid CORS issues
export async function getAllFruits() {
  const response = await fetch('/api/fruits');

  if (!response.ok) {
    throw new Error(`Failed to fetch fruits: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
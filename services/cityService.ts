
const GEODB_API_KEY = '7d0f195917msh87f5ec7666f54e2p15267ejsn8cb83e58b6df';

export const fetchCitySuggestions = async (query: string) => {
  if (!query) return [];
  console.log('Searching for:', query);
  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
    {
      headers: {
        'X-RapidAPI-Key': GEODB_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    }
  );
  
  const data = await response.json();
  console.log('Results:', data);
  return data.data.map((city: any) => `${city.city}, ${city.country}`);
};
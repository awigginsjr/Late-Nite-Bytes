import axios from 'axios';

const apiKey = process.env.VITE_GOOGLE_API_KEY;

const fetchCoordinates = async (zipCode) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;
  const response = await axios.get(geocodeUrl);
  if (response.data.results.length === 0) {
    throw new Error('No results found for the provided zip code.');
  }
  const location = response.data.results[0].geometry.location;
  return {
    lat: location.lat,
    lng: location.lng
  };
};

const fetchRestaurants = async (zipCode, radius = 5000, type = 'restaurant') => {
  try {
    const { lat, lng } = await fetchCoordinates(zipCode);
    const location = `${lat},${lng}`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data from Google Places API', error);
    throw error;
  }
};

export { fetchCoordinates, fetchRestaurants };

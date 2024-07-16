import axios from 'axios';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const fetchRestaurants = async (location, radius = 5000, type = 'restaurant') => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from Google Places API', error);
        throw error;
    }
};

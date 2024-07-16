import { fetchRestaurants } from './utils/googlePlaces';

const testAPI = async (zipCode) => {
    try {
        const data = await fetchRestaurants(zipCode);
        console.log('Restaurants:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Replace with a valid zip code
testAPI('29020');

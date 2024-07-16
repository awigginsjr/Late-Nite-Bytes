import React, { useEffect, useState } from 'react';
import { fetchRestaurants } from '../utils/googlePlaces'; // Ensure correct import path

const RestaurantList = ({ zipCode }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchRestaurants(zipCode); // Fetch from your API
                const data = await response.json();
                const filteredRestaurants = filterRestaurantsByHours(data);
                setRestaurants(filteredRestaurants);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (zipCode) {
            fetchData();
        }
    }, [zipCode]);

    const filterRestaurantsByHours = (restaurants) => {
        return restaurants.filter((restaurant) => {
            if (!restaurant.opening_hours || !restaurant.opening_hours.periods) {
                return false;
            }
            const periods = restaurant.opening_hours.periods;
            return periods.some((period) => {
                const openTime = period.open.time;
                const closeTime = period.close.time;

                // Check if the restaurant is open between 10 PM (2200) and 2 AM (0200)
                return (
                    (openTime <= '2200' && closeTime >= '0200') || // Open before 10 PM and closes after 2 AM
                    (openTime <= '2200' && closeTime === '0000') || // Open before 10 PM and closes at midnight
                    (openTime === '0000' && closeTime >= '0200') // Open at midnight and closes after 2 AM
                );
            });
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;




// testGooglePlaces.js
// const axios = require('axios');
// require('dotenv').config();

// const apiKey = process.env.VITE_GOOGLE_API_KEY;

// const fetchCoordinates = async (zipCode) => {
//     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;
//     const response = await axios.get(geocodeUrl);
//     if (response.data.results.length === 0) {
//         throw new Error('No results found for the provided zip code.');
//     }
//     const location = response.data.results[0].geometry.location;
//     return {
//         lat: location.lat,
//         lng: location.lng
//     };
// };

// const fetchRestaurants = async (zipCode, radius = 5000, type = 'restaurant') => {
//     try {
//         const { lat, lng } = await fetchCoordinates(zipCode);
//         const location = `${lat},${lng}`;
//         const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

//         const response = await axios.get(url);
//         return response.data.results;
//     } catch (error) {
//         console.error('Error fetching data from Google Places API', error);
//         throw error;
//     }
// };

// // Replace with a valid zip code for testing
// const testZipCode = '28269'; // Example: New York City

// const go = async () => {
//     try {
//         const restaurants = await fetchRestaurants(testZipCode);
//         console.log('Restaurants:', restaurants);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };


// useEffect(() => {
    
//     go();

// }, [])
    


    return (
        <div>
            <h1>Nearby Restaurants</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.place_id}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.photos[0]}</p>
                        <p>{restaurant.vicinity}</p>
                        <p>Rating: {restaurant.rating}</p>
                        {restaurant.opening_hours && restaurant.opening_hours.open_now && (
                            <p>Open Now</p>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={() => go()}>Refres</button>
        </div>
    );
};

export default RestaurantList;

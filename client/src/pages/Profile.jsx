import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ zipCode }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log(`Fetching coordinates for zip code: ${zipCode}`);
                const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
                console.log('Geocode response:', geocodeResponse.data);

                const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                console.log(`Coordinates: ${lat}, ${lng}`);

                console.log('Fetching nearby restaurants');
                const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
                console.log('Places response:', placesResponse.data);

                setRestaurants(placesResponse.data.results);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err);
                setLoading(false);
            }
        };

        if (zipCode) {
            fetchData();
        }
    }, [zipCode]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching restaurants: {error.message}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <h2>Favorite Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.place_id}>
                        <h3>{restaurant.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;

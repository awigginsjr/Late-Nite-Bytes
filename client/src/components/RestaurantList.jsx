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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/restaurants?zipCode=${zipCode}`);
                setRestaurants(response.data);  // Assuming response.data is an array of restaurants
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching restaurants: {error.message}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <h2>Favorite Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.restaurantId}>
                        <h3>{restaurant.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;

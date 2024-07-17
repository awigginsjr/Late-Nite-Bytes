import { useState, useEffect } from 'react';
// Import the necessary hook for authentication if using Auth0
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
import '../App.css';
import { useMutation } from '@apollo/client';
import { RESTAURANTS } from '../schemas/mutations';

function UserProfile() {
  const [zipCode, setZipCode] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loadRestaurants, { loading, error }] = useMutation(RESTAURANTS);

  const search = async (zip) => {
    let list = [];

    try {
      const { data } = await loadRestaurants({ variables: { areaCode: zip } });
      list = data.restaurants;
    } catch (err) {
      console.error(err);
    }

    setRestaurants(list);
  };

  const handleSearch = () => {
    if (zipCode) {
      search(zipCode);
    }
  };

  useEffect(() => {
    if (zipCode) {
      search(zipCode);
    }
  }, [zipCode]);

  console.log('restaurants', loading, restaurants);

  return (
    <div>
      <h1>Search Restaurants</h1>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter zip code"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {loading ? <p>Loading...</p> : 
        error ? <p>Error occurred</p> : 
        restaurants.map((restaurant, index) => (
          <div key={index}>
            <p>{restaurant.name}</p>
            <p>{restaurant.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;

import { useState, useEffect } from 'react';
// Import the necessary hook for authentication if using Auth0
// import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { RESTAURANTS } from '../schemas/mutations';

function UserProfile() {

  const [zipCode, setZipCode] = useState(null);

  const [restaurants, setRestaurants] = useState([]);

  const [loadRestaurants, { loading, error }] = useMutation(RESTAURANTS);

  const search = async (zip) =>
  {
    let list = [];

    try {
      const { data } = await loadRestaurants({ variables: { areaCode: zip } });

      list = data.restaurants;

    } catch(err) {};

    setRestaurants(list);
  };

  useEffect(() => {
    search();
  }, []);

  console.log('restaurants', loading, restaurants);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}

export default UserProfile;


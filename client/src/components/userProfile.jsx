
import { useState, useEffect } from 'react';
// Import the necessary hook for authentication if using Auth0
// import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { FAV_RESTAURANT } from '../utils/mutations';


function UserProfile() {
  // Uncomment the following line if using Auth0
  // const { user } = useAuth0();

  // Mocked user data for demonstration purposes
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    picture: 'https://via.placeholder.com/150',
    zipCode: '12345'
  };

  const [zipCode, setZipCode] = useState(user.zipCode);
  const [restaurants, setRestaurants] = useState([]);
  const [favoritedRestaurants, setFavoritedRestaurants] = useState([]);
 const [favRestaurant] = useMutation(FAV_RESTAURANT)
  const testList =[
    {id: 1, name: "Olive Garden"},
    {id: 2, name: "Chili's"},
    {id: 3, name: "Red Lobster"}
  ]

  // Fetch restaurants based on zip code
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`https://api.example.com/restaurants?zipCode=${zipCode}`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [zipCode]);

  const saveRestaurant = async (restaurantId) => {
  const restaurantToSave = restaurants.find(restaurant => restaurant.id === id)

  const { data } = await favRestaurant ({
    variables: {restaurantData:{restaurantToSave}}
  })
  console.log(data)
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleZipCodeSubmit = (e) => {
    e.preventDefault();
    // The useEffect will automatically trigger when zipCode state changes
  };

  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}s Profile</h2>
      <p>{user.email}</p>
      <h1>Welcome back!</h1>

      <form onSubmit={handleZipCodeSubmit}>
        <label>
          Search restaurants by ZIP code:
          <input type="text" value={zipCode} onChange={handleZipCodeChange} />
        </label>
        <button type="submit">Search</button>
      </form>

      <h3>Restaurants in your area:</h3>
      {/* <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul> */}

       <ul>
        {testList.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>

      <h3>Your Favorited Restaurants:</h3>
      <ul>
        {favoritedRestaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile; 
import { useState, useEffect } from 'react';
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
      console.log('Backend response:', data); // Log backend response
      list = data.restaurants;
    } catch (err) {
      console.error(err);
    }
    console.log('list', list);

    //https://www.google.com/maps/place/?q=place_id:ChIJ_R3H1WZ654gR4pxbRDOomyY
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

  const styles = {
    container: {
      backgroundColor: 'rgba(0, 0, 0, .95)',
      maxWidth: '900px',
      borderRadius: '20px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: "'Pacifico', cursive",
      fontSize: '24px',
      color: 'whitesmoke',
      textShadow: `
        1px 1px 2px #000,
        2px 2px 4px #000,
        3px 3px 6px #000,
        4px 4px 8px #000,
        5px 5px 10px #f00,
        0 0 20px #f00,
        0 0 30px #f00,
        0 0 40px #f00,
        0 0 50px #f00,
        0 0 60px #f00,
        0 0 70px #f00,
        0 0 80px #f00
      `,
      zIndex: 1,
    },
    input: {
      fontSize: '24px',
      color: 'whitesmoke',
      zIndex: 1,
      fontFamily: "'Pacifico', cursive",
      backgroundColor: 'rgba(0, 0, 0, .95)',
      border: '1px solid #fff',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    },
    button: {
      fontSize: '24px',
      color: 'whitesmoke',
      borderRadius: '5px',
      fontFamily: "'Pacifico', cursive",
      backgroundColor: '#333',
      border: '1px solid #fff',
      padding: '10px 20px',
      cursor: 'pointer',
    },
    image: {
      width: '200px',
      height: '200px',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    restaurantContainer: {
      marginBottom: '20px',
    },
    restaurantName: {
      fontWeight: 'bold',
      color: 'White',
    },
    a:{
      color: 'red'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Search Restaurants</h1>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter zip code"
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error occurred</p>
        ) : (
          restaurants.map((restaurant, index) => (
            <div key={restaurant.restaurantId || index} style={styles.restaurantContainer}>

              <img src={restaurant.image} alt={restaurant.name} style={styles.image}/>
        
             
              <p style={styles.restaurantName}>{restaurant.name}</p>
              <p>{restaurant.address || 'Address not available'}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Open: {restaurant.open == 'true' ? 'Yes' : 'No'}</p>
              <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
                {restaurant.name} on Google Maps
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;

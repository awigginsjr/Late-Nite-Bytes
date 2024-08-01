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
      // backgroundColor: 'rgba(0, 0, 0, .95)',
      paddingTop: '20px',
      maxWidth: '1000px',
      borderRadius: '20px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'Comic Sans MS',
      fontSize: '24px',
      color: 'whitesmoke',
    },
    input: {
      fontSize: '24px',
      color: 'whitesmoke',
      zIndex: 1,
      fontFamily: 'Comic Sans MS',
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
      fontFamily: 'Comic Sans MS',
      backgroundColor: '#333',
      border: '1px solid #fff',
      padding: '10px 20px',
      cursor: 'pointer',
    },
    image: {
      width: '250px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '20px',
      marginBottom: '15px',
      marginRight: '20px', 
      marginTop: '15px',
      marginLeft: '20px',
      position: 'center',
      '@media (maxWidth: 500px)': {
        width: '100%',
      },
    },
    restaurantContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '30px',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, .95)',
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow flex items to wrap
      // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      '@media (maxWidth: 500px)': { 
        flexDirection: 'column', 
      },
    },
    restaurantDetails: {
      flex: 1, // Allows the text container to take up the remaining space
    },
    restaurantName: {
      fontWeight: 'bold',
      color: 'whitesmoke',
    },
    a:{
      color: 'red'
    },
    // Media query for smaller screens
    '@media (maxWidth: 500px)': {
      restaurantContainer: {
        flexDirection: 'column', // Change direction to column on small screens
        alignItems: 'center', // Align items to the start
      },
      image: {
        margin: '0 auto', // Center the image
        marginBottom: '15px',
      },
      restaurantDetails: {
        textAlign: 'center', // Center text in details
        width: '100%', // Take up full width
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* <h1>Search Restaurants</h1> */}
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter a zip code"
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
      <div>
        {loading ? (
              <div className="loader">
                🍕 
              </div>
        ) : error ? (
          <p>Error occurred</p>
        ) : (
          <>
            {zipCode && <h4>Displaying Restaurants Near Zip Code {zipCode}</h4>}
            {restaurants.map((restaurant, index) => (
              <div key={restaurant.restaurantId || index} style={styles.restaurantContainer}>
                <img src={restaurant.image} alt={restaurant.name} style={styles.image}/>
                  <div style={styles.restaurantDetails}>
                    <a href={restaurant.link} target="_blank" rel="noopener noreferrer" style={styles.a}>
                      <h1 style={styles.restaurantName}>{restaurant.name}</h1>
                    </a>
                    {/* <h1 style={styles.restaurantName}>{restaurant.name}</h1> */}
                    <p>{restaurant.address || 'Address not available'}</p>
                    <p>Rating: {restaurant.rating}⭐</p>
                    <p>Open: {restaurant.open ? 'Yes' : 'No'}</p>
                    {/* <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
                    {restaurant.name} on Google Maps
                    </a> */}
                  </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from "react";
import RestaurantList from './restaurantList';

function UserProfile() {
  // Mocking user data with useState for demo purposes
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    zipCode: "28269" // Assuming you have a zipCode for the user
  });

  // useEffect to fetch user data or perform any necessary operations
  useEffect(() => {
    // Example: Fetch user data including zipCode
    // For demo, we'll mock setting user data after delay
    setTimeout(() => {
      // Example: Fetch user data from backend API
      const fetchedUserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        zipCode: "28269"
      };
      setUser(fetchedUserData);
    }, 1000); // Simulating API delay
  }, []);

  return (
    <div>
      <h1>USER PROFILE</h1>
      <h2>Late Night Restaurants</h2>
      {/* Pass zipCode to RestaurantList */}
      <RestaurantList zipCode={user.zipCode} />
    </div>
  );
}

export default UserProfile;


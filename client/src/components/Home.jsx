// home page 

// import { useState } from 'react';

function Homepage() {

  return (
    <div>
      <div className="intro">
        <h2>Welcome to Late Nite Bytes</h2>
            <p>
                At Late Nite Bytes, we are dedicated to bringing you the best late-night food recommendations. Whether you are looking for a quick bite or a full meal, our platform connects you to the top restaurants open late in your area. Enjoy seamless browsing and discover new favorites right from the comfort of your home.
              </p>
      </div>
      <div className="photo-gallery">
            <div className="photo-item">
                <div className="photo-wrapper">
                    <h3>Sign Up</h3>
                    <p>Easily sign up with your email and zip code</p>
                    <img src="photo1.jpg" alt="Photo 1" />
                </div>
            </div>
            <div className="photo-item">
                <div className="photo-wrapper">
                    <h3>Find Restaurants</h3>
                    <p>Browse through a wide range of restaurants near you</p>
                    <img src="photo2.jpg" alt="Photo 2" />
                </div>
            </div>
            <div className="photo-item">
                <div className="photo-wrapper">
                    <h3>Enjoy Midnight Cravings</h3>
                    <p>Satisfy midnight hungers and save restaurants to your favorites</p>
                    <img src="photo3.jpg" alt="Photo 3" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Homepage;

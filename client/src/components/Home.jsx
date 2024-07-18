// home page component

import signUp from "../assets/images/signUp.jpg"
import mapShot from "../assets/images/mapShot.jpg"
import food from "../assets/images/foodCollage.jpg"

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
                    <p>Easily sign up with your email, password and zip code</p>
                    <img src={signUp} alt="Sign Up page" />
                </div>
            </div>
            <div className="photo-item">
                <div className="photo-wrapper">
                    <h3>Find Restaurants</h3>
                    <p>Browse through a wide range of restaurants near you</p>
                    <img src={mapShot} alt="map near by spots" />
                </div>
            </div>
            <div className="photo-item">
                <div className="photo-wrapper">
                    <h3>Enjoy Midnight Cravings</h3>
                    <p>Satisfy midnight hungers and save restaurants to your favorites</p>
                    <img src={food} alt="food collage" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Homepage;

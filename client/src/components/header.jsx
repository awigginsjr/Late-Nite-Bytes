function Header(){
    return(
        <div className="hero">
        <div>
            <h1>Late Nite Bytes</h1>
        </div>
            <div className="navbar">
                <a href="/login" id="login-signup-btn" >Log in</a>
                <br />
                <a href="/signup" id="login-signup-btn" >Sign up</a>
                <a href="#">About Us</a>
            </div>
                <div className="intro">
                    <h2>Welcome to Late Nite Bytes</h2>
                        <p>
                            At Late Nite Bytes, we are dedicated to bringing you the best late-night food recommendations. Whether you are looking for a quick bite or a full meal, our platform connects you to the top restaurants open late in your area. Enjoy seamless browsing and discover new favorites right from the comfort of your home.
                        </p>
                </div>
            </div>
    )
}

export default Header;
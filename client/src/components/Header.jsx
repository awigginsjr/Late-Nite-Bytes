import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className="hero">
            <div>
                <h1>Late Nite Bytes</h1>
            </div>
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/login" id="login-signup-btn" >Log In</Link>
                {/* <br /> */}
                <Link to="/signup" id="login-signup-btn" >Sign Up</Link>
                <a href="https://buy.stripe.com/test_4gwaFldwx7mB5kk8ww">Buy us a ☕</a> 
            </div>
        </div>
    )
}

export default Header;

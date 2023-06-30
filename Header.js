
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { Authactions } from './Redux/Auth';


const Header = () => {
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showComposeEmail, setShowComposeEmail] = React.useState(false); // State to control the visibility of the email composer

  const logoutHandler = () => {
    dispatch(Authactions.logout());
    navigate('/');
  };

  const handleComposeEmail = () => {
    setShowComposeEmail(true);
  };

  const closeComposeEmail = () => {
    setShowComposeEmail(false);
  };

  React.useEffect(() => {
    // Close the compose email form when the user is logged out
    if (!isLogin) {
      setShowComposeEmail(false);
    }
  }, [isLogin]);

  return (
    <header>
      <div className="top-header">
        <div className="logo">
          <img src={logo} alt="My Web Link Logo" />
          <span className="logo-text">MyWeb Link</span>
        </div>
        {isLogin && (
          <ul className="nav-links">
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>

          </ul>
        )}
      </div>

    </header>
  );
};

export default Header; 


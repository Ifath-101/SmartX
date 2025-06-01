import React,{useEffect} from 'react';
import './CSS/ThankYou.css';
import { Link } from 'react-router-dom';
import checkmark from '../Components/Assets/checkmark.png'; // Add a simple checkmark image or SVG

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);  // <== scrolls to top on mount
  }, []);
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <img src={checkmark} alt="Success" className="thankyou-icon" />
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="thankyou-home-btn">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default ThankYou;

import React, { useState, useEffect } from 'react';
import './CSS/Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, name } = location.state || {};

  const [delivery, setDelivery] = useState({
    fullName: '', address: '', city: '', zip: '', phone: ''
  });

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', nameOnCard: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors = {};

    // Delivery validation
    if (!delivery.fullName) newErrors.fullName = "Full name is required";
    if (!delivery.address) newErrors.address = "Address is required";
    if (!delivery.city) newErrors.city = "City is required";
    if (!delivery.zip.match(/^\d{5}$/)) newErrors.zip = "Enter a valid 5-digit ZIP";
    if (!delivery.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a 10-digit phone number";

    // Payment validation
    if (!payment.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!payment.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiry = "Format MM/YY";
    if (!payment.cvv.match(/^\d{3}$/)) newErrors.cvv = "CVV must be 3 digits";
    if (!payment.nameOnCard) newErrors.nameOnCard = "Name on card is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/thankyou');
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "delivery") {
      setDelivery({ ...delivery, [name]: value });
    } else {
      setPayment({ ...payment, [name]: value });
    }
  };

  return (
    <div className="payment-page">
      <h2>Checkout</h2>
      <form onSubmit={handlePlaceOrder}>

        <div className="section">
          <h3>Delivery Details</h3>
          <input type="text" name="fullName" placeholder="Full Name" value={delivery.fullName} onChange={(e) => handleInputChange(e, "delivery")} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <input type="text" name="address" placeholder="Address" value={delivery.address} onChange={(e) => handleInputChange(e, "delivery")} />
          {errors.address && <p className="error">{errors.address}</p>}

          <input type="text" name="city" placeholder="City" value={delivery.city} onChange={(e) => handleInputChange(e, "delivery")} />
          {errors.city && <p className="error">{errors.city}</p>}

          <input type="text" name="zip" placeholder="ZIP Code" value={delivery.zip} onChange={(e) => handleInputChange(e, "delivery")} />
          {errors.zip && <p className="error">{errors.zip}</p>}

          <input type="text" name="phone" placeholder="Phone Number" value={delivery.phone} onChange={(e) => handleInputChange(e, "delivery")} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="section">
          <h3>Payment Details</h3>
          <input type="text" name="cardNumber" placeholder="Card Number" value={payment.cardNumber} onChange={(e) => handleInputChange(e, "payment")} />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

          <input type="text" name="expiry" placeholder="MM/YY" value={payment.expiry} onChange={(e) => handleInputChange(e, "payment")} />
          {errors.expiry && <p className="error">{errors.expiry}</p>}

          <input type="text" name="cvv" placeholder="CVV" value={payment.cvv} onChange={(e) => handleInputChange(e, "payment")} />
          {errors.cvv && <p className="error">{errors.cvv}</p>}

          <input type="text" name="nameOnCard" placeholder="Name on Card" value={payment.nameOnCard} onChange={(e) => handleInputChange(e, "payment")} />
          {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}
        </div>

        <div className="summary">
          <h3>Order Summary</h3>
          <p>Product: {name}</p>
          <p>Total: RS {price || "0.00"} + Free shipping</p>
        </div>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default PaymentPage;

import React, { useContext } from "react";
import "./Productdisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Productdisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-price">RS{product.price}</div>
        <div className="buttons">
          <button
            onClick={() => {
              addToCart(product.id);
            }}
          >
            ADD TO CART
          </button>
          <Link
            to="/payment"
            state={{
              price: product.price,
              name: product.name,
            }}
          >
            <button className="buy-now-btn">BUY NOW</button>
          </Link>
        </div>

        <div className="productdisplay-details">
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>RAM:</strong> {product.ram}
          </p>
          <p>
            <strong>Storage:</strong> {product.storage}
          </p>
          <p>
            <strong>Front Camera:</strong> {product.fcam}
          </p>
          <p>
            <strong>Rear Camera:</strong> {product.rcam}
          </p>
          <p>
            <strong>Display:</strong> {product.display}
          </p>
          <p>
            <strong>Battery:</strong> {product.battery}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Productdisplay;

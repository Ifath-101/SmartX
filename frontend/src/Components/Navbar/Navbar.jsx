import React, { useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
// import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/dropdown_icon.png";
import { Link, useNavigate } from "react-router-dom";//✅ ADDED FOR SEARCH

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [search, setSearch] = useState(""); // ✅ ADDED FOR SEARCH
  const navigate = useNavigate(); // ✅ ADDED FOR SEARCH
  // const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const resetMenu = () => {
    setMenu("");
  };

  // ✅ ADDED FOR SEARCH
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?q=${search}`);
      setSearch(""); // Optional: Clear search field after navigating
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SmartX</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("samsung");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/samsung">
            Samsung
          </Link>
          {menu === "samsung" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("apple");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/apple">
            Apple
          </Link>
          {menu === "apple" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("xiaomi");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/xiaomi">
            Xiaomi
          </Link>
          {menu === "xiaomi" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("sony");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/sony">
            Sony
          </Link>
          {menu === "sony" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("vivo");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/vivo">
            Vivo
          </Link>
          {menu === "vivo" ? <hr /> : <></>}
        </li>
      </ul>

      {/* ✅ ADDED FOR SEARCH */}
      <form onSubmit={handleSearchSubmit} className="nav-search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search-input"
        />
        <button type="submit" className="nav-search-button">Search</button>
      </form>
      
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={resetMenu}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" onClick={resetMenu}>
          <img src={cart_icon} alt="cart" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

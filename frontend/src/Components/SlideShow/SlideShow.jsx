import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import "./Slideshow.css";

import Img1 from "../Assets/16.png";
import Img2 from "../Assets/16e.png";
import Img3 from "../Assets/redmi14.png";

const images = [
  {
    image: Img1,
    link: "/product/23",
  },
  {
    image: Img2,
    link: "/product/6",
  },
  {
    image: Img3,
    link: "/product/7",
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="slideshow-container">
      <Link to={images[current].link} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={images[current].image}
          alt={`Slide ${current + 1}`}
          className="slide-image"
        />
      </Link>

      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

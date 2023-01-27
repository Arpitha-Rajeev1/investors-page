import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [show, setshow] = useState(false);
  const [navshow, setnavshow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setnavshow(true);
      } else {
        // if scroll up show the navbar
        setnavshow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`navactive ${
        navshow && "navhidden"
      } navbar navbar-expand-lg pxx`}
      id="nav"
    >
      <div className="container-fluid">
        <a className="showMe">
          <img src="logo.svg" alt="" />
        </a>
        <Link className="navbar-brand hideMe logo" to="/">
          <img src="logo.svg" alt="" />
        </Link>
        <button
          className="border-0 bg-white"
          style={{ display: show ? "none" : "block" }}
          onClick={() => setshow(!show)}
        >
          <p className="d-block d-lg-none cursor">Menu</p>
        </button>
        <button
          className="border-0 bg-white"
          style={{ display: show ? "block" : "none" }}
          onClick={() => setshow(!show)}
        >
          <p className="d-block d-lg-none cursor">Close</p>
        </button>

        <div
          className="d-lg-none mobile-view px-3"
          style={{ display: show ? "block" : "none" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontSize: "18px", lineHeight: "27px" }}
                to="/platform"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontSize: "18px", lineHeight: "27px" }}
                to="/"
              >
                Platform
              </Link>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse d-none d-lg-block">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-list">
            <li className="nav-item">
              <Link className="nav-link" to="/platform">
                Home
              </Link>
            </li>
          </ul>
          <div className="talk-btn">
          <Link
            target="_blank"
            className="px-3 py-2 btns d-none d-lg-block"
            style={{ textDecoration: "none" }}
            to="/"
          >
            Platform
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

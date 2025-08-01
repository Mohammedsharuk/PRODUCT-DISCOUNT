import React, { useState } from "react";

const Header = ({
  
  onProductListClick,
  onCreateProductClick,
  onCreateDiscountClick,
  onDiscountListClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      style={{
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "black",
        color: "yellow",
        flexWrap: "wrap",
      }}
    >
      <h2>MY SHOP</h2>

      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        style={{
          background: "white",
          color: "black",
          fontWeight: "bold",
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
          marginLeft: "auto",
        }}
        className="toggle-btn"
      >
        ☰
      </button>

      {/* Navigation */}
      <nav
        className="nav-links"
        style={{
          display: menuOpen ? "block" : "none",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <span style={navLinkStyle} onClick={onCreateProductClick}>
          CREATE PRODUCT
        </span>
        <span style={navLinkStyle} onClick={onProductListClick}>
          PRODUCT LIST
        </span>
        <span style={navLinkStyle} onClick={onCreateDiscountClick}>
          CREATE DISCOUNT
        </span>
        <span style={navLinkStyle} onClick={onDiscountListClick}>
          DISCOUNT LIST
        </span>

        {/* Styled Roll No & Name */}
        <span
          style={{
            ...navLinkStyle,
            background: "#0d6efd",
            padding: "5px 12px",
            borderRadius: "20px",
            color: "#fff",
            fontWeight: "bold",
            display: "inline-block",
            fontSize: "13px",
            lineHeight: "1.5",
            cursor: "default",
          }}
        >
          🎓 <span style={{ fontSize: "12px", textAlign:"center"}}>24IT042</span> <br />
          <span
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Mohammed Sharuk A
          </span>
        </span>
      </nav>

      {/* Media Query for Large Screens */}
      <style>
        {`
          @media (min-width: 768px) {
            .toggle-btn {
              display: none;
            }
            .nav-links {
              display: flex !important;
              width: auto !important;
              margin-top: 0 !important;
            }
          }
        `}
      </style>
    </header>
  );
};

const navLinkStyle = {
  padding: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "block",
  color: "yellow",
};

export default Header;

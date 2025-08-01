import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import CategoryBar from "./components/CategoryBar";
import CreateDiscount from "./components/CreateDiscount";
import DiscountList from "./components/DiscountList";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Navigation handlers
  const handleLoginClick = () => setShowLoginModal(true);
  const handleCreateProductClick = () => navigate("/create-product");
  const handleProductListClick = () => navigate("/product-list");
  const handleCreateDiscountClick = () => navigate("/create-discount");
  const handleDiscountListClick = () => navigate("/discount-list");

  return (
    <>
      {/* Header is always shown */}
      <Header
        onLoginClick={handleLoginClick}
        onCreateProductClick={handleCreateProductClick}
        onProductListClick={handleProductListClick}
        onCreateDiscountClick={handleCreateDiscountClick}
        onDiscountListClick={handleDiscountListClick}
      />

      {/* Show category bar and login modal only on home page */}
      {isHome && (
        <>
          <CategoryBar />
          
          
        </>
      )}

      {/* Main page content */}
      <div style={{ padding: isHome ? "20px" : "0" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Welcome to My Shop!</h2>
                <p>Click on the menu to explore.</p>
              </div>
            }
            
          />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/create-discount" element={<CreateDiscount />} />
          <Route path="/discount-list" element={<DiscountList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

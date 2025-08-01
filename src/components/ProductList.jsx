import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/p.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          zIndex: 1,
        }}
      />

      <div
        className="container p-4 border rounded shadow bg-white"
        style={{
          maxWidth: "900px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 className="mb-4 text-center">Product List</h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <>
            <div className="row">
              {currentProducts.map((product, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    {product.productImage && (
                      <img
                        src={`http://localhost:4000/${product.productImage}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: ₹{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-primary"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="align-self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;

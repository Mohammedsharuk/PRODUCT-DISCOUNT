import React, { useEffect, useState } from "react";
import axios from "axios";

function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const discountsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:4000/discounts")
      .then((res) => {
        setDiscounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching discounts:", err);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * discountsPerPage;
  const indexOfFirst = indexOfLast - discountsPerPage;
  const currentDiscounts = discounts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(discounts.length / discountsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f9fa",
        }}
      >
        <p>Loading discounts...</p>
      </div>
    );

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
      }}
    >
      {/* Blur background overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(6px)",
          zIndex: 1,
        }}
      />

      {/* Content Box */}
      <div
        className="container p-4 border rounded shadow-sm bg-white"
        style={{
          maxWidth: "700px",
          width: "90%",
          position: "relative",
          zIndex: 2,
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <h2 className="mb-4 text-center">Available Discounts</h2>

        {discounts.length === 0 ? (
          <p className="text-center">No discounts available.</p>
        ) : (
          <>
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>s.no</th>
                  <th>Product</th>
                  <th>Discount (%)</th>
                  <th>Valid Till</th>
                </tr>
              </thead>
              <tbody>
                {currentDiscounts.map((d, i) => (
                  <tr key={d._id}>
                    <td>{indexOfFirst + i + 1}</td>
                    <td>{d.productId?.name || "N/A"}</td>
                    <td>{d.percentage}%</td>
                    <td>{new Date(d.validTill).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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

export default DiscountList;

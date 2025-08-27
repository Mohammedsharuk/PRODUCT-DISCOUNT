import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateDiscount() {
  const [form, setForm] = useState({
    percentage: "",
    validTill: "",
    productId: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.percentage || !form.validTill || !form.productId) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    axios.post("http://localhost:4000/discounts/create", form)
      .then(() => {
        alert("Discount Created!");
        setForm({ percentage: "", validTill: "", productId: "" });
        navigate("/discount-list");
      })
      .catch((err) => {
        console.error("Error creating discount:", err);
        alert("Failed to create discount.");
      })
      .finally(() => setLoading(false));
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
      }}
    >
      {/* Blur overlay */}
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

      {/* Form container */}
      <div
        className="container p-4 border rounded shadow-sm bg-white"
        style={{
          maxWidth: "600px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 className="mb-4 text-center">Create milestone</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>milestone name </label>
            <input
              type="number"
              name="percentage"
              className="form-control"
              value={form.percentage}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="mb-3">
            <label>Valid Till</label>
            <input
              type="date"
              name="validTill"
              className="form-control"
              value={form.validTill}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Select Project</label>
            <select
              name="productId"
              className="form-control"
              value={form.productId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a Project --</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creating..." : "Create Discount"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDiscount;

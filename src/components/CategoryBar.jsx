import React from "react";
import "./CategoryBar.css";

const categories = [
  { name: "Grocery", img: "GROCERY.jpg" },
  { name: "Mobiles", img: "MOBILE.jpg" },
  { name: "Electronics", img: "ELECTRONICS.jpg" },
];

function CategoryBar() {
  return (
    <div className="category-bar">
      {categories.map((cat, index) => (
        <div className="category" key={index}>
          <img src={cat.img} alt={cat.name} width="100" height="100" />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;

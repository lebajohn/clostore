"use client";

import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        category,
        image,
      }),
    });

    if (res.ok) {
      alert("Product created");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } else {
      alert("Error creating product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Panel
      </h1>

      <div className="flex flex-col gap-3">

        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 rounded"
        >
          Create Product
        </button>

      </div>
    </div>
  );
}
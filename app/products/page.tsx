"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search (prevents too many API calls)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products from API
const fetchProducts = useCallback(async () => {
  try {
    let url = `/api/products?page=${page}&limit=8&`;

    if (category !== "all") {
      url += `category=${category}&`;
    }

    if (debouncedSearch) {
      url += `search=${debouncedSearch}&`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.products);
    setTotalPages(data.totalPages);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

  } catch (error) {
    console.error(error);
  }
}, [page,category, debouncedSearch]);

  // Refetch whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
  setPage(1);
}, [category, debouncedSearch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 flex-wrap mb-6">
        {["all", "shoes", "clothes", "accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg border capitalize ${
              category === cat ? "bg-black text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition"
               >
                 {/* IMAGE */}
                   <Image
                     src={product.image}
                     alt={product.name}
                     className="w-full h-48 object-cover"
                  />

                  {/* CONTENT */}
                   <div className="p-4">
                   <h3 className="text-lg font-semibold">{product.name}</h3>
                   <p className="text-gray-600 mt-2">KES {product.price}</p>
                   </div>
                     </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
      <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev 
      </button>

      <p>
        Page {page} of {totalPages}
      </p>
      
      <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
      </div>

      <button
      onClick={async () => {
        await fetch(`/api/admin/products/${products.map((product) => (
          <div key={product.id}>
            {product.name}
          </div>
        ))}`, {
          method: "DELETE",
        });

        fetchProducts();  //refresh list
      }} 
      className="mt-3 text-red-500 text-sm">
        Delete
      </button>


      {/* EMPTY STATE */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found 😢
        </p>
      )}
    </div>
  );
}
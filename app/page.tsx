"use client"

import { useState, useEffect } from "react";
import "./globals.css";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
    .then((res) => res.json())
    .then((data) => setProducts(Array.isArray(data.products) ? data.products : [] ));
  }, []);

  return (
    <main className="container">
      <h1>Clostore</h1>

      <div className="grid">
        {products.map((product) => (
          <div
           key={product.id} 
           className="card">
           <Image 
           src={product.imageUrl} 
           alt={product.name} 
           style={{ width: "100%", maxHeight: "200px", objectFit: "cover"}}
           />

           <h2>{product.name}</h2>
           <p>{product.category}</p>
           <p>Ksh {product.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
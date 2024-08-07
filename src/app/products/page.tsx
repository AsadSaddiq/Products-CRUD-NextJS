'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Link href="/products/add" className="inline-block mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add New Product</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <div className="flex justify-between mt-4">
              <Link href={`/products/edit/${product._id}`} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600">Edit</Link>
              <button
                onClick={() => {
                  fetch(`/api/products`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: product._id }),
                  }).then(() => setProducts(products.filter(p => p._id !== product._id)));
                }}
                className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

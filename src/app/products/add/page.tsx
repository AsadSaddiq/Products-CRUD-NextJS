'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [active, setActive] = useState(true);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, active }),
    });
    router.push('/products');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Product Price"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="active" className="inline-flex items-center">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
}

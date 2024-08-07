'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<any>({
    name: '',
    description: '',
    price: 0,
    active: true,
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id, ...product }),
    });
    router.push('/products');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleEditProduct} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Product Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder="Product Description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <input
            id="price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            placeholder="Product Price"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="active" className="inline-flex items-center">
            <input
              id="active"
              type="checkbox"
              checked={product.active}
              onChange={(e) => setProduct({ ...product, active: e.target.checked })}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}

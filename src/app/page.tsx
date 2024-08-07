import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Welcome to My Next.js App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This is a Next.js application with MongoDB integration, designed with Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            View Products
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Login
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 w-full py-4 bg-gray-200 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} My Next.js App. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <section className="text-center py-20 px-6 md:px-20">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to DailyFlow</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your all-in-one solution to manage tasks and track expenses effortlessly.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-3 border border-gray-400 text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why DailyFlow?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">📋 Task Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Easily create, edit, and complete your daily to-dos.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">💰 Expense Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor your spending and stay on budget.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Simple Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">Visualize your progress with clean charts and summaries.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} DailyFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

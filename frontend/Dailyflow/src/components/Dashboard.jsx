// import React from 'react'
// import ExpenseTracker from './ExpenseTracker'
import Navbar from "./Navbar"
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { getExpense,updateExpense, deleteExpense } from '../features/expense/expenseSlice';

const Dashboard = () => {

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expense)

  useEffect(() => {
    dispatch(getExpense())
  }, [dispatch])

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  // Calculate this month, last month, and this year totals
  const { thisMonthTotal, lastMonthTotal, thisYearTotal } = useMemo(() => {
    let thisMonthTotal = 0;
    let lastMonthTotal = 0;
    let thisYearTotal = 0;

    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentYear = now.getFullYear();

    if (expenses) {
      expenses.forEach((expense) => {
        if (!expense || !expense.creation_Date || isNaN(expense.amount)) return;
        const date = new Date(expense.creation_Date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseYear === currentYear) {
          thisYearTotal += expense.amount;

          if (expenseMonth === currentMonth) {
            thisMonthTotal += expense.amount;
          } else if (expenseMonth === currentMonth - 1 || (currentMonth === 0 && expenseMonth === 11)) {
            // Handle Jan (0) and Dec (11) wrap-around
            lastMonthTotal += expense.amount;
          }
        }
      });
    }
    return { thisMonthTotal, lastMonthTotal, thisYearTotal };
  }, [expenses]);

  
  return (
    <>
      <Navbar/>
      {/* <ExpenseTracker/> */}
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">This Month</h2>
              <p className="text-2xl font-bold mt-2 flex items-center"><FaIndianRupeeSign size={20} />{thisMonthTotal}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Last Month</h2>
              <p className="text-2xl font-bold mt-2 flex items-center"><FaIndianRupeeSign size={20} />{lastMonthTotal}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Year Total</h2>
              <p className="text-2xl font-bold mt-2 flex items-center"><FaIndianRupeeSign size={20} />{thisYearTotal}</p>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Expense</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(expenses) && [...expenses]
                    .sort((a, b) => new Date(b.creation_Date) - new Date(a.creation_Date))
                    .map((expense, index) => {
                      if (!expense || !expense.creation_Date || isNaN(expense.amount)) return null;
                      return (
                        <tr key={index}>
                          <td className="px-4 py-2">{formatDate(expense.creation_Date)}</td>
                          <td className="px-4 py-2">{expense.expense}</td>
                          <td className="px-4 py-2">{expense.category}</td>
                          <td className="px-4 py-2 text-red-500 flex items-center">- <FaIndianRupeeSign />{expense.amount}</td>
                          <td className="px-4 py-2 text-m"><MdOutlineEdit onClick={() => handleEdit(expense)} size={22} className="cursor-pointer hover:text-green-800" /></td>
                          <td className="px-4 py-2 text-m"><MdDelete onClick={() => handleDelete(expense._id)} size={22} className="cursor-pointer hover:text-red-800" /></td>
                        </tr>
                      )
                    }
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
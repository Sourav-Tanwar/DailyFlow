import React, { useEffect, useState, useMemo } from 'react';
import Navbar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { getExpense, addExpense, updateExpense, deleteExpense } from '../features/expense/expenseSlice';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import AddExpenseForm from './AddExpenseForm';
import { Link } from 'react-router-dom';
import {formatDate,calculateExpenseTotals} from '../utils/expenseUtils'

const ExpenseTracker = ({ readOnly=false }) => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expense);

  const [showForm, setShowForm] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const {thisMonthTotal, lastMonthTotal, thisYearTotal} = useMemo(()=>{
    return calculateExpenseTotals(expenses)
  },[expenses])

  const handleEdit = (expense) => {
    setEditExpenseData(expense);
    setShowForm(true);
  };

  const handleDelete = async (expenseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
    const result = await dispatch(deleteExpense(expenseId));
    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getExpense());
    } else {
      alert("Failed to delete expense");
    }
  };

  const toggleShowForm = () => {
    setShowForm(prev => !prev);
    if (showForm) setEditExpenseData(null);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
          {!readOnly ? <h1 className="text-3xl font-bold mb-6">Expenses</h1> : <h1 className="text-3xl font-bold mb-6"><Link to='expense'>Expense Dashboard</Link></h1>}
          {!readOnly && (
          <button
            onClick={toggleShowForm}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white"
          >
            <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-transparent">
              {editExpenseData ? "Edit Expense" : "Add Expense"}
            </span>
          </button>
            )}
          </div>
          {!readOnly &&showForm && (
            <AddExpenseForm
              editExpenseData={editExpenseData}
              setShowForm={setShowForm}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">This Month</h2>
              <p className="text-2xl font-bold mt-2 flex items-center">
                <FaIndianRupeeSign size={20} /> {thisMonthTotal}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Last Month</h2>
              <p className="text-2xl font-bold mt-2 flex items-center">
                <FaIndianRupeeSign size={20} /> {lastMonthTotal}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Year Total</h2>
              <p className="text-2xl font-bold mt-2 flex items-center">
                <FaIndianRupeeSign size={20} /> {thisYearTotal}
              </p>
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
                  {!readOnly && <th className="px-4 py-2">Edit</th>}
                  {!readOnly &&<th className="px-4 py-2">Delete</th>}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(expenses) &&
                  [...expenses]
                    .filter((expense) => expense && expense.creation_Date)
                    .sort((a, b) => new Date(b.creation_Date) - new Date(a.creation_Date))
                    .slice(0,readOnly ? 3:expenses.length)
                    .map((expense, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{formatDate(expense.creation_Date)}</td>
                        <td className="px-4 py-2">{expense.expense}</td>
                        <td className="px-4 py-2">{expense.category}</td>
                        <td className="px-4 py-2 text-red-500 flex items-center">
                          - <FaIndianRupeeSign /> {expense.amount}
                        </td>
                        {!readOnly && (
                        <td className="px-4 py-2">
                          <MdOutlineEdit
                            onClick={() => handleEdit(expense)}
                            size={22}
                            className="cursor-pointer hover:text-green-800"
                          />
                        </td>
                        )}
                        {!readOnly && 
                          <td className="px-4 py-2">
                          <MdDelete
                            onClick={() => handleDelete(expense._id)}
                            size={22}
                            className="cursor-pointer hover:text-red-800"
                          />
                        </td>
                        }
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;

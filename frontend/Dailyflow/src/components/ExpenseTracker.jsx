import React, { useEffect, useState, useMemo } from 'react';
import Navbar from "./Navbar"
import { useDispatch, useSelector } from 'react-redux';
import { getExpense, addExpense,updateExpense, deleteExpense } from '../features/expense/expenseSlice';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

const ExpenseTracker = () => {
  // const [expenses, setExpense] = useState([])
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expense)
  const [showForm, setShowForm] = useState(false)
  const [newExpense, setnewExpense] = useState({ expense: '', category: '', amount: '' })
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    dispatch(getExpense())
  }, [dispatch])
  // console.log(expenses)

  // Format a date like '19 April 2025'
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newExpense.expense || !newExpense.category || !newExpense.amount) {
      alert("Please fill out all fields");
      return;
    }

    if (editExpenseId) {

      console.log(editExpenseId)
      const resultAction = await dispatch(updateExpense(editExpenseId,newExpense));
      console.log(resultAction)
      if (resultAction.meta.requestStatus === 'rejected') {
        alert("Failed to update expense: "+ resultAction.error.message);
      }
      else{
        setShowForm(false);
        setnewExpense({ expense: '', category: '', amount: '' });
        setEditExpenseId(null);
        await dispatch(getExpense());
      }
    }
    
    else {
      const resultAction = await dispatch(addExpense(newExpense));
      console.log(resultAction)
      if (resultAction.meta.requestStatus === 'rejected') {
        alert("Failed to add expense: " + resultAction.error.message);
      }
      if (resultAction.meta.requestStatus === 'fulfilled') {
        setnewExpense({ expense: '', category: '', amount: '' });
        setShowForm(false);
        await dispatch(getExpense());
      }
    }
  }


const handleEdit = (expense) => {
  setShowForm(true)
  setnewExpense({
    expense: expense.expense,
    category: expense.category,
    amount: expense.amount
  });
  setEditExpenseId(expense._id)
  console.log(editExpenseId,newExpense )
}



const handleDelete = async (expenseId) => {
  console.log(expenseId)
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmDelete) return;
  try {
    const resultAction = await dispatch(deleteExpense(expenseId));
    if (resultAction.meta.requestStatus === "fulfilled") {
      // Optional: Refetch to ensure backend consistency
      await dispatch(getExpense());
    } else {
      alert("Failed to delete expense");
    }
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete expense");
  }
}

  const addExpenseForm = () => {
    console.log('addExpense')
    return (
      <>
        <form onSubmit={handleSubmit} className="max-w-sm mb-3 mx-auto">
          <div className="mb-5">
            <label htmlFor="expense" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> {editExpenseId ? "Edit Expense" : "Add Expense"}</label>
            <input type="text" name='expense' id="expense" value={newExpense.expense} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input type="text" name='category' id="category" onChange={onChange} value={newExpense.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <input type="number" name='amount' id="amount" onChange={onChange} value={newExpense.amount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? (editExpenseId ? "Updating..." : "Adding...") :(editExpenseId ? "Update Expense" : "Add Expense")}</button>
          {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </form>
      </>
    )
  }


function toggleShowForm() {
  setShowForm(prev => {
    const newShowForm = !prev;
    if (!newShowForm) {
      setEditExpenseId(null); // reset edit state
      setnewExpense({ expense: '', category: '', amount: '' });
    }
    return newShowForm;
  });
  
}

  const onChange = (event) => {
    if (event.target.name === 'amount') {
      setnewExpense({ ...newExpense, amount: parseFloat(event.target.value) });
    } else {
      setnewExpense({ ...newExpense, [event.target.name]: event.target.value });
    }
  }
  // console.log(newExpense)

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span onClick={toggleShowForm} className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              {/* Add Expense */}
              {editExpenseId ? "Edit Expense" : "Add Expense"}
            </span>
          </button>


          {showForm && (
            <div className="mt-6">
              {addExpenseForm()}
            </div>
          )}

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
                  // Array.isArray(expenses) && expenses.map((expense, index) =>{ 
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

                {/* <tr>
                  <td className="px-4 py-2">Apr 21</td>
                  <td className="px-4 py-2">Groceries</td>
                  <td className="px-4 py-2 text-red-500">- $120</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Apr 20</td>
                  <td className="px-4 py-2">Electricity</td>
                  <td className="px-4 py-2 text-red-500">- $65</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Apr 18</td>
                  <td className="px-4 py-2">Salary</td>
                  <td className="px-4 py-2 text-green-500">+ $2,000</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}


export default ExpenseTracker
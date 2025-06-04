import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense, getExpense } from '../features/expense/expenseSlice';

const AddExpenseForm = ({ editExpenseData,setEditExpenseData, setShowForm }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.expense);

  const [formData, setFormData] = useState({
    expense: '',
    category: '',
    amount: ''
  });

  useEffect(() => {
    if (editExpenseData) {
      setFormData({
        expense: editExpenseData.expense,
        category: editExpenseData.category,
        amount: editExpenseData.amount
      });
    } else {
      // When not editing, clear form on open
      setFormData({ expense: '', category: '', amount: '' });
    }
  }, [editExpenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'amount' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: updatedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.expense || !formData.category || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    let result;
    if (editExpenseData) {
      result = await dispatch(updateExpense(editExpenseData._id, formData));
      setEditExpenseData(null);
    } else {
      result = await dispatch(addExpense(formData));
    }

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getExpense());

      // ✅ Reset the form and close it
      setFormData({ expense: '', category: '', amount: '' });
      setShowForm(false);
    } else {
      alert("Operation failed: " + result.error?.message || 'Unknown error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mb-3 mx-auto">
      <div className="mb-5">
        <label htmlFor="expense" className="block mb-2 text-sm font-medium text-gray-900">Expense</label>
        <input
          type="text"
          name="expense"
          value={formData.expense}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
      >
        {loading
          ? (editExpenseData ? "Updating..." : "Adding...")
          : (editExpenseData ? "Update Expense" : "Add Expense")}
      </button>
    </form>
  );
};

export default AddExpenseForm;

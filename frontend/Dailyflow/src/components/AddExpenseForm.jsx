import React from 'react';

const AddExpenseForm = ({
  newExpense,
  onChange,
  handleSubmit,
  loading,
  editExpenseId,
}) => {
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
export default AddExpenseForm
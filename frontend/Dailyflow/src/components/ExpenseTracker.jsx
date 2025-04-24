import React from 'react'

const ExpenseTracker = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Add Expense
            </span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">This Month</h2>
              <p className="text-2xl font-bold mt-2">$2,140</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Last Month</h2>
              <p className="text-2xl font-bold mt-2">$1,980</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-700">Year Total</h2>
              <p className="text-2xl font-bold mt-2">$18,920</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  )
}


export default ExpenseTracker
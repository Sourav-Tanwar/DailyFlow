// src/utils/expenseUtils.js

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

export const calculateExpenseTotals = (expenses) => {
  let thisMonthTotal = 0;
  let lastMonthTotal = 0;
  let thisYearTotal = 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if (expenses && Array.isArray(expenses)) {
    expenses.forEach((expense) => {
      if (!expense || !expense.creation_Date || isNaN(expense.amount)) return;

      const date = new Date(expense.creation_Date);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (year === currentYear) {
        thisYearTotal += expense.amount;
        if (month === currentMonth) {
          thisMonthTotal += expense.amount;
        } else if (month === currentMonth - 1 || (currentMonth === 0 && month === 11)) {
          lastMonthTotal += expense.amount;
        }
      }
    });
  }

  return { thisMonthTotal, lastMonthTotal, thisYearTotal };
};

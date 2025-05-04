import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getExpense = () => async (dispatch) => {
  dispatch(fetchExpensesStart());
  try {
    const res = await fetch("http://localhost:3000/api/Expense", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')
      },
    })
    const data = await res.json();
    console.log(data)
    if (!data) {
      throw new Error('Failed to fetch expenses');
      // console.log("Data response failed")
    }
    // console.log(data.expense)
    dispatch(fetchExpensesSuccess(data.Expense))
  }
  catch (error) {
    dispatch(fetchExpensesFailure(error))
  }
}

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async (expenseData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(addExpenseStart())
    const token = localStorage.getItem('authToken');
    if (!token) {
      return thunkAPI.rejectWithValue('No auth token found');
    }
    try {
      const response = await fetch("http://localhost:3000/api/Expense", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify(expenseData)
      })

      const data = await response.json();
      console.log(data)
      dispatch(addExpenseSuccess(data.Expense))

    }
    catch (error) {
      dispatch(addExpenseFailure(error.message))
      return thunkAPI.rejectWithValue('Failed to add expense');
    }
  })


const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess(state, action) {
      state.loading = false;
      state.expenses = action.payload
    },
    fetchExpensesFailure(state, action) {
      state.loading = false;
      state.expenses = action.payload
    },
    addExpenseStart(state) {
      state.loading = true;
      state.error = null;
    },
    addExpenseSuccess(state, action) {
      state.loading = false;
      state.expenses.push(action.payload)
    },
    addExpenseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const { fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseStart,
  addExpenseSuccess,
  addExpenseFailure
} = expenseSlice.actions;
export default expenseSlice.reducer;
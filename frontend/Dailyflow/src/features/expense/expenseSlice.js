import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getExpense = createAsyncThunk(
  'api/getExpense',
  async ({ }, thunkAPI) => {
    try {
      await fetch("http://localhost:3000/api/Expense", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('authToken')
        },
      }).then(async (res) => {
        let response = await res.json()

        await setExpense(response.Expense)
      })
    } catch (error) {
      dispatch(fetchExpensesFailure("Something went wrong"));
    }
  }
)


const initialState  = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.loading =true;
      state.error= null;
    },
    fetchExpensesSuccess(state,action){
      state.loading =false,
      state.expense =action.payload
    },
    fetchExpensesFailure(state,action){
      state.loading =false,
      state.expense =action.payload
    }
  }
})
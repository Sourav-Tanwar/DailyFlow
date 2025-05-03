import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getExpense = ()=> async(dispatch)=>{
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
      if(!data){
        throw new Error('Failed to fetch expenses');
        // console.log("Data response failed")
      }
      // console.log(data.expense)
      dispatch(fetchExpensesSuccess(data.Expense))
    }
    catch(error){
      dispatch(fetchExpensesFailure(error))
    }
}




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
      state.loading =false;
      state.expenses =action.payload
    },
    fetchExpensesFailure(state,action){
      state.loading =false;
      state.expenses =action.payload
    }
  }
})

export const { fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure, } = expenseSlice.actions;
export default expenseSlice.reducer;
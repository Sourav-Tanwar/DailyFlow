import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getExpense = () => async (dispatch) => {
  dispatch(fetchExpensesStart());
  try {
    const res = await fetch("http://localhost:3000/api/Expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await res.json();
    console.log(data);
    if (!data) {
      throw new Error("Failed to fetch expenses");
      // console.log("Data response failed")
    }
    // console.log(data.expense)
    dispatch(fetchExpensesSuccess(data.Expense));
  } catch (error) {
    dispatch(fetchExpensesFailure(error));
  }
};




export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(addExpenseStart());
    const token = localStorage.getItem("authToken");
    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }
    try {
      const response = await fetch("http://localhost:3000/api/Expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify(expenseData),
      });
      const data = await response.json();
      console.log(data);
      dispatch(addExpenseSuccess(data.Expense));
    } catch (error) {
      dispatch(addExpenseFailure(error.message));
      return thunkAPI.rejectWithValue("Failed to add expense");
    }
  }
);

export const updateExpense = (expenseId,updatedData) => async (dispatch) => {
  dispatch(updateExpenseStart())
  const token = localStorage.getItem("authToken");
  // console.log(expenseId)
  console.log(updatedData)
    if (!token) {
      return { meta: { requestStatus: 'rejected' }, error: { message: error } };
    }
  try {
    const response = await fetch(`http://localhost:3000/api/Expense/${expenseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' ,
      "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify(updatedData)
    });

    const data = await response.json();
    console.log("Updated Data", data)

    if (!response.ok) {
      throw new Error(data.message || "Edit failed");
    }
    dispatch(updateExpenseSuccess(data))
    return { meta: { requestStatus: 'fulfilled' } };
  } catch (error) {
    console.error("Update failed:", error);
    dispatch(updateExpenseFailure(error.message));
    return { meta: { requestStatus: 'fulfilled' } };
  }
}

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, thunkAPI) => {
    console.log(expenseId)
    const { dispatch } = thunkAPI;
    dispatch(deleteExpenseStart());
    const token = localStorage.getItem("authToken");
    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }
    try {
      const response = await fetch(`http://localhost:3000/api/Expense/${expenseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
    
      const data = await response.json();
      console.log("Deleted Expense",data)
      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }
      dispatch(deleteExpenseSuccess(expenseId));
    } catch (error) {
      dispatch(deleteExpenseFailure(error.message));
      return thunkAPI.rejectWithValue("Failed to delete expense");
    }
  }
);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess(state, action) {
      state.loading = false;
      state.expenses = action.payload;
    },
    fetchExpensesFailure(state, action) {
      state.loading = false;
      state.expenses = action.payload;
    },
    addExpenseStart(state) {
      state.loading = true;
      state.error = null;
    },
    addExpenseSuccess(state, action) {
      state.loading = false;
      state.expenses.push(action.payload);
    },
    addExpenseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateExpenseStart(state){
      state.loading =true;
      state.error = null;
    },
    updateExpenseSuccess(state,action){
      state.loading = false;
      state.expenses = state.expenses.filter(exp=>exp._id != action.payload)
    },
    updateExpenseFailure(state,action){
      state.loading=false;
      state.error = action.payload;
    },
    deleteExpenseStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteExpenseSuccess(state, action) {
      state.loading = false;
      state.expenses = state.expenses.filter(exp=>exp._id != action.payload)
    },
    deleteExpenseFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseStart,
  addExpenseSuccess,
  addExpenseFailure,
  deleteExpenseStart,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  updateExpenseStart,
  updateExpenseSuccess,
  updateExpenseFailure
} = expenseSlice.actions;
export default expenseSlice.reducer;

// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  'auth/createUser',
  async ({ name, email, password, confirmPass }, thunkAPI) => {
    try {
      console.log(name,email,password,confirmPass)
      if (password === confirmPass) {
        const response = await fetch("http://localhost:3000/api/createUser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email,password })
        });
        const data = await response.json()
        console.log(data)
        if (!data.success) {
          return thunkAPI.rejectWithValue("Invalid email and password")
        }
        if (data.success) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("authToken", data.authtoken);
          // console.log(localStorage.getItem("userEmail","authtoken" ))
          console.log(email, data.authtoken)
          return { user: email, token: data.authtoken };
        }
      } else {
        alert("Password did not match")
      }
    }
    catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue("Signup failed. Server error.");
    }
  } 
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    // console.log(email,password)
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data)
      if (!data.success) {
        return thunkAPI.rejectWithValue("Invalid email and password")
      }
      localStorage.setItem("userEmail", email);
      localStorage.setItem("authToken", data.authtoken)
      console.log(email, data.authtoken)
      return { user: email, token: data.authtoken };
    }
    catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue("Login failed. Server error.");
    }
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem("userEmail") || null,
    token: localStorage.getItem("authToken") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null,
      state.token = null,
      localStorage.removeItem("userEmail")
      localStorage.removeItem("authToken")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { logout,signup } = authSlice.actions;
export default authSlice.reducer;



























// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.token = token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;

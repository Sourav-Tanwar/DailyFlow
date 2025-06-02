// import React from 'react'
import ExpenseTracker from './ExpenseTracker'
import Navbar from "./Navbar"
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { getExpense,updateExpense, deleteExpense } from '../features/expense/expenseSlice';

const Dashboard = () => {



  
  return (
    <>
      <ExpenseTracker  readOnly={true}/>
      
    </>
  )
}

export default Dashboard
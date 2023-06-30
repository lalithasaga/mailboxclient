import authReducer from "./Auth";
import {  configureStore } from '@reduxjs/toolkit';
import mailReducer from './MailSlice';
import userReducer from "./UserSlice";
//import expensesReducer from "../expensesReducer";


const store = configureStore({
  
  reducer : { 
    Auth : authReducer,
    mail: mailReducer,
    user: userReducer,
  }
})

export default store;
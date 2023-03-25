import AdminReducer from "./AdminSlice";
import SubadminReducer from "./SubadminSlice";
import ClientReducer from "./Client"
import { configureStore } from "@reduxjs/toolkit";


 export  const store = configureStore({
    reducer:{
admins : AdminReducer,
subadmins:SubadminReducer,
clients:ClientReducer
    }
})
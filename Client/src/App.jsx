import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "./layouts";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn } from "./pages/auth";
import { Provider } from "react-redux";
import { store } from "./Redux/Store"
import { useEffect } from "react";





function App() {




  let auth = JSON.parse(localStorage.getItem("user"))
  //  console.log(auth)

  return (

  <Provider store = {store}>


    <Routes>


       <Route path="/dashboard/*"

       element={  <Dashboard />} />
      <Route path="/auth/*" element={<Auth/>} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashboard/*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>

</Provider>



  );
}

export default App;

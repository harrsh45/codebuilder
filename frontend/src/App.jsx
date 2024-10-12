import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./App.css";
import NoPage from './pages/Nopage'
import Home from './pages/Home'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import Editor from './pages/Editor'
function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login/>}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/editor/:projectID" element={isLoggedIn ? <Editor /> : <Navigate to="/login"/>}/>
            <Route path="*" element={isLoggedIn ? <NoPage />: <Navigate to="/login"/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

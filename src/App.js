import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import DashBoard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';

/**
 * Entrypoint of react application; handles routing the application
 * by using {@link BrowserRouter}
 * @returns React Application
 */
const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/dashboard" element={<DashBoard />}/>
    </Routes>
  </BrowserRouter>
  );
};

export default App;

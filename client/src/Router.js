import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

const Router = () => {
    // users path shows all users, used to see if registration worked
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
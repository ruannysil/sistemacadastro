import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Privete from "./Privete";
import Profile from "../pages/Profile";
import Customer from "../pages/Customers";
import New from "../pages/New";

export default function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Privete><Dashboard /></Privete>} />
      <Route path="/profile" element={<Privete><Profile /></Privete>} />
      <Route path="/customers" element={<Privete><Customer /></Privete>} />
      <Route path="/new" element={<Privete><New /></Privete>} />
      <Route path="/new/:id" element={<Privete><New /></Privete>}/>
    </Routes>
  );
}

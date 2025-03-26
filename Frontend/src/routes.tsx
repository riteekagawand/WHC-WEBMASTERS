import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import Ecommerce from "./pages/Ecommerce"
import NotFound from "./pages/NotFound"
import Builder from "./pages/Builder"
import Forum from "./pages/Forum"
import Assistant from './pages/Assistant'
import Analytics from "./pages/Analytics"
import Login from "./components/Login"
/*************  ✨ Codeium Command 🌟  *************/
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          path="home"
          element={<Home />}
        >
          
        </Route>
        <Route
          path="builder"
          element={<Builder />}
        />
        <Route
          path="ecommerce"
          element={<Ecommerce />}
        />
        <Route
          path="analytics"
          element={<Analytics />}
        />
        <Route
          path="forum"
          element={<Forum />}
        />
        <Route
          path="profile"
          element={<Profile />}
        />
        <Route
          path="/aiassistant"
          element={<Assistant />} 
        />
        <Route
          path="/Login"
          element={<Login />} 
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  )
}
/******  22e3b27d-9193-4558-b726-8117db100321  *******/

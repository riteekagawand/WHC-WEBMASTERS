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
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  )
}

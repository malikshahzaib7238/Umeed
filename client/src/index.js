import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto";
import "./styles/index.css";
import Welcome from "./pages/Welcome";
import SellPage from "./pages/SellPage";
import ProductsPage from "./pages/Products";
import Login from "./pages/Login";
import NetworkingPage from "./pages/Netowrking";
import CoursesPage from "./pages/Courses";
import Header from "./constants/Header";
import ProfileSetupPage from "./pages/Setup";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
// Define your routes
import Network from "./pages/test";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />, // This route should show the Welcome component when the path is '/'
  },
  {
path:"/test",
element: <Network/>
  },
  {
path:"/setup",
element: <ProfileSetupPage/>
  },
  {
    path: "/sell",
    element: <SellPage />, // This route should show the SellPage component when the path is '/sell'
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path:"/courses",
    element: <CoursesPage/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/test",
    element: <Header/>
  },
  {
path: "/network",
element: <NetworkingPage/>
  },
  {
    path: "*", // Catch-all route for any undefined routes
    element: <App />, // Default to your main App component for any unknown paths
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        {/* Using RouterProvider to wrap the routes */}
      </RouterProvider>
      <CssBaseline />
      {/* <App /> can be removed as it's now handled by the router */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

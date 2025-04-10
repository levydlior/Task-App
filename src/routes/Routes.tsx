import React from "react";
import { useAuth } from "../auth/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";

const routesForPublic = [
  {
    path: "/",
    element: <div>landing</div>,
  },
];

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <div>tasks</div>,
      },
      {
        path: "/logout",
        element: <div>Logout</div>,
      },
    ],
  },
];

const routesForNotAuthenticatedOnly = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <div>Login</div> },
];

function Routes() {
  const { token } = useAuth();

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;

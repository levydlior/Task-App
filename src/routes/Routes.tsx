import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    // element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
];
function Routes() {

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;

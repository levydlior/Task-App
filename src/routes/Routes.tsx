import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";

const routes = [
  {
    path: "/",
    element: <div>landing</div>,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/logout",
    element: <div>Logout</div>,
  },
];

function Routes() {
  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
}

export default Routes;

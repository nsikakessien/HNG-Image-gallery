import { createBrowserRouter } from "react-router-dom";
import Home from "./domains/home/Home";
import Login from "./domains/login/Login";
import RequireAuth from "./RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth redirectTo="/login">
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

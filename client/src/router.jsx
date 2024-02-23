import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Compare from "./pages/Compare";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/compare",
    element: <Compare />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

export default router;

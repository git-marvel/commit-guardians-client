import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MyCommitBadge from "../pages/MyCommitBadge";
import MyCommitScoreboard from "../pages/MyCommitScoreboard";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-commit-badge",
    element: <MyCommitBadge />,
  },
  {
    path: "/my-commit-scoreboard",
    element: <MyCommitScoreboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

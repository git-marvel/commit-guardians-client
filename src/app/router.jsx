import { createBrowserRouter, redirect } from "react-router-dom";
import usePersistentStore from "../shared/store/usePersistentStore";
import Home from "../pages/Home";
import MyCommitBadge from "../pages/MyCommitBadge";
import MyCommitScoreboard from "../pages/MyCommitScoreboard";
import NotFound from "../pages/NotFound";
import GithubCallback from "../pages/GithubCallback";

const checkToRoute = () => {
  const { isAbleToRoute } = usePersistentStore.getState();

  return isAbleToRoute ? null : redirect("/");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-commit-badge",
    loader: checkToRoute,
    element: <MyCommitBadge />,
  },
  {
    path: "/my-commit-scoreboard",
    loader: checkToRoute,
    element: <MyCommitScoreboard />,
  },
  {
    path: "/oauth/github-callback",
    element: <GithubCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

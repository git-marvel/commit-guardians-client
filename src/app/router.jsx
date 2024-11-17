import { createBrowserRouter, redirect } from "react-router-dom";
import useCommitStore from "../features/commit/store/useCommitStore";
import Home from "../pages/Home";
import MyCommitBadge from "../pages/MyCommitBadge";
import MyCommitScoreboard from "../pages/MyCommitScoreboard";
import NotFound from "../pages/NotFound";

const usePossibleToCheck = () => {
  const {
    commitInfo: { numOfCommit },
  } = useCommitStore.getState();

  if (!numOfCommit || numOfCommit === 0) {
    return redirect("/");
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-commit-badge",
    loader: usePossibleToCheck,
    element: <MyCommitBadge />,
  },
  {
    path: "/my-commit-scoreboard",
    loader: usePossibleToCheck,
    element: <MyCommitScoreboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

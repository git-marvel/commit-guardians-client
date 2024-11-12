import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import RepositoryLinkTag from "../../features/repository/components/RepositoryLinkTag";
import ScoreBoardHeader from "./components/ScoreBoardHeader";
import ScoreBoardRow from "./components/ScoreBoardRow";
import useShowCommitDetails from "./hooks/useShowCommitDetails";

const GRID_COLS = "grid-cols-14";

const MyCommitScoreboard = () => {
  const { commitList } = useShowCommitDetails();

  return (
    <>
      <div className="m-4 flex w-full flex-row items-center justify-between px-12 py-5">
        <RepositoryLinkTag />
        <GithubAPIStatus />
      </div>
      <ScoreBoardHeader gridCols={GRID_COLS} />
      {commitList.map((commit) => (
        <ScoreBoardRow key={commit.sha} gridCols={GRID_COLS} commit={commit} />
      ))}
    </>
  );
};

export default MyCommitScoreboard;

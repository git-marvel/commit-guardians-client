import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import RepositoryLinkTag from "../../features/repository/components/RepositoryLinkTag";
import ScoreBoardHeader from "./components/ScoreBoardHeader";
import ScoreBoardRow from "./components/ScoreBoardRow";
import useShowCommitDetails from "./hooks/useShowCommitDetails";
import HomeButton from "../../shared/components/HomeButton";

const GRID_COLS = "grid-cols-16";

const MyCommitScoreboard = () => {
  const { commitList } = useShowCommitDetails();

  return (
    <>
      <div className="m-4 flex w-full flex-row items-center justify-between px-10 py-5">
        <div className="flex flex-row items-center">
          <HomeButton />
          <RepositoryLinkTag />
        </div>
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

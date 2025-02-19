import CommitFormatStyleValue from "../../features/commit/components/CommitFormatStyleValue";
import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import RepositoryLinkTag from "../../features/repository/components/RepositoryLinkTag";
import HomeButton from "../../shared/components/HomeButton";
import VirtualScroll from "../../shared/components/VirtualScroll";
import ScoreBoardHeader from "./components/ScoreBoardHeader";
import ScoreBoardRow from "./components/ScoreBoardRow";
import useShowCommitDetails from "./hooks/useShowCommitDetails";

const GRID_COLS = "grid-cols-16";

function MyCommitScoreboard() {
  const { commitList, needsVirtualScroll } = useShowCommitDetails();

  return (
    <div className="relative dark:bg-gray-900">
      <div className="sticky left-0 right-0 top-0 z-50 shadow-xl">
        <div className="flex w-full flex-row items-center justify-between bg-transparent px-10 py-5 backdrop-blur-xl">
          <div className="flex flex-row items-end">
            <HomeButton />
            <div className="flex flex-col">
              <CommitFormatStyleValue />
              <RepositoryLinkTag />
            </div>
          </div>
          <GithubAPIStatus />
        </div>
        <ScoreBoardHeader gridCols={GRID_COLS} />
      </div>
      {needsVirtualScroll ? (
        <VirtualScroll itemHeight={50}>
          {commitList.map((commit) => (
            <ScoreBoardRow
              key={commit.sha}
              gridCols={GRID_COLS}
              commit={commit}
            />
          ))}
        </VirtualScroll>
      ) : (
        commitList.map((commit) => (
          <ScoreBoardRow
            key={commit.sha}
            gridCols={GRID_COLS}
            commit={commit}
          />
        ))
      )}
    </div>
  );
}

export default MyCommitScoreboard;

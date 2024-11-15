import { useNavigate } from "react-router-dom";
import useCommitStore from "../../features/commit/store/useCommitStore";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadge";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import HomeButton from "../../shared/components/HomeButton";

const MyCommitBadge = () => {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");
  const numOfPerfectCommits = useCommitStore(
    (state) => state.commitSummary.numOfPerfectCommits
  );
  const totalScore = useCommitStore((state) => state.commitSummary.totalScore);
  const numOfCommit = useCommitStore((state) => state.commitInfo.numOfCommit);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="m-4 flex flex-row items-center justify-start px-10 py-5">
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-center">
        {numOfPerfectCommits && (
          <div className="mb-10 flex items-center font-bold text-slate-500">
            <span className="mr-1 text-2xl text-sky-300">
              {numOfPerfectCommits}
            </span>
            <span className="text-sm text-slate-300">commits</span>
          </div>
        )}
        {totalScore && (
          <>
            <p className="font-bold text-slate-500">Total Score</p>
            <h1 className="mb-4 px-4 text-4xl font-bold text-blue-400">
              + {totalScore}
            </h1>
          </>
        )}
        <div className="mb-2 flex flex-row items-center justify-between">
          <Button onClick={handleRoutingCommitScoreboard}>
            <>
              <span>View All Results</span>
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-200 text-xs font-semibold text-blue-800">
                {numOfCommit}
              </span>
            </>
          </Button>
        </div>
        <CopyBadgeButton />
        <Footer />
      </div>
    </div>
  );
};

export default MyCommitBadge;

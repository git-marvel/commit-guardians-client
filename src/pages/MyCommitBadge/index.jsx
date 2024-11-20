import { useNavigate } from "react-router-dom";
import useCommitStore from "../../features/commit/store/useCommitStore";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadge";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import HomeButton from "../../shared/components/HomeButton";
import ChartContainer from "./components/ChartContainer";
import Guide from "./components/Guide";

const MyCommitBadge = () => {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");
  const totalScore = useCommitStore((state) => state.commitSummary.totalScore);

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="m-4 flex flex-row items-center justify-start px-10 py-5">
        <HomeButton />
      </div>
      <div className="grid grid-cols-2 px-20">
        <div className="flex flex-col items-center">
          <ChartContainer />
          {totalScore && (
            <>
              <p className="font-bold text-slate-500">Total Score</p>
              <h1 className="mb-4 px-4 text-4xl font-bold text-blue-400">
                {totalScore} / 100
              </h1>
            </>
          )}
          <div className="mb-2 flex flex-row items-center justify-between">
            <Button onClick={handleRoutingCommitScoreboard}>
              <>
                <span>View All Results</span>
              </>
            </Button>
          </div>
          <CopyBadgeButton />
        </div>
        <Guide />
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default MyCommitBadge;

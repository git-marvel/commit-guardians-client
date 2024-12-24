import { useNavigate } from "react-router-dom";
import useCommitStore from "../../features/commit/store/useCommitStore";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadgeButton";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import HomeButton from "../../shared/components/HomeButton";
import ChartContainer from "./components/ChartContainer";
import Guide from "./components/Guide";

function MyCommitBadge() {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");
  const totalScore = useCommitStore((state) => state.commitSummary.totalScore);

  return (
    <div className="flex flex-col">
      <div className="px-10 py-5">
        <HomeButton />
      </div>
      <div className="flex h-fit w-dvw flex-col justify-between bg-gray-100 dark:bg-gray-900">
        <div className="grid w-full grid-cols-2 px-20">
          <div className="flex flex-col items-center justify-between">
            <ChartContainer />
            <div className="mt-5 flex w-full flex-row items-end justify-evenly">
              <div className="flex flex-col items-center">
                {totalScore && (
                  <>
                    <p className="font-bold text-slate-500">Total Score</p>
                    <h1 className="mb-4 px-4 text-4xl font-bold text-blue-500">
                      {totalScore} / 100
                    </h1>
                  </>
                )}
                <div className="mb-2 flex flex-row items-center justify-between">
                  <Button onClick={handleRoutingCommitScoreboard}>
                    View All Results
                  </Button>
                </div>
              </div>
              <CopyBadgeButton />
            </div>
          </div>
          <Guide />
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MyCommitBadge;

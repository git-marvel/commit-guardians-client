import { useNavigate } from "react-router-dom";
import useCommitStore from "../../features/commit/store/useCommitStore";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadge";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import HomeButton from "../../shared/components/HomeButton";

const MyCommitBadge = () => {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");
  const perfectCommitNumber = useCommitStore(
    (state) => state.scoredCommitInfo.perfectCommitNumber
  );
  const numOfCommit = useCommitStore((state) => state.commitInfo.numOfCommit);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="m-4 flex flex-row items-center justify-start px-12 py-5">
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-center">
        {perfectCommitNumber && (
          <>
            <p className="font-bold text-slate-500">Total</p>
            <h1 className="p-4 text-4xl font-bold text-blue-400">
              {perfectCommitNumber}
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

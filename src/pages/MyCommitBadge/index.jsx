import { useNavigate } from "react-router-dom";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadge";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import useCommitStore from "../../features/commit/store/useCommitStore";

const MyCommitBadge = () => {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");
  const perfectCommitNumber = useCommitStore(
    (state) => state.scoredCommitInfo.perfectCommitNumber
  );

  return (
    <>
      <Button
        onClick={handleRoutingCommitScoreboard}
      >{`💯 ${perfectCommitNumber} commits`}</Button>
      <CopyBadgeButton />
      <Footer />
    </>
  );
};

export default MyCommitBadge;

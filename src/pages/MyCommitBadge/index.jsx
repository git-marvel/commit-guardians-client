import { useNavigate } from "react-router-dom";
import CopyBadgeButton from "../../features/commitBadge/components/CopyBadge";
import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";

const MyCommitBadge = () => {
  const navigate = useNavigate();
  const handleRoutingCommitScoreboard = () => navigate("/my-commit-scoreboard");

  return (
    <>
      <Button onClick={handleRoutingCommitScoreboard}>💯 10 commits</Button>
      <CopyBadgeButton />
      <Footer />
    </>
  );
};

export default MyCommitBadge;

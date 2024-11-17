import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCommitStore from "../store/useCommitStore";

const useCheckToNavigate = () => {
  const navigate = useNavigate();
  const numOfCommit = useCommitStore((state) => state.commitInfo.numOfCommit);

  useEffect(() => {
    if (numOfCommit === 0) {
      navigate("/");
    }
  }, [numOfCommit, navigate]);
};

export default useCheckToNavigate;

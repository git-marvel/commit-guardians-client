import useCommitStore from "../../../features/commit/store/useCommitStore";

const useShowCommitDetails = () => {
  const commitList = useCommitStore((state) => state.commitInfo.commitList);

  return { commitList };
};

export default useShowCommitDetails;

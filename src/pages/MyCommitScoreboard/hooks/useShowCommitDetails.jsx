import useCommitStore from "../../../features/commit/store/useCommitStore";

const MAX_LENGTH_RENDERING_BOX = 300;

const useShowCommitDetails = () => {
  const commitList = useCommitStore((state) => state.commitInfo.commitList);
  const needsVirtualScroll = commitList.length > MAX_LENGTH_RENDERING_BOX;

  return { commitList, needsVirtualScroll };
};

export default useShowCommitDetails;

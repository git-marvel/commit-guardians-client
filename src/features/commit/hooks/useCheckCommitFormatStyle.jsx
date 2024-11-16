import useCommitStore from "../../../features/commit/store/useCommitStore";

const useCheckCommitFormatStyle = () => {
  const numOfCommit = useCommitStore((state) => state.commitInfo.numOfCommit);
  const commitFormatStyle = useCommitStore(
    (state) => state.commitInfo.commitFormatStyle
  );

  const formatStyleAndRate = Object.entries(commitFormatStyle).reduce(
    (acc, [formatStyle, count]) => {
      if (count === 0) {
        return acc;
      }

      const rate = Math.round((count / numOfCommit) * 100);
      acc[formatStyle] = `${rate}%`;
      return acc;
    },
    {}
  );

  return formatStyleAndRate;
};

export default useCheckCommitFormatStyle;

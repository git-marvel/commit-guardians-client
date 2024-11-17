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

  const sortedFormatStyleAndRate = Object.entries(formatStyleAndRate).sort(
    (a, b) => parseFloat(b[1]) - parseFloat(a[1])
  );

  return sortedFormatStyleAndRate;
};

export default useCheckCommitFormatStyle;

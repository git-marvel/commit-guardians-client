import { useCallback, useState } from "react";
import { getCheckableCommits } from "../../../entities/commit/services";
import useCommitStore from "../../../features/commit/store/useCommitStore";
import extractGitInfoFromURL from "../../../shared/utils/extractGitInfoFromURL";
import { getCommitDiffList, getCommitList } from "../api";

const useValidateCommit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setCommitList = useCommitStore((state) => state.setCommitList);
  const setTotalNumOfCommit = useCommitStore(
    (state) => state.setTotalNumOfCommit
  );
  const commitList = useCommitStore((state) => state.commitInfo.commitList);

  const handleCheckCommitQuality = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const formData = new FormData(event.target);
      const repositoryURL = Object.fromEntries(
        formData.entries()
      ).repositoryURL;
      const { owner, repo } = extractGitInfoFromURL(repositoryURL);

      try {
        const allCommits = await getCommitList({ owner, repo });
        const commitsToCheck = getCheckableCommits(allCommits);

        const diffList = await getCommitDiffList({
          owner,
          repo,
          commitsToCheck,
        });

        setTotalNumOfCommit(allCommits.length);
        setCommitList(diffList);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setCommitList, setTotalNumOfCommit]
  );

  return { isLoading, commitList, handleCheckCommitQuality };
};

export default useValidateCommit;

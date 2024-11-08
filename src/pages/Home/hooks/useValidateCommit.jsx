import { useCallback } from "react";
import { getCheckableCommits } from "../../../entities/commit/services";
import useCommitStore from "../../../features/commit/store/useCommitStore";
import extractGitInfoFromURL from "../../../shared/utils/extractGitInfoFromURL";
import { getCommitDiffList, getCommitList } from "../api";

const useValidateCommit = () => {
  const setCommitList = useCommitStore((state) => state.setCommitList);
  const commitList = useCommitStore((state) => state.commitList);

  const handleCheckCommitQuality = useCallback(
    async (event) => {
      event.preventDefault();

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

        setCommitList(diffList);
      } catch (error) {
        throw new Error(error);
      }
    },
    [setCommitList]
  );

  return { commitList, handleCheckCommitQuality };
};

export default useValidateCommit;

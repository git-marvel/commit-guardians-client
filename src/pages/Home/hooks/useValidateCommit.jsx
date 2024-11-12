import { useCallback, useState } from "react";
import { setCommitQualityScore } from "../../../entities/commit/commitEntity";
import { getCheckableCommits } from "../../../entities/commit/services";
import useCommitStore from "../../../features/commit/store/useCommitStore";
import extractGitInfoFromURL from "../../../shared/utils/extractGitInfoFromURL";
import { getCommitDiffList, getCommitList } from "../api";

const useValidateCommit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const setCommitList = useCommitStore((state) => state.setCommitList);
  const setRepository = useCommitStore((state) => state.setRepository);
  const setTotalNumOfCommit = useCommitStore(
    (state) => state.setTotalNumOfCommit
  );
  const commitList = useCommitStore((state) => state.commitInfo.commitList);

  const handleCheckCommitQuality = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setIsLoading(true);

        const formData = new FormData(event.target);
        const repositoryURL = Object.fromEntries(
          formData.entries()
        ).repositoryURL;

        const { owner, repo } = extractGitInfoFromURL(repositoryURL);

        setRepository({ owner, repo });

        const allCommits = await getCommitList({ owner, repo });
        const commitsToCheck = getCheckableCommits(allCommits);

        const commitWithDiff = await getCommitDiffList({
          owner,
          repo,
          commitsToCheck,
        });

        setTotalNumOfCommit(allCommits.length);

        commitWithDiff.forEach((commit) => {
          setCommitQualityScore({
            commit,
            commitType: commit.type,
            diffObj: commit.diffObj,
          });
        });

        setCommitList(commitWithDiff);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [setCommitList, setRepository, setTotalNumOfCommit]
  );

  return { isLoading, errorMessage, commitList, handleCheckCommitQuality };
};

export default useValidateCommit;

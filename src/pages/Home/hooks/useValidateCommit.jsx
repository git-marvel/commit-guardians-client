import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCommitQualityScore } from "../../../entities/commit/commitEntity";
import { getCheckableCommits } from "../../../entities/commit/services";
import useCommitStore from "../../../features/commit/store/useCommitStore";
import useGithubStatusStore from "../../../features/githubAPIStatus/store";
import { ERROR_MESSAGES } from "../../../shared/constants";
import extractGitInfoFromURL from "../../../shared/utils/extractGitInfoFromURL";
import { getCommitDiffList, getCommitList } from "../api";

const useValidateCommit = () => {
  const navigate = useNavigate();
  const [isSubmitButtonClick, setSubmitButtonClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubAPIHealthy, setGithubAPIHealthy] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const setCommitList = useCommitStore((state) => state.setCommitList);
  const setRepository = useCommitStore((state) => state.setRepository);
  const setTotalNumOfCommit = useCommitStore(
    (state) => state.setTotalNumOfCommit
  );
  const githubStatus = useGithubStatusStore((state) => state.githubStatus);

  const shouldNavigate = useMemo(
    () =>
      !isLoading &&
      errorMessage === null &&
      isGithubAPIHealthy &&
      isSubmitButtonClick,
    [isLoading, errorMessage, isGithubAPIHealthy, isSubmitButtonClick]
  );

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/my-commit-badge");
    }
  }, [shouldNavigate, navigate]);

  useEffect(() => {
    const isUnhealthy = githubStatus === "unknown" || githubStatus === "major";
    setErrorMessage(isUnhealthy ? ERROR_MESSAGES.githubStatusError : null);
    setGithubAPIHealthy(!isUnhealthy);
  }, [githubStatus]);

  const fetchCommits = useCallback(
    async ({ owner, repo }) => {
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
    },
    [setCommitList, setTotalNumOfCommit]
  );

  const handleCheckCommitQuality = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setIsLoading(true);
        setSubmitButtonClick(true);

        const formData = new FormData(event.target);
        const repositoryURL = Object.fromEntries(
          formData.entries()
        ).repositoryURL;
        const { owner, repo } = extractGitInfoFromURL(repositoryURL);

        setRepository({ owner, repo });
        await fetchCommits({ owner, repo });

        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
        setSubmitButtonClick(false);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCommits, setRepository]
  );

  return {
    isLoading,
    errorMessage,
    isGithubAPIHealthy,
    handleCheckCommitQuality,
  };
};

export default useValidateCommit;

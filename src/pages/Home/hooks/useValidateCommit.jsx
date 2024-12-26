import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCommitQualityScore } from "../../../entities/commit/commitEntity";
import {
  getCheckableCommits,
  getFormatStyleAndRate,
} from "../../../entities/commit/services";
import { getCommitSummary } from "../../../entities/score/services";
import useCommitStore from "../../../features/commit/store/useCommitStore";
import usePersistentStore from "../../../shared/store/usePersistentStore";
import useGithubStatusStore from "../../../features/githubAPIStatus/store/useGithubStatusStore";
import { ERROR_MESSAGES } from "../../../shared/constants";
import extractGitInfoFromURL from "../../../shared/utils/extractGitInfoFromURL";
import { getCommitDiffList, getCommitList } from "../api";

const useValidateCommit = () => {
  const navigate = useNavigate();
  const [isSubmitButtonClick, setSubmitButtonClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubAPIHealthy, setGithubAPIHealthy] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const setRepository = useCommitStore((state) => state.setRepository);
  const setCommitList = useCommitStore((state) => state.setCommitList);
  const setCommitFormatStyle = useCommitStore(
    (state) => state.setCommitFormatStyle
  );
  const setTotalNumOfCommit = useCommitStore(
    (state) => state.setTotalNumOfCommit
  );
  const setIsAbleToRoute = usePersistentStore(
    (state) => state.setIsAbleToRoute
  );
  const setCommitSummary = useCommitStore((state) => state.setCommitSummary);
  const numOfCommit = useCommitStore((state) => state.commitInfo.numOfCommit);
  const githubStatus = useGithubStatusStore((state) => state.githubStatus);
  const githubToken = usePersistentStore((state) => state.githubToken);

  useEffect(() => {
    if (numOfCommit > 0) {
      setIsAbleToRoute(true);
    }

    setErrorMessage(
      numOfCommit === 0 && !isLoading && isSubmitButtonClick
        ? ERROR_MESSAGES.noCommitsToCheck
        : null
    );
  }, [numOfCommit, isLoading, isSubmitButtonClick, setIsAbleToRoute]);

  useEffect(() => {
    if (
      !isLoading &&
      isGithubAPIHealthy &&
      errorMessage === null &&
      numOfCommit !== 0 &&
      isSubmitButtonClick
    ) {
      navigate("/my-commit-badge");
    }
  }, [
    isLoading,
    isGithubAPIHealthy,
    errorMessage,
    numOfCommit,
    isSubmitButtonClick,
    navigate,
  ]);

  useEffect(() => {
    const isUnhealthy = githubStatus === "unknown" || githubStatus === "major";

    setErrorMessage(isUnhealthy ? ERROR_MESSAGES.githubStatusError : null);
    setGithubAPIHealthy(!isUnhealthy);
  }, [githubStatus]);

  const fetchCommits = useCallback(
    async ({ owner, repo }) => {
      const allCommits = await getCommitList({ owner, repo, githubToken, });
      const commitsToCheck = getCheckableCommits(allCommits);
      const commitWithDiff = await getCommitDiffList({
        owner,
        repo,
        commitsToCheck,
        githubToken,
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

      const formatStyleCountInfo = getFormatStyleAndRate(commitsToCheck);
      setCommitFormatStyle(formatStyleCountInfo);

      const totalCommitQualityInfo = getCommitSummary(commitWithDiff);
      setCommitSummary(totalCommitQualityInfo);
    },
    [setCommitFormatStyle, setCommitList, setCommitSummary, setTotalNumOfCommit]
  );

  const handleCheckCommitQuality = useCallback(
    async (event) => {
      event.preventDefault();
      setErrorMessage(null);
      setIsAbleToRoute(false);

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
      } catch (error) {
        setErrorMessage(error.message);
        setSubmitButtonClick(false);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCommits, setRepository, setIsAbleToRoute]
  );

  return {
    isLoading,
    errorMessage,
    isGithubAPIHealthy,
    handleCheckCommitQuality,
  };
};

export default useValidateCommit;

import useGithubAPIStatus from "../hooks/useGithubAPIStatus";

const GithubAPIStatus = () => {
  const { githubAPIStatus } = useGithubAPIStatus();

  return (
    <div className="flex items-center space-x-2">
      <h3>GitHub API Status</h3>
      <div className={githubAPIStatus}></div>
    </div>
  );
};

export default GithubAPIStatus;

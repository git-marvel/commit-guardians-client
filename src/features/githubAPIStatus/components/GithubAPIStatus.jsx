import useGithubAPIStatus from "../hooks/useGithubAPIStatus";

const GithubAPIStatus = () => {
  const { githubAPIStatusColor } = useGithubAPIStatus();

  return (
    <div className="flex items-center space-x-2">
      <h3>GitHub API Status</h3>
      <div className={`h-5 w-5 rounded-full ${githubAPIStatusColor}`}></div>
    </div>
  );
};

export default GithubAPIStatus;

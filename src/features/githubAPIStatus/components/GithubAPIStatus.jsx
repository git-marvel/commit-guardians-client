import useGithubAPIStatus from "../hooks/useGithubAPIStatus";

const GITHUB_STATUS_ADDRESS = "https://www.githubstatus.com";

const GithubAPIStatus = () => {
  const { githubAPIStatusColor } = useGithubAPIStatus();

  return (
    <a href={GITHUB_STATUS_ADDRESS} target="_blank">
      <div className="flex items-center rounded-full border bg-slate-50 px-4 py-1 dark:border-slate-600 dark:bg-slate-700">
        <p className="pr-2 text-sm text-slate-400 dark:text-slate-300">
          GitHub API Status
        </p>
        <div
          className={`h-4 w-4 rounded-full border ${githubAPIStatusColor}`}
        ></div>
      </div>
    </a>
  );
};

export default GithubAPIStatus;

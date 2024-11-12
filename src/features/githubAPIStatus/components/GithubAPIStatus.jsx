import useGithubAPIStatus from "../hooks/useGithubAPIStatus";

const GithubAPIStatus = () => {
  const { githubAPIStatusColor } = useGithubAPIStatus();

  return (
    <div className="flex cursor-pointer items-center rounded-full border bg-slate-50 px-4 py-1">
      <p className="pr-2 text-sm text-slate-400">GitHub API Status</p>
      <div
        className={`h-4 w-4 rounded-full border ${githubAPIStatusColor}`}
      ></div>
    </div>
  );
};

export default GithubAPIStatus;

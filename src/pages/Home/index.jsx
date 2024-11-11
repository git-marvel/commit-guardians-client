import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import Button from "../../shared/components/Button";
import Loading from "../../shared/components/Loading";
import useValidateCommit from "./hooks/useValidateCommit";

const Home = () => {
  const { isLoading, errorMessage, commitList, handleCheckCommitQuality } =
    useValidateCommit();

  return (
    <div className="absolute top-0 m-10">
      <GithubAPIStatus />
      <form method="post" onSubmit={handleCheckCommitQuality}>
        <label>
          <span className="text-slate-400">Repository URL</span>
          <input
            className="w-full"
            name="repositoryURL"
            placeholder="ex) https://github.com/git-marvel/commit-guardians-client"
            required
          />
        </label>
        <Button>커밋 퀄리티 확인하기</Button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isLoading && <Loading />}
      {commitList.map((commit, index) => (
        <div key={commit.sha}>
          <div className="mt-10 bg-lime-100">
            <span className="p-1 text-red-500">index: {index}</span>
            <span className="p-1 text-slate-400">sha: {commit.sha}</span>
            <span className="p-3 text-green-400">{commit.type}</span>
            <span>message: {commit.message}</span>
          </div>
          {Object.entries(commit.diffObj).map(([key, changes]) => (
            <div key={key}>
              <span className="p-1 text-blue-500">File: {key}</span>
              {changes.map((change, changeIndex) => (
                <div key={changeIndex}>
                  {change["+"] && (
                    <span className="p-1 text-green-500">+ {change["+"]}</span>
                  )}
                  {change["-"] && (
                    <span className="p-1 text-red-500">- {change["-"]}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;

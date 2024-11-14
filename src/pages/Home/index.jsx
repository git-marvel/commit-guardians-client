import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import Button from "../../shared/components/Button";
import Loading from "../../shared/components/Loading";
import useValidateCommit from "./hooks/useValidateCommit";

const Home = () => {
  const {
    isLoading,
    errorMessage,
    isGithubAPIHealthy,
    handleCheckCommitQuality,
  } = useValidateCommit();

  return (
    <div className="m-10">
      <GithubAPIStatus />
      {isGithubAPIHealthy && (
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
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {isLoading && <Loading />}
    </div>
  );
};

export default Home;

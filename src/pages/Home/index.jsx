import COMMIT_TYPE from "../../entities/commit/enum/commitTypeEnum";
import CommitTypeValue from "../../features/commit/components/CommitTypeValue";
import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import RepositoryInputForm from "../../features/repository/components/RepositoryInputForm";
import Button from "../../shared/components/Button";
import Loading from "../../shared/components/Loading";
import usePersistentStore from "../../shared/store/usePersistentStore";
import Title from "./components/Title";
import useValidateCommit from "./hooks/useValidateCommit";

function Home() {
  const {
    isLoading,
    errorMessage,
    isGithubAPIHealthy,
    handleCheckCommitQuality,
    githubToken,
  } = useValidateCommit();

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user,repo`;
    window.location.href = githubAuthUrl;
  };

  const logout = usePersistentStore((state) => state.clearAll);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-dvh w-dvw">
      <div className="m-4 flex flex-row items-center justify-end space-x-10 px-10 py-5">
        {githubToken ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <Button onClick={handleLogin}>Log In</Button>
        )}
        <GithubAPIStatus />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="m-2 flex flex-row gap-2">
          {COMMIT_TYPE.list.map((typeObj) => (
            <CommitTypeValue key={typeObj.type} type={typeObj.type} />
          ))}
        </div>
        <Title />
        {isGithubAPIHealthy && !isLoading && (
          <RepositoryInputForm onSubmit={handleCheckCommitQuality} />
        )}
        {errorMessage && <p className="m-5 text-red-500">{errorMessage}</p>}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default Home;

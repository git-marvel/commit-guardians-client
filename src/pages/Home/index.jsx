import COMMIT_TYPE from "../../entities/commit/enum/commitTypeEnum";
import CommitTypeValue from "../../features/commit/components/CommitTypeValue";
import GithubAPIStatus from "../../features/githubAPIStatus/components/GithubAPIStatus";
import RepositoryInputForm from "../../features/repository/components/RepositoryInputForm";
import Loading from "../../shared/components/Loading";
import Title from "./components/Title";
import useValidateCommit from "./hooks/useValidateCommit";

function Home() {
  const {
    isLoading,
    errorMessage,
    isGithubAPIHealthy,
    handleCheckCommitQuality,
  } = useValidateCommit();

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="m-4 flex flex-row items-center justify-end px-10 py-5">
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

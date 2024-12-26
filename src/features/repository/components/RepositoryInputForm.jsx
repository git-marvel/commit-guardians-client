import PropTypes from "prop-types";
import Button from "../../../shared/components/Button";
import CheckIcon from "../../../shared/components/CheckIcon";
import GithubIcon from "../../../shared/components/GithubIcon";
import usePersistentStore from "../../../shared/store/usePersistentStore";

function RepositoryInputForm({ onSubmit }) {
  const { githubToken } = usePersistentStore();

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user,repo`;
    window.location.href = githubAuthUrl;
  };

  return (
    <form
      className="mx-auto w-full max-w-2xl"
      method="post"
      onSubmit={githubToken && onSubmit}
    >
      <label className="mb-2 block text-base font-medium text-gray-900 dark:text-white">
        Github Repository URL
      </label>
      <div className="mb-8 flex">
        <span className="inline-flex items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-300 dark:bg-gray-600 dark:text-gray-400">
          <GithubIcon />
        </span>
        <input
          type="url"
          name="repositoryURL"
          required={githubToken ? true : false}
          placeholder="ex) https://github.com/git-marvel/commit-guardians-client"
          className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
        />
      </div>
      <div className="flex justify-center">
        {githubToken ? (
          <Button>
            <>
              <CheckIcon />
              <span>Check the Quality</span>
            </>
          </Button>
        ) : (
          <Button onClick={handleLogin}>GitHub으로 로그인</Button>
        )}
      </div>
    </form>
  );
}

RepositoryInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RepositoryInputForm;

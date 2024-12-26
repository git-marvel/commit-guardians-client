import PropTypes from "prop-types";
import Button from "../../../shared/components/Button";
import CheckIcon from "../../../shared/components/CheckIcon";
import GithubIcon from "../../../shared/components/GithubIcon";
import usePersistentStore from "../../../shared/store/usePersistentStore";

function RepositoryInputForm({ onSubmit }) {
  const { githubToken } = usePersistentStore();

  return (
    <form
      className="mx-auto w-full max-w-2xl"
      method="post"
      onSubmit={onSubmit}
    >
      <label className="mb-2 block text-base font-medium text-gray-900 dark:text-white">
        Github Repository URL
      </label>
      <div className="mb-8 flex">
        <span className="inline-flex items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-300 dark:bg-gray-600 dark:text-gray-400">
          <GithubIcon />
        </span>
        {githubToken ? (
          <input
            type="url"
            name="repositoryURL"
            required
            placeholder="ex) https://github.com/git-marvel/commit-guardians-client"
            className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
          />
        ) : (
          <select
            type="url"
            name="repositoryURL"
            className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
          >
            <option value="https://github.com/facebook/react">
              facebook/react
            </option>
            <option value="https://github.com/vuejs/vue">vuejs/vue</option>
            <option value="https://github.com/pmndrs/zustand">
              pmndrs/zustand
            </option>
          </select>
        )}
      </div>
      <div className="flex justify-center">
        <Button>
          <>
            <CheckIcon />
            <span>Check the Quality</span>
          </>
        </Button>
      </div>
    </form>
  );
}

RepositoryInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RepositoryInputForm;

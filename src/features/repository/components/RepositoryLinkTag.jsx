import useCommitStore from "../../commit/store/useCommitStore";

function RepositoryLinkTag() {
  const repository = useCommitStore((state) => state.repository);

  return (
    <a
      href={`https://github.com/${repository.owner}/${repository.repo}`}
      target="_blank"
      className="rounded-lg px-3 py-1 text-slate-700 transition duration-300 ease-in-out hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-200"
    >
      <span>{repository.owner}</span>
      <span className="px-2 font-black text-blue-300">/</span>
      <span className="text-lg font-semibold">{repository.repo}</span>
    </a>
  );
}

export default RepositoryLinkTag;

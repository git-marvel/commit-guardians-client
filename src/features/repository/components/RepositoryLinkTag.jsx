import useCommitStore from "../../commit/store/useCommitStore";

const RepositoryLinkTag = () => {
  const repository = useCommitStore((state) => state.repository);

  return (
    <a
      href={`https://github.com/${repository.owner}/${repository.repo}`}
      target="_blank"
    >
      <span>{repository.owner}</span>
      <span className="px-2 font-black text-sky-300">/</span>
      <span className="text-lg font-semibold text-slate-800">
        {repository.repo}
      </span>
    </a>
  );
};

export default RepositoryLinkTag;

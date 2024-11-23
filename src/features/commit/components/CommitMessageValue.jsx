import PropTypes from "prop-types";

function CommitMessageValue({ commit }) {
  const commitMessageTitle = commit.message.split("\n")[0];

  return (
    <a
      href={commit.url}
      target="_blank"
      className="group relative w-full font-semibold"
    >
      <p>{commitMessageTitle}</p>
      <p className="absolute right-0 w-fit -translate-y-full rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100">
        👈 링크로 이동
      </p>
    </a>
  );
}

CommitMessageValue.propTypes = {
  commit: PropTypes.shape({
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommitMessageValue;

import PropTypes from "prop-types";

const CommitMessageValue = ({ commit }) => {
  return (
    <a
      href={commit.url}
      target="_blank"
      className="group relative w-full font-semibold"
    >
      <p>{commit.message}</p>
      <p className="absolute right-0 w-fit -translate-y-full rounded-full border border-purple-200 bg-white px-2 py-1 text-xs text-slate-800 opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100">
        👈 링크로 이동
      </p>
    </a>
  );
};

CommitMessageValue.propTypes = {
  commit: PropTypes.object.isRequired,
};

export default CommitMessageValue;

import PropTypes from "prop-types";

const SHA_FULL_LENGTH = 40;
const SHA_SHORT_LENGTH = 7;

const ShaHoverBox = ({ copiedSha, shaType }) => {
  const isShaCopied =
    shaType === "Short"
      ? copiedSha.length === SHA_SHORT_LENGTH
      : copiedSha.length === SHA_FULL_LENGTH;

  return (
    <p
      className={`absolute bottom-1 -translate-y-full rounded-full border border-blue-400 px-2 py-1 text-xs ${isShaCopied ? "text-slate-800" : "text-white"} whitespace-nowrap opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100 ${isShaCopied ? "bg-blue-300" : "bg-slate-800"}`}
    >
      {isShaCopied ? "Copied ✔️" : `${shaType} Copy`}
    </p>
  );
};

ShaHoverBox.propTypes = {
  copiedSha: PropTypes.string.isRequired,
  shaType: PropTypes.string.isRequired,
};

export default ShaHoverBox;

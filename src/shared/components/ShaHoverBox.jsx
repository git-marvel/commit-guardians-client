import PropTypes from "prop-types";

const ShaHoverBox = ({ copiedSha, shaType }) => {
  const isShortSha =
    shaType === "Short" ? copiedSha.length === 7 : copiedSha.length === 40;

  return (
    <p
      className={`absolute bottom-1 -translate-y-full rounded-full border border-blue-400 px-2 py-1 text-xs ${isShortSha ? "text-slate-800" : "text-white"} whitespace-nowrap opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100 ${isShortSha ? "bg-blue-300" : "bg-slate-800"}`}
    >
      {isShortSha ? "Copied ✔️" : `${shaType} Copy`}
    </p>
  );
};

ShaHoverBox.propTypes = {
  copiedSha: PropTypes.string.isRequired,
  shaType: PropTypes.string.isRequired,
};

export default ShaHoverBox;

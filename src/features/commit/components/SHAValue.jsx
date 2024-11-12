import PropTypes from "prop-types";
import CopyIcon from "../../../shared/assets/svg/copy-icon.svg";
import useCopiedSha from "../hooks/useCopiedSha";

const SHAValue = ({ sha }) => {
  const { copiedSha, handleCopyCommitSha } = useCopiedSha();

  return (
    <div
      className="group relative"
      onClick={(event) => handleCopyCommitSha(event, sha)}
    >
      <div className="flex flex-row items-center text-sm">
        <span className="pr-1 text-slate-700">{sha.substring(0, 7)}</span>
        <img
          src={CopyIcon}
          alt="Copy Icon"
          width="16"
          height="14"
          className="my-0.5 text-slate-700"
        />
      </div>
      <p
        className={`absolute bottom-1 -translate-y-full rounded-full border border-blue-400 px-2 py-1 text-xs ${copiedSha === sha ? "text-slate-800" : "text-white"} opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100 ${copiedSha === sha ? "bg-blue-300" : "bg-slate-800"}`}
      >
        {copiedSha === sha ? "Copied ✔️" : sha.substring(0, 7) + "...."}
      </p>
    </div>
  );
};

SHAValue.propTypes = {
  sha: PropTypes.string.isRequired,
};

export default SHAValue;

import PropTypes from "prop-types";
import CopyIcon from "../../../shared/assets/svg/copy-icon.svg";
import useCopiedSha from "../hooks/useCopiedSha";
import ShaHoverBox from "../../../shared/components/ShaHoverBox";

const SHAValue = ({ sha }) => {
  const { copiedSha, handleCopyCommitSha } = useCopiedSha();
  const shortSha = sha.substring(0, 7);

  return (
    <div className="relative flex flex-row items-center text-sm">
      <div className="group">
        <span
          className="cursor-pointer pr-1 text-slate-700"
          onClick={(event) => handleCopyCommitSha(event, shortSha)}
        >
          <ShaHoverBox copiedSha={copiedSha} shaType="Short" />
          {shortSha}
        </span>
      </div>
      <div className="group">
        <img
          src={CopyIcon}
          alt="Copy Icon"
          width="16"
          height="14"
          className="my-0.5 cursor-pointer text-slate-700"
          onClick={(event) => handleCopyCommitSha(event, sha)}
        />
        <ShaHoverBox copiedSha={copiedSha} shaType="Full" />
      </div>
    </div>
  );
};

SHAValue.propTypes = {
  sha: PropTypes.string.isRequired,
};

export default SHAValue;

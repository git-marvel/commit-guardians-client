import PropTypes from "prop-types";
import CopyIcon from "../../../shared/components/CopyIcon";
import useCopiedSha from "../hooks/useCopiedSha";
import ShaHoverBox from "./ShaHoverBox";

const SHAValue = ({ sha }) => {
  const { copiedSha, handleCopyCommitSha } = useCopiedSha();
  const shortSha = sha.substring(0, 7);

  return (
    <div className="relative flex flex-row items-center text-sm">
      <div className="group">
        <span
          className="cursor-pointer pr-1 text-slate-700 dark:text-slate-400"
          onClick={(event) => handleCopyCommitSha(event, shortSha)}
        >
          <ShaHoverBox copiedSha={copiedSha} shaType="Short" />
          {shortSha}
        </span>
      </div>
      <div className="group">
        <CopyIcon onClick={(event) => handleCopyCommitSha(event, sha)} />
        <ShaHoverBox copiedSha={copiedSha} shaType="Full" />
      </div>
    </div>
  );
};

SHAValue.propTypes = {
  sha: PropTypes.string.isRequired,
};

export default SHAValue;

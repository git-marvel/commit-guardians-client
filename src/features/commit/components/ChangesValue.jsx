import PropTypes from "prop-types";
import { memo } from "react";
import FileIcon from "../../../shared/assets/svg/file-icon.svg";
import BarGraph from "../../../shared/components/BarGraph";

const ChangesValue = memo(({ commit }) => {
  if (!commit.numOfFiles) {
    return null;
  }

  return (
    <div className="flex">
      <img
        src={FileIcon}
        alt="File Icon"
        width="20"
        height="18"
        color="slate-400"
        className="my-0.5"
      />
      <p className="pl-1 pr-4 font-bold text-slate-400">{commit.numOfFiles}</p>
      <BarGraph
        totalChanges={commit.numOfChanges}
        qualityScore={commit.qualityScore}
      />
    </div>
  );
});

ChangesValue.propTypes = {
  commit: PropTypes.shape({
    numOfFiles: PropTypes.number,
    numOfChanges: PropTypes.number,
    qualityScore: PropTypes.number,
  }).isRequired,
};

ChangesValue.displayName = "ChangesValue";

export default ChangesValue;

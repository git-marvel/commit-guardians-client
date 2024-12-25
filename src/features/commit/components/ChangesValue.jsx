import PropTypes from "prop-types";
import { memo } from "react";
import BarGraph from "../../../shared/components/BarGraph";
import FileIcon from "../../../shared/components/FileIcon";

const ChangesValue = memo(function ChangesValue({ commit }) {
  if (!commit.numOfFiles) {
    return null;
  }

  return (
    <div className="flex">
      <FileIcon />
      <p className="w-10 pl-1 pr-4 font-bold text-slate-400">
        {commit.numOfFiles}
      </p>
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

export default ChangesValue;

import PropTypes from "prop-types";

const CommitQualityScore = ({ qualityScore }) => {
  return (
    <div className="w-20 rounded px-1 py-1 text-xl font-bold text-blue-500">
      Score: {qualityScore}
    </div>
  );
};

CommitQualityScore.propTypes = {
  qualityScore: PropTypes.number.isRequired,
};

export default CommitQualityScore;

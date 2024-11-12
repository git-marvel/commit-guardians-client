import PropTypes from "prop-types";

const CommitQualityScore = ({ qualityScore }) => {
  return (
    <p
      className={`w-20 rounded py-1 text-base font-bold ${qualityScore === 100 ? "text-green-400" : "text-slate-500"} `}
    >
      {qualityScore === 100 ? `${qualityScore}점 🎉` : `${qualityScore}점`}
    </p>
  );
};

CommitQualityScore.propTypes = {
  qualityScore: PropTypes.number.isRequired,
};

export default CommitQualityScore;

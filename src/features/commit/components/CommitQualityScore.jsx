import PropTypes from "prop-types";

const CommitQualityScore = ({ qualityScore }) => {
  return (
    <p
      className={`w-20 rounded py-1 text-base font-bold ${qualityScore === 100 && qualityScore !== 0 ? "text-sky-400" : "text-black-900"} ${qualityScore === 0 && "text-slate-300"} `}
    >
      {qualityScore === 100 ? `${qualityScore}점 🎉` : `${qualityScore}점`}
    </p>
  );
};

CommitQualityScore.propTypes = {
  qualityScore: PropTypes.number.isRequired,
};

export default CommitQualityScore;

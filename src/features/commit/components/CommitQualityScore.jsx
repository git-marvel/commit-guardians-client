import PropTypes from "prop-types";

const CommitQualityScore = ({ qualityScore }) => {
  return (
    <p
      className={`w-20 rounded py-1 text-base font-bold ${qualityScore === 100 && qualityScore !== 0 ? "text-sky-400" : "text-black-900"} ${qualityScore === 0 && "text-slate-300 dark:text-slate-600"} `}
    >
      {qualityScore}
    </p>
  );
};

CommitQualityScore.propTypes = {
  qualityScore: PropTypes.number.isRequired,
};

export default CommitQualityScore;

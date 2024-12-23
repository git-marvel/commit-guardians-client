import PropTypes from "prop-types";

const MAX_WIDTH = 20;

function BarGraph({ totalChanges, qualityScore }) {
  const width = Math.min(totalChanges, MAX_WIDTH) * 10;
  let scoreWidth =
    Math.min((totalChanges * qualityScore) / 100, MAX_WIDTH) * 10;

  if (totalChanges > (MAX_WIDTH * 10) / qualityScore) {
    scoreWidth = width * (qualityScore / 100);
  }

  return (
    <>
      <div className="relative">
        {scoreWidth !== 0 && (
          <div
            className={`absolute z-40 h-6 rounded-[3px] border border-blue-400 bg-sky-300 dark:border-blue-200 ${qualityScore !== 100 && "rounded-r-none"}`}
            style={{ width: `${scoreWidth}px` }}
          ></div>
        )}
        <div
          className="absolute h-6 rounded-[3px] border border-slate-300 bg-slate-200 dark:bg-gray-500"
          style={{ width: `${width}px` }}
        ></div>
      </div>
    </>
  );
}

BarGraph.propTypes = {
  totalChanges: PropTypes.number.isRequired,
  qualityScore: PropTypes.number.isRequired,
};

export default BarGraph;

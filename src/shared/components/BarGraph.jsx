import PropTypes from "prop-types";

const BarGraph = ({ totalChanges, qualityScore }) => {
  const width = Math.min(totalChanges, 96) * 10;
  const scoreWidth = Math.min((totalChanges * qualityScore) / 100, 96) * 10;

  return (
    <>
      <div className="relative">
        {scoreWidth !== 0 && (
          <div
            className={`absolute z-40 h-6 rounded-[3px] border border-green-400 bg-green-300 ${qualityScore !== 100 && "rounded-r-none"}`}
            style={{ width: `${scoreWidth}px` }}
          ></div>
        )}
        <div
          className="absolute h-6 rounded-[3px] border border-slate-300 bg-slate-200"
          style={{ width: `${width}px` }}
        ></div>
      </div>
    </>
  );
};

BarGraph.propTypes = {
  totalChanges: PropTypes.number.isRequired,
  qualityScore: PropTypes.number.isRequired,
};

export default BarGraph;

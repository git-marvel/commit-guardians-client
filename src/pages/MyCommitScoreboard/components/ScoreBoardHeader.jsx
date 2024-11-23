import PropTypes from "prop-types";
import InfoValue from "../../../features/commit/components/InfoValue";

function ScoreBoardHeader({ gridCols }) {
  return (
    <div
      className={`${gridCols} grid w-dvw gap-4 divide-x-2 bg-slate-900 px-10 text-sm text-slate-300 dark:bg-gray-400 dark:text-slate-900`}
    >
      <p className="col-span-1 px-2 py-1">TYPE</p>
      <p className="col-span-6 px-2 py-1">COMMIT MESSAGE</p>
      <p className="relative col-span-3 px-2 py-1">
        CHANGES
        <InfoValue type="scoreBoardChanges" />
      </p>
      <p className="col-span-1 px-2 py-1">SCORE</p>
      <p className="col-span-2 px-2 py-1">AUTHOR</p>
      <p className="relative col-span-2 px-2 py-1">
        DATE
        <InfoValue type="scoreBoardDate" />
      </p>
      <p className="col-span-1 px-2 py-1">SHA</p>
    </div>
  );
}

ScoreBoardHeader.propTypes = {
  gridCols: PropTypes.string.isRequired,
};

export default ScoreBoardHeader;

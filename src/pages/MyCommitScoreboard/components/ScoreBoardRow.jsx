import PropTypes from "prop-types";
import AvatarValue from "../../../features/commit/components/AvatarValue";
import ChangesValue from "../../../features/commit/components/ChangesValue";
import CommitMessageValue from "../../../features/commit/components/CommitMessageValue";
import CommitQualityScore from "../../../features/commit/components/CommitQualityScore";
import CommitTypeValue from "../../../features/commit/components/CommitTypeValue";
import SHAValue from "../../../features/commit/components/SHAValue";

function ScoreBoardRow({ gridCols, commit }) {
  const time = new Date(commit.author.date).toTimeString().slice(0, 8);

  return (
    <div
      className={`${gridCols} grid w-full items-center gap-4 px-10 py-2 text-base text-slate-800 transition duration-300 ease-in-out hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700`}
    >
      <div className="col-span-1 px-2 py-1">
        <CommitTypeValue type={commit.type} />
      </div>
      <div className="col-span-6 px-2 py-1">
        <CommitMessageValue commit={commit} />
      </div>
      <div className="col-span-3 flex flex-row items-center px-2 py-1">
        <ChangesValue commit={commit} />
      </div>
      <div className="col-span-1 px-2 py-1">
        <CommitQualityScore qualityScore={commit.qualityScore} />
      </div>
      <div className="col-span-2 flex flex-row items-center px-2 py-1">
        <AvatarValue author={commit.author} />
      </div>
      <div className="col-span-2 px-2 py-1 text-sm">
        <p>{new Date(commit.author.date).toDateString()}</p>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <div className="col-span-1 px-2 py-1">
        <SHAValue sha={commit.sha} />
      </div>
    </div>
  );
}

ScoreBoardRow.propTypes = {
  commit: PropTypes.object.isRequired,
  gridCols: PropTypes.string.isRequired,
};

export default ScoreBoardRow;

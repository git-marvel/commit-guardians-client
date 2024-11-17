import PropTypes from "prop-types";
import InfoValue from "../../../features/commit/components/InfoValue";

const time = new Date().toTimeString().substring(8);

const ScoreBoardHeader = ({ gridCols }) => {
  return (
    <div
      className={`${gridCols} grid w-full gap-4 divide-x-2 bg-slate-900 px-10 text-sm text-slate-300`}
    >
      <p className="col-span-1 px-2 py-1">TYPE</p>
      <p className="col-span-6 px-2 py-1">COMMIT MESSAGE</p>
      <p className="relative col-span-3 px-2 py-1">
        CHANGES
        <InfoValue text="코드 수정에서 제거와 추가가 짝을 이루는 변경 단위" />
      </p>
      <p className="col-span-1 px-2 py-1">SCORE</p>
      <p className="col-span-2 px-2 py-1">AUTHOR</p>
      <p className="relative col-span-2 px-2 py-1">
        DATE
        <InfoValue text={time} />
      </p>
      <p className="col-span-1 px-2 py-1">SHA</p>
    </div>
  );
};

ScoreBoardHeader.propTypes = {
  gridCols: PropTypes.string.isRequired,
};

export default ScoreBoardHeader;

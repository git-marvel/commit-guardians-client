import PropTypes from "prop-types";
import useCheckCommitFormatStyle from "../hooks/useCheckCommitFormatStyle";

function CommitFormatStyleValue() {
  const sortedFormatStyleAndRate = useCheckCommitFormatStyle();

  return (
    <div className="flex flex-row">
      {sortedFormatStyleAndRate.map(([formatStyle, percent]) => (
        <OneCommitFormatStyle
          key={formatStyle}
          formatStyle={formatStyle}
          percent={percent}
        />
      ))}
    </div>
  );
}

function OneCommitFormatStyle({ formatStyle, percent }) {
  return (
    <p className="flex w-fit cursor-default flex-row items-center rounded-full px-3 py-0.5 text-sm font-medium text-blue-500 transition duration-300 ease-in-out hover:fill-slate-800 hover:text-blue-900">
      <span className="rounded-full border border-blue-200 px-1.5 py-0.5 text-xs text-blue-500">
        {percent}
      </span>
      <span className="ml-1">{formatStyle}</span>
    </p>
  );
}

OneCommitFormatStyle.propTypes = {
  formatStyle: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
};

export default CommitFormatStyleValue;

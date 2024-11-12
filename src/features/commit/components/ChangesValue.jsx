import PropTypes from "prop-types";
import FileIcon from "../../../shared/assets/svg/file-icon.svg";

const ChangesValue = ({ commit }) => {
  return (
    <>
      {commit.numOfFiles !== null && commit.numOfFiles !== 0 && (
        <>
          <img
            src={FileIcon}
            alt="File Icon"
            width="20"
            height="18"
            color="slate-400"
            className="my-0.5"
          />
          <p className="pl-1 font-bold text-slate-400">{commit.numOfFiles}</p>
        </>
      )}
    </>
  );
};

ChangesValue.propTypes = {
  commit: PropTypes.object.isRequired,
};

export default ChangesValue;

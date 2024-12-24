import PropTypes from "prop-types";
import COMMIT_TYPE from "../../../entities/commit/enum/commitTypeEnum";

function CommitTypeValue({ type }) {
  return (
    <p
      className={`w-fit cursor-default px-2.5 py-0.5 text-sm ${COMMIT_TYPE[type].color} rounded-full`}
    >
      {type}
    </p>
  );
}

CommitTypeValue.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CommitTypeValue;

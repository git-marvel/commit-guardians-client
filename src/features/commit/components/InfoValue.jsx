import PropTypes from "prop-types";
import InfoIcon from "../../../shared/components/InfoIcon";

const InfoValue = ({ text }) => {
  return (
    <span className="group">
      <InfoIcon />
      <span className="absolute bottom-9 rounded-full border border-blue-400 bg-slate-800 px-3 py-1 text-xs text-white opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
};

InfoValue.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InfoValue;

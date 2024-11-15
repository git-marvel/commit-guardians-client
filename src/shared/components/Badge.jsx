import PropTypes from "prop-types";

const Badge = ({ url }) => {
  return <img src={url} alt="Commit Guardians Badge" width="300" />;
};

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;

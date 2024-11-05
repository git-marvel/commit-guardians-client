import PropTypes from "prop-types";

const Snackbar = ({ message }) => {
  return (
    <div className="animate-wiggleFadeOut fixed left-auto top-5 z-50 rounded-lg bg-lime-300 px-6 py-2 text-sm text-black">
      {message}
    </div>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Snackbar;

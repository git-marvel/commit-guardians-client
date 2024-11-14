import PropTypes from "prop-types";

const Button = ({ onClick = () => {}, children }) => {
  return (
    <button
      className="mb-2 flex w-fit flex-row items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition duration-300 ease-in-out hover:bg-slate-800 hover:text-sky-400 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Button;

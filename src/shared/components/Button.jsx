import PropTypes from "prop-types";

function Button({ onClick = () => {}, children }) {
  return (
    <button
      className="flex w-fit flex-row items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition duration-300 ease-in-out hover:bg-slate-800 hover:text-sky-400 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-black dark:hover:bg-sky-400 dark:hover:text-black dark:focus:ring-sky-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Button;

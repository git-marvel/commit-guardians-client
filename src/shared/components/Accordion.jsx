import PropTypes from "prop-types";

const Accordion = ({ category, title, children }) => {
  return (
    <section>
      <h3 className="text-sm/7 font-semibold text-slate-400">{category}</h3>
      <details className="group py-4" name="questions" open>
        <summary className="flex cursor-pointer select-none justify-between font-semibold text-slate-900 group-open:text-blue-500 dark:text-slate-300">
          {title}
          <svg
            className="ml-4 mt-0.5 size-6 flex-none stroke-slate-700 group-open:stroke-blue-500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
          >
            <path d="M18 12H6"></path>
            <path className="group-open:hidden" d="M12 6v12"></path>
          </svg>
        </summary>
        {children}
      </details>
    </section>
  );
};

Accordion.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Accordion;

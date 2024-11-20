const PlusMinusIcon = () => {
  return (
    <svg
      className="ml-4 mt-0.5 size-6 flex-none stroke-slate-700 group-open:stroke-blue-500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
    >
      <path d="M18 12H6"></path>
      <path className="group-open:hidden" d="M12 6v12"></path>
    </svg>
  );
};

export default PlusMinusIcon;

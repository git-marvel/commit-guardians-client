import PropTypes from "prop-types";

const Loading = ({ message = "Please wait for seconds" }) => {
  return (
    <>
      <div className="my-5 w-1/3">
        <div className="h-2 w-full bg-neutral-300">
          <div className="h-2 animate-loadingProgressBar bg-sky-400"></div>
        </div>
      </div>
      <p className="font-Pixelify text-2xl dark:text-slate-50">Loading...</p>
      <p className="mt-2 text-sm dark:text-slate-200">{message}</p>
    </>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;

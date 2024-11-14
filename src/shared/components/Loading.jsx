import PropTypes from "prop-types";

const Loading = ({ message = "결과를 불러오고 있어요" }) => {
  return (
    <>
      <div className="my-5 w-1/3">
        <div className="h-2 w-full bg-neutral-300">
          <div className="h-2 animate-loadingProgressBar bg-sky-400"></div>
        </div>
      </div>
      <p className="font-Pixelify text-2xl">Loading...</p>
      <p className="mt-2 text-sm">{message}</p>
    </>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;

import PropTypes from "prop-types";

const Loading = ({ message = "결과를 불러오고 있어요" }) => {
  return (
    <>
      <div className="my-5 w-1/2">
        <div className="h-1 w-full bg-neutral-300">
          <div className="h-1 animate-loadingProgressBar bg-black"></div>
        </div>
      </div>
      <p className="font-Pixelify text-2xl">Loading...</p>
      <p className="mt-3 text-sm">{message}</p>
    </>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;

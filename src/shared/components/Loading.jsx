import PropTypes from "prop-types";

const Loading = ({ message="결과를 불러오고 있어요" }) => {

  return (
    <>
      <div className="w-1/2 my-5">
        <div className="h-1 w-full bg-neutral-300">
          <div className="animate-loadingProgressBar h-1 bg-black"></div>
        </div>
      </div>
      <p className="font-Pixelify text-2xl">Loading...</p>
      <p className="text-sm mt-3">{message}</p>
    </>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;

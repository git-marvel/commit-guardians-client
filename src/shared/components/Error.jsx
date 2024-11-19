import PropTypes from "prop-types";

const Error = ({ code, heading, paragraph, button }) => {
  return (
    <main className="flex flex-col items-center dark:text-white">
      <h1 className="font-Pixelify text-7xl">{code}</h1>
      <h1 className="font-Pixelify text-2xl">{heading}</h1>
      {paragraph && <p className="m-4">{paragraph}</p>}
      {button}
    </main>
  );
};

Error.propTypes = {
  code: PropTypes.string,
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  button: PropTypes.any,
};

export default Error;

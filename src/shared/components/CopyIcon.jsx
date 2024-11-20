import PropTypes from "prop-types";

const CopyIcon = ({ onClick = () => {} }) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M11.8 5.92V2.4C11.8 1.79 11.28 1.27 10.67 1.27H2.43C1.82 1.27 1.3 1.79 1.3 2.4V10.68C1.3 11.29 1.82 11.8 2.43 11.8H5.61"
        stroke="gray"
        strokeWidth="1.29"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6 16.51C16.28 16.51 16.83 15.96 16.83 15.28V6.01C16.83 5.4 16.31 4.88 15.6 4.88H7.36C6.75 4.88 6.23 5.4 6.23 6.01V15.28C6.23 15.89 6.75 16.51 7.36 16.51H15.6Z"
        stroke="gray"
        strokeWidth="1.29"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

CopyIcon.propTypes = {
  onClick: PropTypes.func,
};

export default CopyIcon;

import PropTypes from "prop-types";

const Badge = ({ url }) => {
  const githubUrl = "https://github.com/git-marvel/commit-guardians-client";

  return (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
      <img src={url} alt="Commit Guardians Badge" />
    </a>
  );
};

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;

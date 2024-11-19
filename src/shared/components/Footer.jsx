import PropTypes from "prop-types";
import GithubIcon from "../components/GithubIcon";

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex flex-col items-center">
      <a
        href="https://github.com/git-marvel"
        target="_blank"
        className="text-sm text-slate-600"
      >
        <h2 className="m-1 text-center text-sm">
          We are commit guardians!
          <p className="text-yellow-500">Team @git-marvel</p>
        </h2>
      </a>
      <div className="text-s mb-8 mt-2 flex">
        <GithubNameButton
          name="홍유진 Hong Youjin"
          githubUrl="https://github.com/howyoujini"
        />
        <GithubNameButton
          name="신철환 Shin Cheolhwan"
          githubUrl="https://github.com/GreenteaHT"
        />
        <GithubNameButton
          name="김수한 Kim Soohan"
          githubUrl="https://github.com/shkimjune"
        />
      </div>
    </div>
  );
};

const GithubNameButton = ({ name, githubUrl }) => {
  return (
    <a
      href={githubUrl}
      target="_blank"
      className="mb-2 me-2 flex items-center rounded-full border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-slate-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      <h2 className="m-1 text-sm">{name}</h2>
      <GithubIcon />
    </a>
  );
};

GithubNameButton.propTypes = {
  name: PropTypes.string.isRequired,
  githubUrl: PropTypes.string.isRequired,
};

export default Footer;

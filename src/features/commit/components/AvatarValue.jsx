import PropTypes from "prop-types";

const DEFAULT_IMG_URL =
  "https://github.githubassets.com/assets/mona-loading-default-c3c7aad1282f.gif";

const AvatarValue = ({ author }) => {
  return (
    <>
      <img
        src={author.avatar_url ?? DEFAULT_IMG_URL}
        alt="avatar_url"
        className="w-5 rounded-full"
      />
      <p className="ml-2 text-sm text-slate-700">{author.name ?? "unknown"}</p>
    </>
  );
};

AvatarValue.propTypes = {
  author: PropTypes.object.isRequired,
};

export default AvatarValue;

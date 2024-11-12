import PropTypes from "prop-types";

const AvatarValue = ({ author }) => {
  return (
    <>
      <img
        src={author.avatar_url}
        alt="avatar_url"
        className="w-5 rounded-full"
      />
      <p className="ml-2 text-sm text-slate-700">{author.name}</p>
    </>
  );
};

AvatarValue.propTypes = {
  author: PropTypes.object.isRequired,
};

export default AvatarValue;

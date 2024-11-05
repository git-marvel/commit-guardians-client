import useCommitStore from "../../feature/commit/store/useCommitStore";
import messages from "../../shared/constants/messages";
import getCommitList from "./api/getCommitList";

const Home = () => {
  const setCommitList = useCommitStore((state) => state.setCommitList);

  const handleRepoInfoSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const parsedURL = formJson.repositoryURL.split("/");
    const githubIndex = parsedURL.indexOf("github.com");
    const [organizationName, repositoryName] = parsedURL.slice(
      githubIndex + 1,
      githubIndex + 3
    );

    if (!organizationName || !repositoryName) {
      throw new Error(messages.errors.invalidURL);
    }

    try {
      getCommitList({ organizationName, repositoryName, setCommitList });
    } catch (error) {
      throw new Error(error.messages);
    }
  };

  return (
    <form method="post" onSubmit={handleRepoInfoSubmit}>
      <label>
        Repository URL:{" "}
        <input
          name="repositoryURL"
          placeholder="ex) https://github.com/git-marvel/commit-guardians-client"
          required
        />
      </label>
      <button type="submit">git api 요청</button>
    </form>
  );
};

export default Home;

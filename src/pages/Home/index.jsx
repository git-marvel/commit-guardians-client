import CheckCommitQualityButton from "../../features/checkCommitQuality/components/CheckCommitQualityButton";
import useCommitStore from "../../features/commit/store/useCommitStore";
import extractGitInfoFromURL from "../../shared/utils/extractGitInfoFromURL";
import { getCommitList } from "./api/getCommitList";

const Home = () => {
  const setCommitList = useCommitStore((state) => state.setCommitList);

  const handleRepoInfoSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const repositoryURL = Object.fromEntries(formData.entries()).repositoryURL;
    const { organizationName, repositoryName } =
      extractGitInfoFromURL(repositoryURL);

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
      <CheckCommitQualityButton />
    </form>
  );
};

export default Home;

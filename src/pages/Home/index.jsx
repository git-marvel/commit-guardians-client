import useCommitStore from "../../features/commit/store/useCommitStore";
import extractGitInfoFromURL from "../../shared/utils/extractGitInfoFromURL";
import { getCheckCommitList } from "../../entities/commitType/services";
import { getCommitDiffList, getCommitList } from "./api";

const Home = () => {
  const setCommitList = useCommitStore((state) => state.setCommitList);

  const handleRepoInfoSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const repositoryURL = Object.fromEntries(formData.entries()).repositoryURL;
    const { owner, repo } = extractGitInfoFromURL(repositoryURL);

    try {
      const commitList = await getCommitList({ owner, repo });
      const checkCommitList = getCheckCommitList(commitList);
      const changeList = await getCommitDiffList({
        owner,
        repo,
        checkCommitList,
      });

      const jsonMap = changeList.map((change) => Array.from(change.values()));

      setCommitList(jsonMap);
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
      <button type="submit">api 요청</button>
    </form>
  );
};

export default Home;

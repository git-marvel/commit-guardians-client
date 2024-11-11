import axios from "axios";

const getGithubStatus = async () => {
  try {
    const githubStatus = await axios.get(
      "https://www.githubstatus.com/api/v2/status.json"
    );
    return githubStatus.data.status.indicator;
  } catch {
    return "unknown";
  }
};

export { getGithubStatus };

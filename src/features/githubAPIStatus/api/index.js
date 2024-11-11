import axios from "axios";

const GITHUB_STATUS_API_ADRESS =
  "https://www.githubstatus.com/api/v2/status.json";

const getGithubStatus = async () => {
  try {
    const githubStatus = await axios.get(GITHUB_STATUS_API_ADRESS);
    return githubStatus.data.status.indicator;
  } catch {
    return "unknown";
  }
};

export { getGithubStatus };

import { useEffect, useState } from "react";
import { getGithubStatus } from "../api";
import useGithubStatusStore from "../store/useGithubStatusStore";

const useGithubAPIStatus = () => {
  const [githubAPIStatusColor, setGithubAPIStatusColor] = useState("unknown");
  const setGithubStatus = useGithubStatusStore(
    (state) => state.setGithubStatus
  );

  useEffect(() => {
    const storeGithubStatus = async () => {
      const githubAPIStatus = await getGithubStatus();

      setGithubStatus(githubAPIStatus);

      const transferStatusColor = (githubAPIStatus) => {
        switch (githubAPIStatus) {
          case "none":
            return "bg-green-400 border-green-500";
          case "minor":
            return "bg-yellow-400 border-yellow-500";
          case "major":
            return "bg-red-400 border-red-500";
          case "unknown":
            return "bg-slate-200 border-black-700";
          default:
            return "bg-red-500 border-red-700";
        }
      };

      const statusColor = transferStatusColor(githubAPIStatus);
      setGithubAPIStatusColor(statusColor);
    };

    storeGithubStatus();
  }, [setGithubStatus]);

  return { githubAPIStatusColor };
};

export default useGithubAPIStatus;

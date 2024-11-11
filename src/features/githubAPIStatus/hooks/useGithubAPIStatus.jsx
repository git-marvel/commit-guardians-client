import { useEffect, useState } from "react";
import { getGithubStatus } from "../api";

const useGithubAPIStatus = () => {
  const [githubAPIStatusColor, setGithubAPIStatusColor] = useState("unknown");

  useEffect(() => {
    const storeGithubStatus = async () => {
      const githubAPIStatus = await getGithubStatus();

      const transferStatusColor = (githubAPIStatus) => {
        switch (githubAPIStatus) {
          case "none":
            return "bg-green-500";
          case "minor":
            return "bg-yellow-500";
          case "major":
            return "bg-red-500";
          case "unknown":
            return "bg-red-500";
          default:
            return "bg-red-500";
        }
      };

      const statusColor = transferStatusColor(githubAPIStatus);
      setGithubAPIStatusColor(statusColor);
    };

    storeGithubStatus();
  }, []);

  return { githubAPIStatusColor };
};

export default useGithubAPIStatus;

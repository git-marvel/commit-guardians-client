import { useEffect, useState } from "react";
import { getGithubStatus } from "../api";

const useGithubAPIStatus = () => {
  const [githubAPIStatus, setGithubAPIStatus] = useState("unknown");

  useEffect(() => {
    const storeGithubStatus = async () => {
      const githubAPIStatus = await getGithubStatus();

      const tailwindColor = (githubAPIStatus) => {
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

      const statusCircleStyle = `w-5 h-5 rounded-full ${tailwindColor(githubAPIStatus)}`;
      setGithubAPIStatus(statusCircleStyle);
    };

    storeGithubStatus();
  }, []);

  return { githubAPIStatus };
};

export default useGithubAPIStatus;

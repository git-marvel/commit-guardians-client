import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePersistentStore from "../../shared/store/usePersistentStore";

function GithubCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { githubToken, setGithubToken } = usePersistentStore();

  useEffect(() => {
    if (githubToken) {
      navigate("/");
      return;
    }

    const code = new URLSearchParams(location.search).get("code");
    if (!code) {
      navigate("/");
      return;
    }

    (async () => {
      const res = await fetch(
        `/.netlify/functions/github-callback?code=${code}`
      );
      const data = await res.json();

      setGithubToken(data.accessToken);
      navigate("/");
    })();
  }, [location, navigate, githubToken, setGithubToken]);

  return <></>;
}

export default GithubCallback;

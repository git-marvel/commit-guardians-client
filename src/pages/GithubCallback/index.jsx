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
      console.log("No Code received");
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/github-callback?code=${code}`
        );
        const data = await res.json();

        if (data.accessToken) {
          setGithubToken(data.accessToken);
          navigate("/");
        } else {
          console.error("No token received:", data);
          navigate("/");
        }
      } catch (err) {
        console.error("Token fetch error:", err);
        navigate("/");
      }
    })();
  }, [location, navigate, githubToken, setGithubToken]);

  return (
    <div>
      <h2>GitHub OAuth 콜백 처리 중...</h2>
    </div>
  );
}

export default GithubCallback;

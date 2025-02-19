import { useCallback, useEffect, useState } from "react";
import useCommitStore from "../../commit/store/useCommitStore";
import { getBadgeUrl } from "../services";

const COPIED_DURATION_MS = 2000;

const useCopiedBadge = () => {
  const [badgeTagUrl, setBadgeTagUrl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);
  const totalScore = useCommitStore((state) => state.commitSummary.totalScore);

  useEffect(() => {
    const fetchBadgeUrl = async () => {
      try {
        const svgUrl = await getBadgeUrl({ totalScore });

        setBadgeTagUrl(svgUrl);
      } catch (err) {
        setError(`Fail to fetch the Badge..🥲, ${err}`);
      }
    };

    fetchBadgeUrl();
  }, [totalScore]);

  const copyBadgeTag = useCallback(async () => {
    try {
      const badgeTag = `<a href="https://github.com/git-marvel/commit-guardians-client">
  <img src="${badgeTagUrl}" />
</a>`;

      await navigator.clipboard.writeText(badgeTag);

      setIsCopied(true);
      setError(null);

      setTimeout(() => {
        setIsCopied(false);
      }, COPIED_DURATION_MS);

      return badgeTag;
    } catch (error) {
      setError(`Fail to copy the Badge..🥲, ${error}`);
    }
  }, [badgeTagUrl]);

  return { isCopied, error, copyBadgeTag, badgeTagUrl };
};

export default useCopiedBadge;

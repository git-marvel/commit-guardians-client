import { useState } from "react";

const COPIED_DURATION_MS = 2000;

const useCopiedSha = () => {
  const [copiedSha, setCopiedSha] = useState(null);

  const handleCopyCommitSha = async (event, sha) => {
    event.preventDefault();

    await navigator.clipboard.writeText(sha);

    setCopiedSha(sha);

    setTimeout(() => {
      setCopiedSha(null);
    }, COPIED_DURATION_MS);
  };

  return { copiedSha, handleCopyCommitSha };
};

export default useCopiedSha;

import { createCommitEntity } from "../commitEntity";
import COMMIT_FORMAT_STYLE from "../enum/commitFormatStyleEnum";
import COMMIT_TYPE from "../enum/commitTypeEnum";

const EMOJI_REGEX =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

const removeEmoji = (string) => string.replace(EMOJI_REGEX, "");
const removeSpecialCharacters = (string) => string.replace(/[^a-zA-Z]/g, "");

/**
 * @param {string} firstWordOfCommitMessage
 * @returns {undefined || COMMIT_TYPE} checkableCommitType
 */
const makeCommitTypeWithFormatStyle = (firstWordOfCommitMessage) => {
  const formatStyle = COMMIT_FORMAT_STYLE.list.find((style) =>
    firstWordOfCommitMessage.includes(style.splitWith)
  );

  const commitTypeString = formatStyle
    ? removeSpecialCharacters(
        firstWordOfCommitMessage.split(formatStyle.splitWith)[0]
      )
        .trim()
        .toLowerCase()
    : "";

  const checkableCommitType = COMMIT_TYPE.list.find((validType) =>
    validType.sameMeaningWords.has(commitTypeString)
  )?.type;

  return checkableCommitType;
};

/**
 * @param {Array} totalCommits - 모든 커밋 목록
 * @returns {Array} checkableCommits - 검사 가능한 커밋 목록
 */
const getCheckableCommits = (totalCommits) => {
  const checkableCommits = totalCommits.reduce((accumulators, commit) => {
    const commitMessage = removeEmoji(commit.commit.message).trim();
    const firstWord = commitMessage.split(" ")[0];
    const commitType = makeCommitTypeWithFormatStyle(firstWord);

    if (commitType !== undefined) {
      const commitWithType = createCommitEntity({
        type: commitType,
        sha: commit.sha,
        url: commit.html_url,
        author: {
          ...commit.commit.author,
          avatar_url: commit.author?.avatar_url,
        },
        message: commit.commit.message,
      });

      accumulators.push(commitWithType);
    }

    return accumulators;
  }, []);

  return checkableCommits;
};

export { getCheckableCommits };

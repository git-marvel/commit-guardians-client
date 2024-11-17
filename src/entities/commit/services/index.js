import { createCommitEntity } from "../commitEntity";
import COMMIT_FORMAT_STYLE from "../enum/commitFormatStyleEnum";
import COMMIT_TYPE from "../enum/commitTypeEnum";

const EMOJI_REGEX =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

const removeEmoji = (string) => string.replace(EMOJI_REGEX, "");
const removeParentheses = (string) => string.replace(/\(.*?\)/g, "");
const removeSpecialCharacters = (string) => string.replace(/[^a-zA-Z]/g, "");

const getFormatStyle = (firstWord) => {
  return COMMIT_FORMAT_STYLE.list.find((style) =>
    firstWord.includes(style.splitWith)
  )?.type;
};

const getCheckableCommitType = (firstWord, formatStyle) => {
  if (!formatStyle) {
    return;
  }

  const firstPart = firstWord.split(formatStyle.splitWith)[0];
  const withoutParentheses = removeParentheses(firstPart);
  const cleanedFirstPart = removeSpecialCharacters(withoutParentheses);
  const commitTypeString = cleanedFirstPart.trim().toLowerCase();

  return COMMIT_TYPE.list.find((validType) =>
    validType.sameMeaningWords.has(commitTypeString)
  )?.type;
};

const getFormatStyleAndRate = (commitList) => {
  const formatStyleCountInfo = COMMIT_FORMAT_STYLE.list.reduce((acc, style) => {
    acc[style.type] = 0;
    return acc;
  }, {});

  commitList.forEach((commit) => {
    if (Object.hasOwn(formatStyleCountInfo, commit.formatStyle)) {
      formatStyleCountInfo[commit.formatStyle]++;
    }
  });

  return formatStyleCountInfo;
};

/**
 * @param {Array} totalCommits - 모든 커밋 목록
 * @returns {Array} checkableCommits - 검사 가능한 커밋 목록
 */
const getCheckableCommits = (totalCommits) => {
  const checkableCommits = totalCommits.reduce((accumulators, commit) => {
    const commitMessage = removeEmoji(commit.commit.message).trim();
    const firstWord = commitMessage.split(" ")[0];
    const formatStyle = getFormatStyle(firstWord);
    const commitType = getCheckableCommitType(firstWord, formatStyle);

    if (commitType !== undefined) {
      const commitWithType = createCommitEntity({
        formatStyle: formatStyle,
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

export { getCheckableCommits, getFormatStyleAndRate };

import { createCommitEntity } from "../commitEntity";
import COMMIT_FORMAT_STYLE from "../enum/commitFormatStyleEnum";
import COMMIT_TYPE from "../enum/commitTypeEnum";

const removeParentheses = (string) => string.replace(/\(.*\)$/, "");

/**
 * @param {string} firstWordOfCommitMessage
 * @returns {undefined || COMMIT_TYPE} checkableCommitType
 */
const makeCommitTypeWithFormatStyle = (firstWordOfCommitMessage) => {
  const formatStyle = COMMIT_FORMAT_STYLE.list.find((style) =>
    firstWordOfCommitMessage.includes(style.splitWith)
  );

  const commitTypeString = formatStyle
    ? removeParentheses(
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
  const checkableCommits = totalCommits.reduce((accumulatorList, commit) => {
    const firstWord = commit.commit.message.split(" ")[0];
    const commitType = makeCommitTypeWithFormatStyle(firstWord);

    if (commitType !== undefined) {
      const commitWithType = createCommitEntity({
        type: commitType,
        sha: commit.sha,
        url: commit.commit.url,
        author: commit.commit.author,
        message: commit.commit.message,
      });

      accumulatorList.push(commitWithType);
    }

    return accumulatorList;
  }, []);

  return checkableCommits;
};

export { getCheckableCommits };

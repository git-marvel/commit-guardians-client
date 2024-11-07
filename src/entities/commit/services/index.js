import COMMIT_FORMAT_STYLE from "../enum/commitFormatStyleEnum";
import COMMIT_TYPE from "../enum/commitTypeEnum";
import { createCommitEntity } from "../commitEntity";

const removeParentheses = (string) => string.replace(/\(.*\)$/, "");

/**
 * 커밋 메세지의 첫 단어를 받아서,
 * 검사할 수 있는 커밋 메세지의 타입을 반환합니다.
 *
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
 * 주어진 모든 커밋 목록에서 검사 가능한 커밋 목록을 필터링합니다.
 * 검사 가능한 커밋은 첫 단어를 통해 커밋 타입을 확인할 수 있는 커밋입니다.
 *
 * @param {Array} totalCommits - 모든 커밋 목록
 * @returns {Array} checkableCommitList - 검사 가능한 커밋 목록
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

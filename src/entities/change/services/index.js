import { createChangeEntity } from "../changeEntity";

const NO_NEW_LINE_MESSAGE = "\\ No newline at end of file";

const getChanges = (diffPerCommit) => {
  const codeListPerFile = diffPerCommit.split("diff --git").slice(1);
  const commitChangesMap = new Map();

  for (const commitCode of codeListPerFile) {
    const result = makeAChange(commitCode);
    commitChangesMap.set(result.fileName, result.changes);
  }

  return commitChangesMap;
};

const makeAChange = (commitCode) => {
  const codePerLineList = commitCode.split("\n");
  const fileName = codePerLineList[0].split(" ")[1];
  let changes = [];
  let changesCode = {};
  let hasDelta = false;

  codePerLineList.forEach((code) => {
    if (
      (code.indexOf("-") === 0 && code.includes("---") === false) ||
      (code.indexOf("+") === 0 && code.includes("+++") === false)
    ) {
      hasDelta = true;
      changesCode = createChangeEntity({
        key: code[0],
        previousContent: changesCode,
        content: code,
      });
    } else {
      if (hasDelta && code !== NO_NEW_LINE_MESSAGE) {
        hasDelta = false;
        changes.push(changesCode);
        changesCode = {};
      }
    }
  });

  return { fileName: fileName, changes: changes };
};

export { getChanges, makeAChange };

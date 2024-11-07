import { createChangeEntity } from "../changeEntity";

const NO_NEW_LINE_MESSAGE = "\\ No newline at end of file";

const getChanges = (diffPerCommit) => {
  const codeListPerFile = diffPerCommit.split("diff --git").slice(1);
  const commitChanges = {};

  codeListPerFile.forEach((commitCode) => {
    const result = makeAChange(commitCode);
    commitChanges[result.fileName] = result.changes;
  });

  return commitChanges;
};

const makeAChange = (commitCode) => {
  const codePerLineList = commitCode.split("\n");
  const fileName = codePerLineList[0].split(" ")[1];
  const changes = [];
  let changesCode = {};
  let hasDelta = false;

  codePerLineList.forEach((code) => {
    const isDeltaLine =
      (code.startsWith("-") && !code.includes("---")) ||
      (code.startsWith("+") && !code.includes("+++"));

    if (isDeltaLine) {
      hasDelta = true;
      changesCode = createChangeEntity({
        key: code[0],
        previousContent: changesCode,
        content: code,
      });
    } else if (hasDelta && code !== NO_NEW_LINE_MESSAGE) {
      hasDelta = false;
      changes.push(changesCode);
      changesCode = {};
    }
  });

  return { fileName, changes };
};

export { getChanges };

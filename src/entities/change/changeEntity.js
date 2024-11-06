const createChangeEntity = ({ key, previousContent, content }) => {
  const toggleKey = key === "-" ? "+" : "-";
  const toggleContent =
    previousContent[toggleKey] === undefined ? "" : previousContent[toggleKey];
  const keyContent =
    previousContent[key] === undefined
      ? `${content}\n`
      : (previousContent[key] += `${content}\n`);

  return {
    [key]: keyContent,
    [toggleKey]: toggleContent,
  };
};

export { createChangeEntity };

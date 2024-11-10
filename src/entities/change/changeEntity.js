const createChangeEntity = ({ key, previousContent, content }) => {
  const toggleKey = key === "-" ? "+" : "-";
  const toggleContent = previousContent[toggleKey] || "";
  const keyContent = (previousContent[key] || "") + `${content}\n`;

  return {
    [key]: keyContent,
    [toggleKey]: toggleContent,
  };
};

export { createChangeEntity };

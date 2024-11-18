const INFO_MESSAGES = {
  scoreBoardChanges: [
    {
      title: "FILE ICON",
      contents: "변경된 파일의 개수입니다.",
    },
    {
      title: "CHANGES BAR",
      contents: "전체 change의 개수 중 통과된 change의 비율입니다.",
    },
  ],
  scoreBoardDate: [
    { title: "", contents: new Date().toTimeString().substring(8) },
  ],
};

export { INFO_MESSAGES };

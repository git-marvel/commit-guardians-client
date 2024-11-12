const formatDate = (dateString) => {
  const targetDate = new Date(dateString);
  const year = targetDate.getFullYear().toString().substring(2);
  const month = makeDigitWithZero(targetDate.getMonth() + 1);
  const date = makeDigitWithZero(targetDate.getDate());
  const day = formatDayOfWeek(dateString);

  return `${year}년 ${month}월 ${date}일 (${day})`;
};

const makeDigitWithZero = (digit) => (digit <= 9 ? "0" + digit : digit);

const formatDayOfWeek = (date) => {
  const DAY_OF_WEEK_LIST = Object.freeze([
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ]);
  const targetDateTime = new Date(date);

  return DAY_OF_WEEK_LIST[targetDateTime.getDay()];
};

export default formatDate;

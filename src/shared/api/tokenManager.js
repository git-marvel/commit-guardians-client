/**
 * 깃헙에서 인증된 사용자라면, 한시간 당 최대 요청수 5,000개
 * https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users
 */
const GITHUB_REQUEST_LIMIT = 5000;

const tokenStates = [
  {
    token: import.meta.env.VITE_GITHUB_TOKEN,
    remaining: GITHUB_REQUEST_LIMIT,
  },
  {
    token: import.meta.env.VITE_GITHUB_TOKEN_1,
    remaining: GITHUB_REQUEST_LIMIT,
  },
  {
    token: import.meta.env.VITE_GITHUB_TOKEN_2,
    remaining: GITHUB_REQUEST_LIMIT,
  },
  {
    token: import.meta.env.VITE_GITHUB_TOKEN_3,
    remaining: GITHUB_REQUEST_LIMIT,
  },
];

const getBestGithubToken = () => {
  tokenStates.sort((a, b) => b.remaining - a.remaining);

  return tokenStates[0].token;
};

const updateTokenState = (token, remaining) => {
  const tokenState = tokenStates.find((t) => t.token === token);

  if (tokenState) {
    tokenState.remaining = remaining;
  }
};

export { getBestGithubToken, updateTokenState };

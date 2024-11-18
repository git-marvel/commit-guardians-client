const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const ERROR_MESSAGES = {
  githubStatusError: "Github 상태가 원할하지 않습니다.",
  noCommitsToCheck: "아쉽게도, 현재 검사할 수 있는 커밋이 없습니다. 😥",
  invalidURL:
    "적합하지 않은 URL입니다. [https://github.com/소유자이름/레포지토리이름/...] 혹은 [github.com/소유자이름/레포지토리이름/] 처럼 URL를 넣어주세요!",
  invalidGithubURL:
    "소유자 혹은 레포지토리 이름을 찾을 수 없는 링크입니다. 혹시 레포지토리가 private으로 설정 되어있거나 잘못된 링크 인가요?",
  rateLimitExceeded:
    "저희 Github Token 을 모두 소모했습니다! 조금 뒤에 다시 시도 해주세요!",
  networkError: "새로 고침 후 올바른 URL로 다시 시도 해주세요!",
  serverError:
    "Commit 목록을 받아오는데 오류가 생겼습니다. 조금 뒤 다시 시도 해주세요!",
};

export { ERROR_MESSAGES, GITHUB_TOKEN };

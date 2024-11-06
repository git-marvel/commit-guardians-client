const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const ERROR_MESSAGES = {
  invalidURL:
    "적합하지 않은 URL입니다. [https://github.com/소유자이름/레포지토리이름/...] 혹은 [github.com/소유자이름/레포지토리이름/] 처럼 URL를 넣어주세요!",
  invalidGithubURL:
    "Github에서 찾을 수 없는 링크입니다. 혹시 Repository가 private으로 설정 되어 있나요?",
  serverError:
    "Commit 목록을 받아오는데 오류가 생겼습니다. 조금 뒤 다시 시도해주세요.",
};

export { ERROR_MESSAGES, GITHUB_TOKEN };

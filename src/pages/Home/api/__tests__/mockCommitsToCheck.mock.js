const mockCommitsToCheck = [
  {
    type: "remove: 불필요한 import 삭제",
    sha: "sha",
    url: "url",
    message: "커밋 remove message",
    author: {
      name: "howyoujini",
      date: "",
      email: "howyoujini@gmail.com",
      avatar_url: "avatar_url",
    },
    diffObj: {
      "a/pull_request_template.md": [
        {
          "+": "+# 작업 내용\n",
          "-": "-# 칸반 링크\n",
        },
        {
          "+": "+간단한 작업 내용과 칸반 태스크 링크를 추가해 주세요.\n",
          "-": "-이 부분에 노션 칸반 링크 추가 해주세요\n",
        },
        {
          "+": "+## 목업 UI 화면\n",
          "-": "-# 목업 UI 화면 캡쳐\n",
        },
        {
          "+": "+이 부분에 목업 UI 화면을 추가해 주세요.\n",
          "-": "-이 부분에 목업 UI 화면을 추가해주세요\n",
        },
      ],
      "a/docs/source/index.md": [
        {
          "-": "-\n",
          "+": "",
        },
      ],
    },
    numOfFiles: null,
    numOfChanges: null,
    qualityScore: null,
  },
  {
    type: "[docs] 문서편집",
    sha: "sha",
    url: "url",
    message: "커밋 docs message",
    author: {
      name: "howyoujini",
      date: "",
      email: "howyoujini@gmail.com",
      avatar_url: "avatar_url",
    },
    diffObj: {
      "a/pull_request_template.md": [
        {
          "+": "+# 작업 내용\n",
          "-": "-# 칸반 링크\n",
        },
        {
          "+": "+간단한 작업 내용과 칸반 태스크 링크를 추가해 주세요.\n",
          "-": "-이 부분에 노션 칸반 링크 추가 해주세요\n",
        },
        {
          "+": "+## 목업 UI 화면\n",
          "-": "-# 목업 UI 화면 캡쳐\n",
        },
        {
          "+": "+이 부분에 목업 UI 화면을 추가해 주세요.\n",
          "-": "-이 부분에 목업 UI 화면을 추가해주세요\n",
        },
      ],
      "a/docs/source/index.md": [
        {
          "-": "-\n",
          "+": "",
        },
      ],
    },
    numOfFiles: null,
    numOfChanges: null,
    qualityScore: null,
  },
  {
    type: "style: 코드 포맷팅 수정",
    sha: "sha",
    url: "url",
    message: "커밋 style message",
    author: {
      name: "howyoujini",
      date: "",
      email: "howyoujini@gmail.com",
      avatar_url: "avatar_url",
    },
    diffObj: {
      "a/pull_request_template.md": [
        {
          "+": "+# 작업 내용\n",
          "-": "-# 칸반 링크\n",
        },
        {
          "+": "+간단한 작업 내용과 칸반 태스크 링크를 추가해 주세요.\n",
          "-": "-이 부분에 노션 칸반 링크 추가 해주세요\n",
        },
        {
          "+": "+## 목업 UI 화면\n",
          "-": "-# 목업 UI 화면 캡쳐\n",
        },
        {
          "+": "+이 부분에 목업 UI 화면을 추가해 주세요.\n",
          "-": "-이 부분에 목업 UI 화면을 추가해주세요\n",
        },
      ],
      "a/docs/source/index.md": [
        {
          "-": "-\n",
          "+": "",
        },
      ],
    },
    numOfFiles: null,
    numOfChanges: null,
    qualityScore: null,
  },
  {
    type: "test: 테스트 코드 작성",
    sha: "sha",
    url: "url",
    message: "커밋 test message",
    author: {
      name: "howyoujini",
      date: "",
      email: "howyoujini@gmail.com",
      avatar_url: "avatar_url",
    },
    diffObj: {
      "a/pull_request_template.md": [
        {
          "+": "+# 작업 내용\n",
          "-": "-# 칸반 링크\n",
        },
        {
          "+": "+간단한 작업 내용과 칸반 태스크 링크를 추가해 주세요.\n",
          "-": "-이 부분에 노션 칸반 링크 추가 해주세요\n",
        },
        {
          "+": "+## 목업 UI 화면\n",
          "-": "-# 목업 UI 화면 캡쳐\n",
        },
        {
          "+": "+이 부분에 목업 UI 화면을 추가해 주세요.\n",
          "-": "-이 부분에 목업 UI 화면을 추가해주세요\n",
        },
      ],
      "a/docs/source/index.md": [
        {
          "-": "-\n",
          "+": "",
        },
      ],
    },
    numOfFiles: null,
    numOfChanges: null,
    qualityScore: null,
  },
];

export default mockCommitsToCheck;

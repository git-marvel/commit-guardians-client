const diffObj = {
  allPassed: {
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
  allFailed: {
    "a/docs/source/use/using.rst": [
      {
        "+": '+\t\t\thref="../projects/kernels.html"]\n',
        "-": '-\t\t\thref="../projects/kernels.html]\n',
      },
    ],
  },
  partialPassed: {
    "a/README.md": [
      {
        "+": "+## Documentation structure\n+\n+This documentation uses the [Sphinx](https://sphinx-doc.org) documentation engine.\n+\n+Next, navigate to the `/docs` directory and create a `conda` environment:\n",
        "-": "-## Running the docs locally\n-First navigate to the `/docs` directory and create a `conda` environment:\n",
      },
      {
        "+": "+**Build the docs** using Sphinx with the following commands:\n",
        "-": "-Build the docs:\n",
      },
    ],
    "a/docs/source/conf.py": [
      {
        "+": "+panels_add_bootstrap_css = False\n",
        "-": "-panels_add_boostrap_css = False\n",
      },
    ],
    "a/docs/source/index.md": [
      {
        "-": "-\n",
        "+": "",
      },
    ],
    "a/noxfile.py": [
      {
        "+": '+import nox\n+\n+nox.options.reuse_existing_virtualenvs = True\n+\n+build_command = ["-b", "html", "docs/source", "docs/build/html"]\n+    session.run(*cmd)\n',
        "-": "",
      },
    ],
  },
};

export default diffObj;

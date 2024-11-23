const DEFAULT_IMG_URL =
  "https://github.githubassets.com/assets/mona-loading-default-c3c7aad1282f.gif";

function Title() {
  return (
    <div className="mb-20 flex cursor-default flex-col items-center justify-center text-9xl font-extrabold">
      <div className="relative flex flex-row items-center">
        <span className="font-Pixelify text-gray-700 transition duration-300 ease-in-out hover:text-sky-300 dark:text-gray-400">
          Commit
        </span>
        <a
          href="https://github.com/git-marvel/commit-guardians-client"
          target="_blank"
        >
          <div className="relative">
            <img src={DEFAULT_IMG_URL} alt="git cat" className="w-24" />
            <div className="absolute bottom-1/2 left-full ml-2 flex w-56 max-w-[320px] flex-col rounded-e-full rounded-tl-full border border-slate-200 bg-white px-6 py-3 transition duration-300 ease-in-out hover:border-sky-300 dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Check the
                <b className="px-1 text-slate-800 dark:text-white">
                  quality of the commits
                </b>
                in default branch.
              </p>
            </div>
          </div>
        </a>
      </div>
      <span className="font-Pixelify text-slate-900 transition duration-300 ease-in-out hover:text-slate-300 dark:text-white">
        Guardians
      </span>
    </div>
  );
}

export default Title;

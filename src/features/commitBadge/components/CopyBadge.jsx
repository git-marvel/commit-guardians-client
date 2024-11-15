import Badge from "../../../shared/components/Badge";
import Snackbar from "../../../shared/components/SnackBar";
import useCopiedBadge from "../hooks/useCopyBadge";

const CopyBadge = () => {
  const { isCopied, error, copyBadgeTag, badgeTagUrl } = useCopiedBadge();

  return (
    <>
      {error && <Snackbar message={error.message} />}
      {isCopied && <Snackbar message="Copied Successfully!" />}
      <div className="h-96">{badgeTagUrl && <Badge url={badgeTagUrl} />}</div>
      <button
        className="group relative mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={copyBadgeTag}
      >
        Copy your Badge
        <div className="absolute -bottom-2 left-2 w-64 translate-y-full rounded-full border border-blue-400 bg-sky-50 px-2 py-2 text-slate-800 opacity-0 shadow-sm transition duration-300 ease-in-out group-hover:opacity-100">
          Paste your repository <b>README.md</b>
          <div className="absolute -top-2 left-14 h-4 w-4 rotate-45 transform border-l border-t border-blue-400 bg-sky-50"></div>
        </div>
      </button>
    </>
  );
};

export default CopyBadge;

import Badge from "../../../shared/components/Badge";
import Snackbar from "../../../shared/components/SnackBar";
import useCopiedBadge from "../hooks/useCopyBadge";

const CopyBadge = () => {
  const { isCopied, error, copyBadgeTag, badgeTagUrl } = useCopiedBadge();

  return (
    <>
      {error && <Snackbar message={error.message} />}
      {isCopied && <Snackbar message="복사 성공!" />}
      <div className="h-40">{badgeTagUrl && <Badge url={badgeTagUrl} />}</div>
      <button
        className="mb-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition duration-300 ease-in-out hover:bg-stone-900 hover:text-lime-300 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-stone-100 dark:hover:text-stone-900 dark:focus:ring-gray-700"
        onClick={copyBadgeTag}
      >
        커밋 뱃지 복사하기
      </button>
    </>
  );
};

export default CopyBadge;

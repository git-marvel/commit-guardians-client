import Badge from "../../../shared/components/Badge";
import Snackbar from "../../../shared/components/SnackBar";
import useCopiedBadge from "../hooks/useCopyBadge";

const CopyBadge = () => {
  const { isCopied, error, copyBadgeTag, badgeTagUrl } = useCopiedBadge();

  return (
    <>
      {error && <Snackbar message={error.message} />}
      {isCopied && <Snackbar message="복사 성공!" />}
      <div className="h-96">{badgeTagUrl && <Badge url={badgeTagUrl} />}</div>
      <button
        className="group relative mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={copyBadgeTag}
      >
        커밋 뱃지 복사하기
      </button>
    </>
  );
};

export default CopyBadge;

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../shared/config";

const getBadgeUrl = async ({ qualityPercent }) => {
  let fileRef;

  if (qualityPercent >= 80) {
    fileRef = ref(storage, "badges/commit-rulemaster-style-01.svg");
  } else if (qualityPercent >= 50) {
    fileRef = ref(storage, "badges/commit-hardworker-style-02.svg");
  } else if (qualityPercent >= 30) {
    fileRef = ref(storage, "badges/commit-newbie-style-03.svg");
  } else {
    fileRef = ref(storage, "badges/commit-myway-style-04.svg");
  }

  return await getDownloadURL(fileRef);
};

export { getBadgeUrl };

import { useNavigate } from "react-router-dom";
import HomeIcon from "../assets/svg/home-icon.svg";

const HomeButton = () => {
  const navigate = useNavigate();
  const handleRoutingHome = () => navigate("/", { replace: true });

  return (
    <button
      onClick={handleRoutingHome}
      className="mr-6 rounded-full border border-slate-200 bg-white p-3 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      <img src={HomeIcon} alt="go home" width={24} className="fill-blue-500" />
    </button>
  );
};

export default HomeButton;

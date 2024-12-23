import { useNavigate } from "react-router-dom";
import HomeIcon from "../components/HomeIcon";

function HomeButton() {
  const navigate = useNavigate();
  const handleRoutingHome = () => navigate("/", { replace: true });

  return (
    <button
      onClick={handleRoutingHome}
      className="my-4 ml-4 mr-8 w-fit rounded-full bg-white p-3 text-sm font-medium text-gray-900 transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    >
      <HomeIcon />
    </button>
  );
}

export default HomeButton;

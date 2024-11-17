import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import Error from "../../shared/components/Error";
import Footer from "../../shared/components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  const handleRoutingHome = () => navigate("/", { replace: true });

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-gray-100">
      <Error
        code="404"
        heading="Page Not Found 🤔"
        paragraph="The page you are looking for does not exist."
        button={<Button onClick={handleRoutingHome}>Go to Home</Button>}
      />
      <Footer />
    </div>
  );
};

export default NotFound;

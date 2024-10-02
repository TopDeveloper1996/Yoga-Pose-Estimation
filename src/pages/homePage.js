import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CardPose from "../components/poseCard";

const HomePage = () => {
  return (
    <nav className="flex justify-center w-full h-screen items-center">
      <a href="/mentor">
        <div className="flex w-96 h-64 bg-[#004392] rounded-lg shadow-md shadow-gray-600 text-white items-center justify-center font-medium text-[80px]">
          Mentor
        </div>
      </a>
      <div className="w-20"></div>
      <a href="/learner">
        <div className="flex w-96 h-64 bg-[#004392] rounded-lg shadow-md shadow-gray-600  text-white items-center justify-center font-medium text-[80px]">
          Learner
        </div>
      </a>
    </nav>
  );
};

export default HomePage;

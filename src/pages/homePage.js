import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import { MentorContext } from "../contexts/mentorContext";
import { USER_ID, CAMPUS_GROUP_ID, CURR_CAT_ID, USER_TYPE } from "../config";

const HomePage = () => {
  const {
    campuses,
    subjects,
    defaultChapters,
    campusChapters,
    topics,
    loadingCampuses,
    loadingSubjects,
    loadingChapters,
    loadingTopics,
    errorCampuses,
    errorSubjects,
    errorChapters,
    errorTopics,
    getCampusesListingData,
    getCampusCourseBatch,
    getDefaultAndCampusChapters,
    getTopicsListing,
  } = useContext(MentorContext);

  useEffect(() => {
    getCampusesListingData({
      campusGroupId: CAMPUS_GROUP_ID,
      userId: USER_ID,
      userType: USER_TYPE,
    });
  }, [getCampusesListingData]);

  useEffect(() => {
    campuses.length &&
      getCampusCourseBatch({
        campus_course_id: "6703bde265ac58e5b91c5708",
      });
  }, [campuses, getCampusCourseBatch]);


  useEffect(() => {
    console.log(errorCampuses || errorSubjects || errorChapters || errorTopics);
  }, [errorCampuses, errorSubjects, errorChapters, errorTopics]);
  return (
    <nav className="flex justify-center w-full h-screen items-center">
      <Link to="/mentor">
        <div className="flex w-96 h-64 bg-primary rounded-lg shadow-md shadow-gray-600 text-white items-center justify-center font-medium text-[80px]">
          Mentor
        </div>
      </Link>
      <div className="w-20"></div>
      <Link to="/learner">
        <div className="flex w-96 h-64 bg-primary rounded-lg shadow-md shadow-gray-600  text-white items-center justify-center font-medium text-[80px]">
          Learner
        </div>
      </Link>
    </nav>
  );
};

export default HomePage;

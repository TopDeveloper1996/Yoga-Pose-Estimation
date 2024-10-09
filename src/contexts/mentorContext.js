import { createContext, useState } from "react";
import axios from "../utils/axios"; // Adjust import path as necessary

const MentorContext = createContext({
  campuses: [],
  subjects: [],
  chapters: [],
  topics: [],
  loadingCampuses: false,
  loadingSubjects: false,
  loadingChapters: false,
  loadingTopics: false,
  errorCampuses: null,
  errorSubjects: null,
  errorChapters: null,
  errorTopics: null,
  getCampusesListingData: ({ userId, campusGroupId, userType }) => {},
  getCampusCourseBatch: ({ campusId, currCatId }) => {},
  getDefaultAndCampusChapters: () => {},
  getTopicsListing: () => {},
});

const MentorProvider = ({ children }) => {
  const [campuses, setCampuses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [defaultChapters, setDefaultChapters] = useState([]);
  const [campusChapters, setCampusChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [errorCampuses, setErrorCampuses] = useState(null);
  const [errorSubjects, setErrorSubjects] = useState(null);
  const [errorChapters, setErrorChapters] = useState(null);
  const [errorTopics, setErrorTopics] = useState(null);

  const getCampusesListingData = async ({
    userId,
    campusGroupId,
    userType,
  }) => {
    setLoadingCampuses(true);
    setErrorCampuses(null);
    try {
      const response = await axios.post(
        "api/campus_onboarding_ms/getCampusesListingData",
        {
          user_id: userId,
          campus_group_id: campusGroupId,
          user_type: userType,
        }
      );
      if (response.data.status === 200) {
        setCampuses(response.data.data);
      } else if (response.status === 404) {
        setCampuses([]);
        setErrorCampuses(response.data.msg);
      }
    } catch (err) {
      setErrorCampuses(err.message);
      console.error(err);
    } finally {
      setLoadingCampuses(false);
    }
  };

  const getCampusCourseBatch = async ({ campusId, campusGroupId }) => {
    setLoadingSubjects(true);
    setErrorSubjects(null);
    try {
      const response = await axios.post(
        "api/campus_onboarding_ms/getCampusCourseBatch?courseSection=subject_names",
        {
          campus_id: campusId,
          campus_group_id: campusGroupId,
        }
      );
      if (response.data.status === 200) {
        setSubjects(response.data);
      } else {
        setSubjects([]);
        setErrorSubjects(response.data.msg);
      }
    } catch (err) {
      setErrorSubjects(err.message);
      console.error(err);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const getDefaultAndCampusChapters = async ({
    subId,
    campusId,
    campusGroupId,
  }) => {
    setLoadingChapters(true);
    setErrorChapters(null);
    try {
      const response = await axios.post(
        "api/campus_onboarding_ms/getCampusCourseBatch?courseSection=subject_names",
        {
          sub_id: subId,
          campus_id: campusId,
          campus_group_id: campusGroupId,
        }
      );

      if (response.data.status === 200) {
        setDefaultChapters(response.data.defaulChapters);
        setCampusChapters(response.data.campusChapters);
      } else if (response.status) {
        setDefaultChapters([]);
        setCampusChapters([]);
      }
    } catch (err) {
      setErrorChapters(err.message);
    } finally {
      setLoadingChapters(false);
    }
  };

  const getTopicsListing = async ({ chapterId }) => {
    setLoadingTopics(true);
    setErrorTopics(null);
    try {
      const response = await axios.post(
        "api/campus_dashboard_module_ms/getTopicsListing",
        {
          chapter_id: chapterId,
        }
      );

      if (response.data.status === 200) {
        setTopics(response.data);
      } else if (response) {
        setTopics([]);
        setErrorTopics(response.data.msg);
      }
    } catch (err) {
      setErrorTopics(err.message);
    } finally {
      setLoadingTopics(false);
    }
  };

  return (
    <MentorContext.Provider
      value={{
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
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export { MentorContext, MentorProvider };

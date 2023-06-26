import { StudySpaceContext } from "../context/StudySpaceContext";
import { useContext } from "react";

export const useStudySpaceContext = () => {
  const context = useContext(StudySpaceContext);

  if (!context) {
    throw Error(
      "useStudySpaceContext must be used inside an StudySpaceContextProvider"
    );
  }

  return context;
};

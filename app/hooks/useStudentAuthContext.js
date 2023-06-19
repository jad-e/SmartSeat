import { StudentAuthContext } from "../context/StudentAuthContext";
import { useContext } from "react";

export const useStudentAuthContext = () => {
  const context = useContext(StudentAuthContext);

  if (!context) {
    throw Error(
      "useStudentAuthContext must be used inside an StudentAuthContextProvider"
    );
  }

  return context;
};

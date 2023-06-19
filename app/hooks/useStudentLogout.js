import { useStudentAuthContext } from "./useStudentAuthContext";
// import { useWorkoutsContext } from "./useWorkoutsContext";

export const useStudentLogout = () => {
  const { dispatch } = useStudentAuthContext();
  //   const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    //remove student user from local storage
    localStorage.removeItem("studentUser");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });

    //clear the global workout state when logging out
    //prevent flash
    //workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};

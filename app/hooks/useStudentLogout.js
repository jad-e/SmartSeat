import { useStudentAuthContext } from "./useStudentAuthContext";
// import { useWorkoutsContext } from "./useWorkoutsContext";

import EncryptedStorage from "react-native-encrypted-storage";

export const useStudentLogout = () => {
  const { dispatch } = useStudentAuthContext();
  //   const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = async () => {
    //remove student user from local storage
    try {
      await EncryptedStorage.removeItem("studentUser");
      // Congrats! You've just removed your first value!
    } catch (error) {
      console.log(
        "EncryptedStorage ERROR (can't remove from local storage): " + error
      );
    }

    //double check if encrypted storage is really empty?

    //dispatch logout action
    dispatch({ type: "LOGOUT" });

    //clear the global workout state when logging out
    //prevent flash
    //workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};

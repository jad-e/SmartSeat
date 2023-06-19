import { useState } from "react";
import { useStudentAuthContext } from "./useStudentAuthContext";

import EncryptedStorage from "react-native-encrypted-storage";

export const useStudentLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useStudentAuthContext();

  const login = async (username, password) => {
    //reset the value everytime make a login request
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/studentUser/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    //if there is a problem
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //save the student user (username and json web token) to local storage
      try {
        await EncryptedStorage.setItem("studentUser", JSON.stringify(json));

        // Congrats! You've just stored your first value!
      } catch (error) {
        console.log(
          "EncryptedStorage ERROR (can't store in local storage): " + error
        );
      }

      //update the student auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

import { useState } from "react";
import { useStudentAuthContext } from "./useStudentAuthContext";

import { ToastAndroid } from "react-native";

import EncryptedStorage from "react-native-encrypted-storage";

export const useStudentLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useStudentAuthContext();

  const login = async (username, password) => {
    //reset the value everytime make a login request
    setIsLoading(true);
    setError(null);

    fetch("http://192.168.0.150:4000/api/studentUser/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        try {
          const json = await response.json();

          if (response.status === 200) {
            //save the student user (username and json web token) to local storage
            try {
              await EncryptedStorage.setItem(
                "studentUser",
                JSON.stringify(json)
              );

              // Congrats! You've just stored your first value!
            } catch (error) {
              console.log(
                "EncryptedStorage ERROR (can't store in local storage): " +
                  error
              );
            }

            //update the student auth context
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
          } else {
            console.log("Caught the error for wrong u/p: " + json.error);
            setIsLoading(false);
            setError(json.error);

            //if there is no user, which means got error ..
            //toast message
            ToastAndroid.showWithGravityAndOffset(
              json.error,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              250
            );
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { login, isLoading, error };
};

import { createContext, useReducer, useEffect } from "react";

import EncryptedStorage from "react-native-encrypted-storage";

export const StudentAuthContext = createContext();

export const studentAuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { studentUser: action.payload };
    case "LOGOUT":
      return { studentUser: null };
    default:
      return state;
  }
};

export const StudentAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentAuthReducer, {
    studentUser: null,
  });

  //check if student user is already logged in from last time
  useEffect(() => {
    const check = async () => {
      try {
        const studentUser = await EncryptedStorage.getItem("studentUser");

        if (studentUser) {
          dispatch({ type: "LOGIN", payload: studentUser });
        }
      } catch (error) {
        // There was an error on the native side
        console.log(error);
      }
    };

    check();
  }, []); //only fires once when the components first renders)

  console.log("StudentAuthContext state: ", state); //everytime the state (student user login state) changes, this will be logged

  return (
    <StudentAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

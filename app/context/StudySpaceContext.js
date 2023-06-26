import { createContext, useReducer } from "react";

export const StudySpaceContext = createContext(); //creates a context

export const studySpaceReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDYSPACES":
      return { studySpace: action.payload };

    case "SET_STUDYSPACE":
      return { studySpace: action.payload };

    case "CREATE_STUDYSPACE":
      return {
        studySpace: [...state.studySpace, action.payload],
      };

    case "DELETE_STUDYSPACE":
      return { studySpace: action.payload };

    case "EDIT_STUDYSPACE":
      return { studySpace: action.payload };

    default:
      return state;
  }
};

export const StudySpaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studySpaceReducer, {
    studySpace: null,
  });

  return (
    <StudySpaceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudySpaceContext.Provider>
  );
};

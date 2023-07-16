import React, { useContext, useReducer } from "react";
const AppContext = React.createContext();

const useAppContext = () => {
  return useContext(AppContext);
};

const initialState = {
  city: "Buenos Aires",
  photo: null,
  userId: null,
  weatherRefreshInterval: 60 * 1000,
  popupConfig: false,
  name: null,
  authUser: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "RESET_STATE": {
      return initialState;
    }
    case "TOGGLE_POPUP_CONFIG": {
      return { ...state, popupConfig: !state.popupConfig };
    }
    case "SET_CITY": {
      return { ...state, city: action.value };
    }
    case "SET_USER": {
      return {
        ...state,
        authUser: action.value,
        name: action.value.displayName,
        userId: action.value.uid,
        photo: action.value.photoURL,
      };
    }

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        city: state.city,
        weatherRefreshInterval: state.weatherRefreshInterval,
        popupConfig: state.popupConfig,
        photo: state.photo,
        userId: state.userId,
        name: state.name,
        authUser: statusbar.authUser,
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppProvider, useAppContext };

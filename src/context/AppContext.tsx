/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { ImageState } from "../domains/home/Home";
import { imageList } from "../domains/home/data";

type AppState = {
  images: ImageState[];
  imageError: boolean;
  imageErrorMessage: string;
};

const initialState: AppState = {
  images: [...imageList],
  imageError: false,
  imageErrorMessage: "",
};

interface Action {
  type:
    | "UPLOAD_IMAGE"
    | "DELETE_IMAGE"
    | "IMAGE_ERROR"
    | "CHANGE_ORDER"
    | "CLEAR_ERROR";
  payload?: ImageState | ImageState[];
}

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "UPLOAD_IMAGE":
      return {
        ...state,
        images: [...state.images, action?.payload as ImageState],
        imageError: false,
        imageErrorMessage: "",
      };
    case "CHANGE_ORDER":
      return {
        ...state,
        images: action.payload as ImageState[],
        imageError: false,
        imageErrorMessage: "",
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter(
          (image) => image.name !== (action?.payload as ImageState)?.name
        ),
        imageError: false,
        imageErrorMessage: "",
      };
    case "IMAGE_ERROR":
      return {
        ...state,
        imageError: true,
        imageErrorMessage: "An image with this name exists already",
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        imageError: false,
        imageErrorMessage: "",
      };
    default:
      return state;
  }
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

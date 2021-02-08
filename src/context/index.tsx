import React, {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useUser } from "../utils/auth/useUser";
import { LocalUser } from "../utils/auth/mapUserData";

interface IProps {
  children: ReactNode;
}

type initialState = {
  errorMessage: string;
  successMessage: string;
  user: LocalUser | undefined;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
};

//Context
export const AppContext = createContext<initialState>({} as initialState);

//Provider
export const AppContextProvider = ({ children }: IProps) => {
  let {
    user,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    login,
    signIn,
    logout,
  } = useUser();

  const values = React.useMemo(
    () => ({
      user,
      errorMessage,
      setErrorMessage,
      successMessage,
      setSuccessMessage,
      login,
      logout,
      signIn,
    }),
    [
      user,
      errorMessage,
      setErrorMessage,
      successMessage,
      setSuccessMessage,
      login,
      logout,
      signIn,
    ]
  );

  return <AppContext.Provider value={values}> {children} </AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export default useAppContext;

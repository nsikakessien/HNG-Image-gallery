import PageLoader from "./components/loader/PageLoader";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

interface Prop {
  children: JSX.Element;
  redirectTo: string;
}

const RequireAuth = ({ children, redirectTo }: Prop): JSX.Element => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;

  return currentUser !== null ? children : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;

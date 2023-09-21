import PageLoader from "./components/loader/PageLoader";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

interface Prop {
  children: JSX.Element;
  redirectTo: string;
}

const RequireAuth = ({ children, redirectTo }: Prop): JSX.Element => {
  const authObject = useAuth();

  if (authObject?.isLoading) return <PageLoader />;

  return authObject?.currentUser !== null ? (
    children
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default RequireAuth;

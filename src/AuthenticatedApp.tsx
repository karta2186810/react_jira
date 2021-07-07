import { ProjectListPage } from "./pages/ProjectList";
import { useAuth } from "./context/AuthContext";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListPage />
    </div>
  );
};

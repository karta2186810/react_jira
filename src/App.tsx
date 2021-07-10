import React from "react";
// import { ProjectListPage } from "./pages/ProjectList";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FullPageErrorFallback } from "./components/lib";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;

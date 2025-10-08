import { useState, type ErrorInfo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";

function App() {
  const handleGlobalError = (error: Error, errorInfo: ErrorInfo) => {
    console.log("Global error captured:", error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

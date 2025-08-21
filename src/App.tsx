import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetTwitchToken } from "./hooks/useGetTwitchToken";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

function App() {
  const { loading, token } = useGetTwitchToken();

  if (loading) {
    console.log("Loading Twitch token...");
  }

  return (
    <>
     <BrowserRouter>
        <AppRouter />
     </BrowserRouter>
    </>
  );
}

export default App;

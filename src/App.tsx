import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  handleSteamAuth,
  handleSteamValidation,
  OpenIdParams,
} from "./services/steam.provider";

function App() {
  useEffect(() => {
    // Parse the query parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    async function handleSteam() {
      const result = await handleSteamValidation(searchParams);
      // Store the parameters in state
      console.log(result);
    }

    handleSteam();
  }, []);

  return (
    <>
      <a onClick={handleSteamAuth}>sdlaksjdl</a>
    </>
  );
}

export default App;

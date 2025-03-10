import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { GlobalProvider } from "./context";

function App() {
  
  return (
    <GlobalProvider>
      <LoginForm />
    </GlobalProvider>
  );
}

export default App;

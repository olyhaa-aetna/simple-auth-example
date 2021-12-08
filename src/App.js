import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import SecondPage from "./SecondPage";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        This is an app to test storing login info in the Session Storage.
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/secondPage" element={<SecondPage />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

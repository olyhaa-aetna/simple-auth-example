import React, { useEffect } from "react";
import { isAuthenticated, saveAuthTokens } from "./AuthUtils";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to /secondPage if user is authenticated
    if (isAuthenticated()) {
      navigate("/secondPage");
    }
  });

  const handleClick = () => {
    saveAuthTokens("my_new_token");
    navigate("/welcome");
  };

  return (
    <div>
      <div id="welcomePageTitle">
        User is not authenticated (session storage is empty)
      </div>
      <button id="loginButton" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default WelcomePage;

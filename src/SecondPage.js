import { isAuthenticated } from "./AuthUtils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SecondPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to /welcome if user is not authenticated
    if (!isAuthenticated()) {
      navigate("/welcome");
    }
  });

  return (
    <div id="secondPageTitle">This is the second page. It requires login.</div>
  );
};

export default SecondPage;

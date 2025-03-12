
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AgentPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to agent dashboard without login
    navigate('/agent/dashboard');
  }, [navigate]);

  return null;
};

export default AgentPage;

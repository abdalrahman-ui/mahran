
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to supervisor dashboard without login
    navigate('/supervisor/dashboard');
  }, [navigate]);

  return null;
};

export default SupervisorPage;

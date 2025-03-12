
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to manager dashboard without login
    navigate('/manager/dashboard');
  }, [navigate]);

  return null;
};

export default ManagerPage;

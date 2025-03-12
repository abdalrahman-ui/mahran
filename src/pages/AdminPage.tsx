
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to admin dashboard without login
    navigate('/admin/dashboard');
  }, [navigate]);

  return null;
};

export default AdminPage;

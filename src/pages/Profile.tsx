import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";

const Profile = () => {
  const navigate = useNavigate();

  // Redirect to settings page with profile tab active
  React.useEffect(() => {
    navigate("/settings?tab=profile");
  }, [navigate]);

  return (
    <DashboardLayout activePath="/profile">
      <div className="flex items-center justify-center h-full">
        <p>Redirecting to profile settings...</p>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

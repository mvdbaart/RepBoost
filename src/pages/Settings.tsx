import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileSettings from "@/components/settings/ProfileSettings";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("profile");

  useEffect(() => {
    // Get tab from URL query parameter
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && (tab === "profile" || tab === "security")) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <DashboardLayout activePath="/settings">
      <ProfileSettings initialTab={activeTab} />
    </DashboardLayout>
  );
};

export default Settings;

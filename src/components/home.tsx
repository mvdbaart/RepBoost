import React, { useState } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import OverviewSection from "./dashboard/OverviewSection";
import ReviewHub from "./reviews/ReviewHub";
import SentimentAnalysis from "./analytics/SentimentAnalysis";
import ReviewTrendsChart from "./analytics/ReviewTrendsChart";
import BusinessImpactMetrics from "./analytics/BusinessImpactMetrics";
import ReportExport from "./analytics/ReportExport";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard";
import CampaignManager from "./campaigns/CampaignManager";
import ActiveCampaigns from "./campaigns/ActiveCampaigns";
import CampaignCreator from "./campaigns/CampaignCreator";

const Home = () => {
  const [activePath, setActivePath] = useState("/dashboard");

  const handleNavigate = (path: string) => {
    setActivePath(path);
  };

  // Render different content based on active path
  const renderContent = () => {
    switch (activePath) {
      case "/dashboard":
        return <OverviewSection />;
      case "/reviews":
        return <ReviewHub />;
      case "/analytics":
        return <AnalyticsDashboard />;
      case "/campaigns":
        return <CampaignManager />;
      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600">
                This section is currently under development. Please check back
                later.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      activePath={activePath}
      onNavigate={handleNavigate}
      userName="Alex Johnson"
      userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      unreadNotifications={5}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Home;

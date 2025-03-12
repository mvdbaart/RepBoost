import React, { useState } from "react";
import MetricsCards from "./MetricsCards";
import ReviewsPreview from "./ReviewsPreview";
import CampaignStatus from "./CampaignStatus";
import RatingTrend from "./RatingTrend";
import PlatformDistribution from "./PlatformDistribution";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, RefreshCw } from "lucide-react";

interface OverviewSectionProps {
  onCreateCampaign?: () => void;
  onViewAllReviews?: () => void;
  onRefreshData?: () => void;
  isLoading?: boolean;
  lastUpdated?: string;
}

const OverviewSection = ({
  onCreateCampaign = () => console.log("Create campaign clicked"),
  onViewAllReviews = () => console.log("View all reviews clicked"),
  onRefreshData = () => console.log("Refresh data clicked"),
  isLoading = false,
  lastUpdated = "Today at 12:45 PM",
}: OverviewSectionProps) => {
  const [timeRange, setTimeRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your review performance across all platforms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshData}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button
            onClick={onCreateCampaign}
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">New Campaign</span>
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        Last updated: {lastUpdated}
      </div>

      <div className="space-y-6">
        {/* Metrics Cards Row */}
        <MetricsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reviews Preview - Takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <ReviewsPreview onViewAll={onViewAllReviews} />
          </div>

          {/* Campaign Status - Takes 1/3 of the width on large screens */}
          <div className="lg:col-span-1">
            <CampaignStatus onCreateCampaign={onCreateCampaign} />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <Tabs
              defaultValue="month"
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as any)}
              className="w-auto"
            >
              <TabsList className="grid grid-cols-4 w-[300px]">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="quarter">Quarter</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RatingTrend period={timeRange} />
            <PlatformDistribution />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

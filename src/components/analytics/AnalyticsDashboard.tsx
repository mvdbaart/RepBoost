import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Calendar } from "lucide-react";
import SentimentAnalysis from "./SentimentAnalysis";
import ReviewTrendsChart from "./ReviewTrendsChart";
import BusinessImpactMetrics from "./BusinessImpactMetrics";
import ReportExport from "./ReportExport";

interface AnalyticsDashboardProps {
  onExport?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdated?: string;
}

const AnalyticsDashboard = ({
  onExport = () => console.log("Export clicked"),
  onRefresh = () => console.log("Refresh data clicked"),
  isLoading = false,
  lastUpdated = "Today at 12:45 PM",
}: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full h-full bg-gray-50">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">
              Analytics Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed insights and trends from your customer reviews
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center gap-1"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Last updated: {lastUpdated}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Review Trends</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="business">Business Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <BusinessImpactMetrics />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewTrendsChart />
                <SentimentAnalysis />
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Review Trends Over Time</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Calendar size={16} />
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value as any)}
                      className="bg-transparent border-none focus:outline-none text-sm"
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Last Year</option>
                    </select>
                  </Button>
                </div>
              </div>
              <ReviewTrendsChart period={timeRange} />
            </TabsContent>

            <TabsContent value="sentiment" className="space-y-6">
              <SentimentAnalysis />
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <BusinessImpactMetrics />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <ReportExport />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;

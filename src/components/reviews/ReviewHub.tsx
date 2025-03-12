import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Filter, ArrowUpDown } from "lucide-react";
import FilterBar from "./FilterBar";
import ReviewList from "./ReviewList";
import ReviewStats from "./ReviewStats";
import { useReviews } from "./ReviewsContext";

interface ReviewHubProps {
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  lastUpdated?: string;
}

const ReviewHub = ({
  onExport = () => console.log("Export clicked"),
  lastUpdated = "Today at 12:45 PM",
}: ReviewHubProps) => {
  const {
    reviews,
    isLoading,
    stats,
    filters,
    sortOption,
    currentPage,
    setFilters,
    setSortOption,
    setCurrentPage,
    handleRespond,
    syncReviews,
  } = useReviews();

  const handleRefresh = async () => {
    try {
      await syncReviews();
      console.log("Reviews synced successfully");
    } catch (error) {
      console.error("Error syncing reviews:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFlag = (reviewId) => {
    console.log(`Flagging review ${reviewId}`);
    // In a real implementation, this would mark the review for moderation
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Review Hub</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and respond to all your customer reviews across platforms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
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

          {/* Review Stats Section */}
          <div className="mb-6">
            {stats && (
              <ReviewStats
                totalReviews={stats.totalReviews}
                averageRating={stats.averageRating}
                responseRate={stats.responseRate}
                reviewsWithResponse={stats.reviewsWithResponse}
                ratingChange={{ value: 0.3, isPositive: true }}
                responseRateChange={{ value: 5, isPositive: true }}
                platformDistribution={stats.platformDistribution.map(
                  (item) => ({
                    platform: item.platform,
                    count: item.count,
                  }),
                )}
              />
            )}
          </div>

          {/* Filter Bar */}
          <FilterBar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            initialFilters={filters}
            initialSort={sortOption}
          />

          {/* Review List */}
          <div className="mt-4 p-4">
            <ReviewList
              reviews={reviews}
              isLoading={isLoading}
              totalReviews={stats?.totalReviews || 0}
              currentPage={currentPage}
              pageSize={10}
              onPageChange={handlePageChange}
              onRespond={handleRespond}
              onFlag={handleFlag}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewHub;

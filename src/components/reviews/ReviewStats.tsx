import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";

interface ReviewStatsProps {
  totalReviews?: number;
  averageRating?: number;
  responseRate?: number;
  reviewsWithResponse?: number;
  ratingChange?: {
    value: number;
    isPositive: boolean;
  };
  responseRateChange?: {
    value: number;
    isPositive: boolean;
  };
  platformDistribution?: {
    platform: string;
    count: number;
  }[];
}

const ReviewStats = ({
  totalReviews = 248,
  averageRating = 4.7,
  responseRate = 92,
  reviewsWithResponse = 228,
  ratingChange = { value: 0.3, isPositive: true },
  responseRateChange = { value: 5, isPositive: true },
  platformDistribution = [
    { platform: "Google", count: 125 },
    { platform: "Yelp", count: 62 },
    { platform: "Facebook", count: 45 },
    { platform: "Other", count: 16 },
  ],
}: ReviewStatsProps) => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "google":
        return "bg-red-100 text-red-800";
      case "yelp":
        return "bg-blue-100 text-blue-800";
      case "facebook":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Reviews */}
          <div className="flex flex-col p-3 border rounded-lg">
            <span className="text-sm text-gray-500 mb-1">Total Reviews</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{totalReviews}</span>
              <div className="p-2 bg-gray-100 rounded-full">
                <Star className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="flex flex-col p-3 border rounded-lg">
            <span className="text-sm text-gray-500 mb-1">Average Rating</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{averageRating}</span>
                <div
                  className={`flex items-center text-xs ${ratingChange.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {ratingChange.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {ratingChange.value}
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < averageRating
                          ? "fill-yellow-400 text-yellow-400 opacity-50"
                          : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Response Rate */}
          <div className="flex flex-col p-3 border rounded-lg">
            <span className="text-sm text-gray-500 mb-1">Response Rate</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{responseRate}%</span>
                <div
                  className={`flex items-center text-xs ${responseRateChange.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {responseRateChange.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {responseRateChange.value}%
                </div>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {reviewsWithResponse} of {totalReviews} reviews
            </span>
          </div>

          {/* Platform Distribution */}
          <div className="flex flex-col p-3 border rounded-lg">
            <span className="text-sm text-gray-500 mb-1">By Platform</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {platformDistribution.map((item, index) => (
                <Badge
                  key={index}
                  className={`${getPlatformColor(item.platform)} text-xs`}
                  variant="secondary"
                >
                  {item.platform}: {item.count}
                </Badge>
              ))}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              {platformDistribution.map((item, index) => {
                // Calculate width percentage and get cumulative position
                const percentage = (item.count / totalReviews) * 100;
                const previousItems = platformDistribution
                  .slice(0, index)
                  .reduce((acc, curr) => acc + curr.count, 0);
                const previousPercentage = (previousItems / totalReviews) * 100;

                // Get color for the platform
                let bgColor = "bg-gray-500";
                if (item.platform.toLowerCase() === "google")
                  bgColor = "bg-red-500";
                if (item.platform.toLowerCase() === "yelp")
                  bgColor = "bg-blue-500";
                if (item.platform.toLowerCase() === "facebook")
                  bgColor = "bg-indigo-500";

                return (
                  <div
                    key={index}
                    className={`h-full ${bgColor} absolute`}
                    style={{
                      width: `${percentage}%`,
                      left: `${previousPercentage}%`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStats;

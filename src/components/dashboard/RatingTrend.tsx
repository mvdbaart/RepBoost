import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RatingData {
  date: string;
  rating: number;
  platform: string;
}

interface RatingTrendProps {
  data?: RatingData[];
  title?: string;
  period?: "week" | "month" | "quarter" | "year";
}

const RatingTrend = ({
  data = [
    { date: "2023-01-01", rating: 4.2, platform: "Google" },
    { date: "2023-02-01", rating: 4.3, platform: "Google" },
    { date: "2023-03-01", rating: 4.5, platform: "Google" },
    { date: "2023-04-01", rating: 4.4, platform: "Google" },
    { date: "2023-05-01", rating: 4.6, platform: "Google" },
    { date: "2023-06-01", rating: 4.7, platform: "Google" },
    { date: "2023-01-01", rating: 3.8, platform: "Yelp" },
    { date: "2023-02-01", rating: 3.9, platform: "Yelp" },
    { date: "2023-03-01", rating: 4.0, platform: "Yelp" },
    { date: "2023-04-01", rating: 4.1, platform: "Yelp" },
    { date: "2023-05-01", rating: 4.2, platform: "Yelp" },
    { date: "2023-06-01", rating: 4.3, platform: "Yelp" },
    { date: "2023-01-01", rating: 4.0, platform: "Facebook" },
    { date: "2023-02-01", rating: 4.1, platform: "Facebook" },
    { date: "2023-03-01", rating: 4.2, platform: "Facebook" },
    { date: "2023-04-01", rating: 4.3, platform: "Facebook" },
    { date: "2023-05-01", rating: 4.4, platform: "Facebook" },
    { date: "2023-06-01", rating: 4.5, platform: "Facebook" },
  ],
  title = "Rating Trend",
  period = "month",
}: RatingTrendProps) => {
  // Calculate current average rating across all platforms
  const latestRatings = {};
  data.forEach((item) => {
    if (
      !latestRatings[item.platform] ||
      new Date(item.date) > new Date(latestRatings[item.platform].date)
    ) {
      latestRatings[item.platform] = item;
    }
  });

  const currentAvgRating =
    Object.values(latestRatings).reduce(
      (sum: number, item: any) => sum + item.rating,
      0,
    ) / Object.values(latestRatings).length;

  // Calculate previous period's average rating
  const previousPeriodData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const now = new Date();
    let cutoffDate;

    switch (period) {
      case "week":
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "quarter":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "year":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    return itemDate < cutoffDate;
  });

  const previousRatings = {};
  previousPeriodData.forEach((item) => {
    if (
      !previousRatings[item.platform] ||
      new Date(item.date) > new Date(previousRatings[item.platform].date)
    ) {
      previousRatings[item.platform] = item;
    }
  });

  const previousAvgRating =
    Object.values(previousRatings).length > 0
      ? Object.values(previousRatings).reduce(
          (sum: number, item: any) => sum + item.rating,
          0,
        ) / Object.values(previousRatings).length
      : 0;

  const ratingChange = currentAvgRating - previousAvgRating;
  const isPositive = ratingChange >= 0;

  // Mock chart data visualization - in a real app, you would use a charting library like recharts
  const chartHeight = 180;
  const platforms = [...new Set(data.map((item) => item.platform))];

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <Info size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average rating trend across all platforms over time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-3xl font-bold">
            {currentAvgRating.toFixed(1)}
          </div>
          <div
            className={cn(
              "flex items-center text-sm",
              isPositive ? "text-green-600" : "text-red-600",
            )}
          >
            {isPositive ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            {Math.abs(ratingChange).toFixed(1)}{" "}
            {isPositive ? "increase" : "decrease"}
          </div>
        </div>

        {/* Chart visualization placeholder */}
        <div className="relative h-[180px] w-full mt-4">
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {/* Y-axis labels */}
            <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              <span>5.0</span>
              <span>4.0</span>
              <span>3.0</span>
              <span>2.0</span>
              <span>1.0</span>
            </div>

            {/* Chart lines */}
            <div className="absolute inset-0 ml-8 flex flex-col justify-between">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="w-full h-px bg-gray-200" />
              ))}
            </div>

            {/* Platform lines */}
            <div className="absolute inset-0 ml-8 pt-2 pb-4">
              {platforms.map((platform, index) => {
                const platformData = data
                  .filter((d) => d.platform === platform)
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
                  );

                const color =
                  index === 0 ? "#4f46e5" : index === 1 ? "#f59e0b" : "#10b981";

                return (
                  <div key={platform} className="relative h-full">
                    <svg
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        points={platformData
                          .map((d, i) => {
                            const x = (i / (platformData.length - 1)) * 100;
                            const y = ((5 - d.rating) / 4) * chartHeight;
                            return `${x},${y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          {platforms.map((platform, index) => {
            const color =
              index === 0
                ? "bg-indigo-600"
                : index === 1
                  ? "bg-amber-500"
                  : "bg-emerald-500";
            return (
              <div key={platform} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${color} mr-2`} />
                <span className="text-sm">{platform}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingTrend;

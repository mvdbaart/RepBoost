import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  MessageCircleIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

const MetricCard = ({
  title,
  value,
  change,
  icon = <StarIcon className="h-5 w-5" />,
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`mt-1 flex items-center text-xs ${change.isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {change.isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {change.value} since last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsCardsProps {
  totalReviews?: string;
  averageRating?: string;
  responseRate?: string;
  recentActivity?: string;
  totalReviewsChange?: {
    value: string;
    isPositive: boolean;
  };
  averageRatingChange?: {
    value: string;
    isPositive: boolean;
  };
  responseRateChange?: {
    value: string;
    isPositive: boolean;
  };
  recentActivityChange?: {
    value: string;
    isPositive: boolean;
  };
}

const MetricsCards = ({
  totalReviews = "1,248",
  averageRating = "4.8",
  responseRate = "92%",
  recentActivity = "37",
  totalReviewsChange = { value: "12%", isPositive: true },
  averageRatingChange = { value: "0.3", isPositive: true },
  responseRateChange = { value: "5%", isPositive: true },
  recentActivityChange = { value: "8%", isPositive: false },
}: MetricsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Reviews"
        value={totalReviews}
        change={totalReviewsChange}
        icon={<StarIcon className="h-5 w-5" />}
      />
      <MetricCard
        title="Average Rating"
        value={averageRating}
        change={averageRatingChange}
        icon={<StarIcon className="h-5 w-5" />}
      />
      <MetricCard
        title="Response Rate"
        value={responseRate}
        change={responseRateChange}
        icon={<MessageCircleIcon className="h-5 w-5" />}
      />
      <MetricCard
        title="Recent Activity"
        value={`${recentActivity} new`}
        change={recentActivityChange}
        icon={<MessageCircleIcon className="h-5 w-5" />}
      />
    </div>
  );
};

export default MetricsCards;

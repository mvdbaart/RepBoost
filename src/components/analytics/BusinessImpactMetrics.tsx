import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description?: string;
}

interface BusinessImpactMetricsProps {
  metrics?: {
    conversionRate: number;
    websiteTraffic: number;
    customerAcquisition: number;
    averageOrderValue: number;
  };
}

const MetricCard = ({
  title,
  value,
  change,
  icon,
  description,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span
            className={`flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const BusinessImpactMetrics = ({
  metrics = {
    conversionRate: 4.2,
    websiteTraffic: 15.8,
    customerAcquisition: 8.3,
    averageOrderValue: 12.5,
  },
}: BusinessImpactMetricsProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Business Impact Metrics
        </h2>
        <p className="text-sm text-gray-500">
          How reviews are affecting your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={1.2}
          icon={<MousePointerClick className="w-5 h-5 text-blue-600" />}
          description="Percentage of visitors who take a desired action"
        />

        <MetricCard
          title="Website Traffic"
          value="+15.8%"
          change={15.8}
          icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          description="Increase in website visitors from review platforms"
        />

        <MetricCard
          title="Customer Acquisition"
          value="+8.3%"
          change={8.3}
          icon={<Users className="w-5 h-5 text-green-600" />}
          description="New customers attributed to positive reviews"
        />

        <MetricCard
          title="Average Order Value"
          value="+12.5%"
          change={12.5}
          icon={<ShoppingCart className="w-5 h-5 text-amber-600" />}
          description="Increase in average purchase amount"
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">
            Review Attribution
          </h3>
          <span className="text-sm text-gray-500">65% of conversions</span>
        </div>
        <Progress value={65} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">
          Percentage of conversions that can be attributed to customer reviews
        </p>
      </div>
    </div>
  );
};

export default BusinessImpactMetrics;

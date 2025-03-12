import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon, TrendingUpIcon, BarChart3Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewTrendsChartProps {
  data?: any[];
  timeRange?: string;
}

const ReviewTrendsChart = ({
  data = generateMockData(),
  timeRange = "30days",
}: ReviewTrendsChartProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [chartType, setChartType] = useState("rating");

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">Review Trends</CardTitle>
          <div className="flex space-x-2">
            <Tabs
              defaultValue={chartType}
              onValueChange={setChartType}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rating" className="text-xs">
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  Rating
                </TabsTrigger>
                <TabsTrigger value="volume" className="text-xs">
                  <BarChart3Icon className="h-3 w-3 mr-1" />
                  Volume
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-[120px] h-8">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          {chartType === "rating" ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => formatDate(value)}
                />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorRating)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => formatDate(value)}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="google" stackId="a" fill="#4285F4" />
                <Bar dataKey="yelp" stackId="a" fill="#D32323" />
                <Bar dataKey="facebook" stackId="a" fill="#3b5998" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#4285F4] mr-2"></div>
            <span className="text-xs text-gray-600">Google</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#D32323] mr-2"></div>
            <span className="text-xs text-gray-600">Yelp</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#3b5998] mr-2"></div>
            <span className="text-xs text-gray-600">Facebook</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
        <p className="text-xs font-medium">{formatDate(label)}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            className="text-xs"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const generateMockData = () => {
  const data = [];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate random values with a trend
    const googleCount = Math.floor(Math.random() * 5) + 3;
    const yelpCount = Math.floor(Math.random() * 3) + 1;
    const facebookCount = Math.floor(Math.random() * 4) + 2;
    const totalCount = googleCount + yelpCount + facebookCount;

    // Calculate weighted average rating
    const googleRating = Math.random() * 1.5 + 3.5; // 3.5-5.0 range
    const yelpRating = Math.random() * 1.5 + 3.0; // 3.0-4.5 range
    const facebookRating = Math.random() * 1.5 + 3.2; // 3.2-4.7 range

    const avgRating =
      (googleRating * googleCount +
        yelpRating * yelpCount +
        facebookRating * facebookCount) /
      totalCount;

    data.push({
      date: date.toISOString(),
      avgRating: parseFloat(avgRating.toFixed(2)),
      google: googleCount,
      yelp: yelpCount,
      facebook: facebookCount,
      totalCount: totalCount,
    });
  }

  return data;
};

export default ReviewTrendsChart;

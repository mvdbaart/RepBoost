import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  BarChart2,
} from "lucide-react";

interface SentimentAnalysisProps {
  data?: {
    positiveKeywords: Array<{ keyword: string; count: number }>;
    negativeKeywords: Array<{ keyword: string; count: number }>;
    sentimentByCategory: Array<{
      category: string;
      positive: number;
      neutral: number;
      negative: number;
    }>;
    overallSentiment: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
}

const SentimentAnalysis = ({ data }: SentimentAnalysisProps) => {
  // Default mock data if none is provided
  const defaultData = {
    positiveKeywords: [
      { keyword: "excellent", count: 42 },
      { keyword: "friendly", count: 38 },
      { keyword: "helpful", count: 35 },
      { keyword: "professional", count: 29 },
      { keyword: "quality", count: 24 },
    ],
    negativeKeywords: [
      { keyword: "slow", count: 18 },
      { keyword: "expensive", count: 15 },
      { keyword: "disappointing", count: 12 },
      { keyword: "difficult", count: 10 },
      { keyword: "confusing", count: 8 },
    ],
    sentimentByCategory: [
      { category: "Customer Service", positive: 75, neutral: 15, negative: 10 },
      { category: "Product Quality", positive: 68, neutral: 22, negative: 10 },
      { category: "Value for Money", positive: 55, neutral: 25, negative: 20 },
      { category: "Ease of Use", positive: 62, neutral: 28, negative: 10 },
    ],
    overallSentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
    },
  };

  const analysisData = data || defaultData;

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Analysis of customer sentiment across reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span>Positive</span>
                </div>
                <span className="font-medium">
                  {analysisData.overallSentiment.positive}%
                </span>
              </div>
              <Progress
                value={analysisData.overallSentiment.positive}
                className="h-2 bg-gray-100"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Meh className="h-5 w-5 text-yellow-500" />
                  <span>Neutral</span>
                </div>
                <span className="font-medium">
                  {analysisData.overallSentiment.neutral}%
                </span>
              </div>
              <Progress
                value={analysisData.overallSentiment.neutral}
                className="h-2 bg-gray-100"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                  <span>Negative</span>
                </div>
                <span className="font-medium">
                  {analysisData.overallSentiment.negative}%
                </span>
              </div>
              <Progress
                value={analysisData.overallSentiment.negative}
                className="h-2 bg-gray-100"
              />
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Overall Sentiment</h4>
                <div className="flex items-center gap-1">
                  {analysisData.overallSentiment.positive > 60 ? (
                    <>
                      <Smile className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-green-500">
                        Positive
                      </span>
                    </>
                  ) : analysisData.overallSentiment.negative > 30 ? (
                    <>
                      <Frown className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium text-red-500">
                        Negative
                      </span>
                    </>
                  ) : (
                    <>
                      <Meh className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-500">
                        Neutral
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                Positive Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisData.positiveKeywords.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  >
                    {item.keyword} ({item.count})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                <ThumbsDown className="h-4 w-4 text-red-500" />
                Negative Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisData.negativeKeywords.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  >
                    {item.keyword} ({item.count})
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            {analysisData.sentimentByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-sm font-medium">{category.category}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 flex overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${category.positive}%` }}
                    />
                    <div
                      className="bg-yellow-400 h-full"
                      style={{ width: `${category.neutral}%` }}
                    />
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${category.negative}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-600">{category.positive}%</span>
                    <span className="text-yellow-600">{category.neutral}%</span>
                    <span className="text-red-600">{category.negative}%</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;

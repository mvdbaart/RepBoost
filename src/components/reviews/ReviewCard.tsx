import React from "react";
import { Star, ThumbsUp, MessageSquare, Flag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReviewCardProps {
  reviewer?: {
    name: string;
    avatar?: string;
  };
  platform?: "google" | "yelp" | "facebook" | "other";
  rating?: number;
  date?: string;
  content?: string;
  responded?: boolean;
  onRespond?: () => void;
  onFlag?: () => void;
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "google":
      return "bg-red-100 text-red-800";
    case "yelp":
      return "bg-red-100 text-red-800";
    case "facebook":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ReviewCard = ({
  reviewer = { name: "Anonymous User" },
  platform = "other",
  rating = 3,
  date = "Jan 1, 2023",
  content = "No review content provided.",
  responded = false,
  onRespond = () => {},
  onFlag = () => {},
}: ReviewCardProps) => {
  return (
    <Card className="w-full mb-4 bg-white border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            {reviewer.avatar ? (
              <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary">
                {reviewer.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{reviewer.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{date}</span>
            </div>
          </div>
        </div>
        <Badge className={`${getPlatformColor(platform)} capitalize`}>
          {platform}
        </Badge>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-gray-700">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600"
                >
                  <ThumbsUp size={16} className="mr-1" />
                  <span>Helpful</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as helpful</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-600"
                  onClick={onFlag}
                >
                  <Flag size={16} className="mr-1" />
                  <span>Flag</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Flag for review</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
          variant={responded ? "outline" : "secondary"}
          size="sm"
          onClick={onRespond}
          className={responded ? "text-green-600 border-green-200" : ""}
        >
          <MessageSquare size={16} className="mr-1" />
          {responded ? "View Response" : "Respond"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  content: string;
  platform: "google" | "yelp" | "facebook" | "other";
  responded: boolean;
}

interface ReviewsPreviewProps {
  reviews?: Review[];
  onViewAll?: () => void;
  onRespond?: (reviewId: string) => void;
}

const ReviewsPreview = ({
  reviews = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      date: "2023-06-15",
      content:
        "Absolutely love this business! The customer service was exceptional and the product quality exceeded my expectations. Will definitely be returning!",
      platform: "google",
      responded: true,
    },
    {
      id: "2",
      customerName: "Michael Chen",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      date: "2023-06-10",
      content:
        "Great experience overall. The staff was friendly and helpful. Only giving 4 stars because the wait time was a bit longer than expected.",
      platform: "yelp",
      responded: false,
    },
    {
      id: "3",
      customerName: "Jessica Williams",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      rating: 3,
      date: "2023-06-05",
      content:
        "Decent service but room for improvement. The product was good but I had some issues with delivery.",
      platform: "facebook",
      responded: false,
    },
  ],
  onViewAll = () => console.log("View all reviews clicked"),
  onRespond = (id) => console.log(`Respond to review ${id}`),
}: ReviewsPreviewProps) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  // Function to get platform badge color
  const getPlatformColor = (platform: Review["platform"]) => {
    switch (platform) {
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
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Recent Reviews</CardTitle>
        <Button variant="outline" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={review.customerAvatar}
                      alt={review.customerName}
                    />
                    <AvatarFallback>
                      {review.customerName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.customerName}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={`${getPlatformColor(review.platform)} capitalize`}
                >
                  {review.platform}
                </Badge>
              </div>
              <p className="mt-3 text-gray-700">{review.content}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <ThumbsUp size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like this review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Flag size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Flag this review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button
                  variant={review.responded ? "outline" : "default"}
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onRespond(review.id)}
                >
                  <MessageSquare size={16} />
                  {review.responded ? "View Response" : "Respond"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsPreview;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import ResponseDialog from "./ResponseDialog";

interface Review {
  id: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  platform: "google" | "yelp" | "facebook" | "other";
  rating: number;
  date: string;
  content: string;
  responded: boolean;
}

interface ReviewListProps {
  reviews?: Review[];
  isLoading?: boolean;
  totalReviews?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onRespond?: (reviewId: string) => void;
  onFlag?: (reviewId: string) => void;
}

const ReviewList = ({
  reviews = [
    {
      id: "1",
      reviewer: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      platform: "google",
      rating: 5,
      date: "Jan 15, 2023",
      content:
        "Absolutely love this business! The customer service was exceptional and the product quality exceeded my expectations. Will definitely be returning!",
      responded: true,
    },
    {
      id: "2",
      reviewer: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      },
      platform: "yelp",
      rating: 4,
      date: "Jan 10, 2023",
      content:
        "Great experience overall. The staff was friendly and helpful. Only giving 4 stars because the wait time was a bit longer than expected.",
      responded: false,
    },
    {
      id: "3",
      reviewer: {
        name: "Jessica Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      },
      platform: "facebook",
      rating: 3,
      date: "Jan 5, 2023",
      content:
        "Decent service but room for improvement. The product was good but I had some issues with delivery.",
      responded: false,
    },
    {
      id: "4",
      reviewer: {
        name: "David Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      platform: "google",
      rating: 5,
      date: "Dec 28, 2022",
      content:
        "Top-notch service from start to finish. The team went above and beyond to ensure my satisfaction. Highly recommend!",
      responded: true,
    },
    {
      id: "5",
      reviewer: {
        name: "Emily Thompson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      },
      platform: "yelp",
      rating: 2,
      date: "Dec 20, 2022",
      content:
        "Disappointing experience. The product didn't meet my expectations and customer service was slow to respond to my concerns.",
      responded: false,
    },
  ],
  isLoading = false,
  totalReviews = 42,
  currentPage = 1,
  pageSize = 10,
  onPageChange = () => {},
  onRespond = () => {},
  onFlag = () => {},
}: ReviewListProps) => {
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);

  const totalPages = Math.ceil(totalReviews / pageSize);

  const handleRespond = (reviewId: string) => {
    setActiveReviewId(reviewId);
    setIsResponseDialogOpen(true);
  };

  const handleSubmitResponse = (response: string, reviewId: string) => {
    onRespond(reviewId);
    setIsResponseDialogOpen(false);
    setActiveReviewId(null);
  };

  const activeReview = reviews.find((review) => review.id === activeReviewId);

  if (isLoading) {
    return (
      <div className="space-y-4 bg-white">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white">
      {reviews.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500 text-lg">No reviews found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your filters to see more results
          </p>
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewer={review.reviewer}
              platform={review.platform}
              rating={review.rating}
              date={review.date}
              content={review.content}
              responded={review.responded}
              onRespond={() => handleRespond(review.id)}
              onFlag={() => onFlag(review.id)}
            />
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t pt-4 mt-6">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalReviews)} of{" "}
                {totalReviews} reviews
              </div>
              <Pagination>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={i}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => onPageChange(pageNum)}
                        className="w-9 h-9"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Pagination>
            </div>
          )}
        </>
      )}

      {activeReview && (
        <ResponseDialog
          isOpen={isResponseDialogOpen}
          onOpenChange={setIsResponseDialogOpen}
          reviewId={activeReview.id}
          reviewPlatform={activeReview.platform}
          reviewerName={activeReview.reviewer.name}
          initialReviewText={activeReview.content}
          onSubmitResponse={handleSubmitResponse}
        />
      )}
    </div>
  );
};

export default ReviewList;

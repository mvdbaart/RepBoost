import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getReviews,
  getReviewStats,
  respondToReview,
  Review,
} from "@/services/reviewService";
import { useMockAuth } from "@/components/auth/MockAuthProvider";
import { supabase } from "@/lib/supabase";

interface ReviewsContextType {
  reviews: Review[];
  isLoading: boolean;
  error: Error | null;
  stats: {
    totalReviews: number;
    averageRating: number;
    responseRate: number;
    reviewsWithResponse: number;
    platformDistribution: Array<{ platform: string; count: number }>;
  } | null;
  filters: {
    platforms: string[];
    rating: [number, number];
    dateRange: { from: Date; to?: Date } | null;
    keyword: string;
  };
  sortOption: string;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  fetchReviews: () => Promise<void>;
  setFilters: (filters: any) => void;
  setSortOption: (option: string) => void;
  setCurrentPage: (page: number) => void;
  handleRespond: (reviewId: string, responseText: string) => Promise<void>;
  syncReviews: () => Promise<void>;
}

const defaultStats = {
  totalReviews: 0,
  averageRating: 0,
  responseRate: 0,
  reviewsWithResponse: 0,
  platformDistribution: [],
};

const defaultFilters = {
  platforms: [],
  rating: [1, 5] as [number, number],
  dateRange: null,
  keyword: "",
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useMockAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<ReviewsContextType["stats"]>(defaultStats);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const reviewsData = await getReviews(filters);
      setReviews(reviewsData);

      // Calculate total pages
      setTotalPages(Math.ceil(reviewsData.length / pageSize));

      // Get stats
      const statsData = await getReviewStats();
      setStats(statsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespond = async (reviewId: string, responseText: string) => {
    try {
      await respondToReview(reviewId, responseText);
      // Refresh reviews after responding
      fetchReviews();
    } catch (err) {
      setError(err as Error);
    }
  };

  const syncReviews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate syncing reviews from external platforms
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Refresh reviews after syncing
      await fetchReviews();

      return { success: true };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when user changes
  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);

  // Fetch when filters or sort option changes
  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [filters, sortOption]);

  const value = {
    reviews,
    isLoading,
    error,
    stats,
    filters,
    sortOption,
    currentPage,
    pageSize,
    totalPages,
    fetchReviews,
    setFilters,
    setSortOption,
    setCurrentPage,
    handleRespond,
    syncReviews,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}

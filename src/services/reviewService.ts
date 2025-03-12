import { mockReviews } from "./mockData";

export interface Review {
  id: string;
  customer_name: string;
  customer_avatar?: string;
  platform: string;
  rating: number;
  date: string;
  content: string;
  responded: boolean;
  response_text?: string;
  response_date?: string;
}

export async function getReviews(filters?: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredReviews = [...mockReviews];

  // Apply filters if provided
  if (filters) {
    if (filters.platforms && filters.platforms.length > 0) {
      filteredReviews = filteredReviews.filter((review) =>
        filters.platforms.includes(review.platform),
      );
    }

    if (filters.rating && (filters.rating[0] > 1 || filters.rating[1] < 5)) {
      filteredReviews = filteredReviews.filter(
        (review) =>
          review.rating >= filters.rating[0] &&
          review.rating <= filters.rating[1],
      );
    }

    if (filters.dateRange && filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      filteredReviews = filteredReviews.filter(
        (review) => new Date(review.date) >= fromDate,
      );

      if (filters.dateRange.to) {
        const toDate = new Date(filters.dateRange.to);
        filteredReviews = filteredReviews.filter(
          (review) => new Date(review.date) <= toDate,
        );
      }
    }

    if (filters.keyword) {
      filteredReviews = filteredReviews.filter((review) =>
        review.content.toLowerCase().includes(filters.keyword.toLowerCase()),
      );
    }
  }

  // Sort by date descending (newest first)
  filteredReviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return filteredReviews;
}

export async function getReviewById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = mockReviews.find((review) => review.id === id);

  if (!review) {
    throw new Error(`Review with id ${id} not found`);
  }

  return review;
}

export async function respondToReview(id: string, responseText: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const reviewIndex = mockReviews.findIndex((review) => review.id === id);

  if (reviewIndex === -1) {
    throw new Error(`Review with id ${id} not found`);
  }

  // Update the review in our mock data
  mockReviews[reviewIndex] = {
    ...mockReviews[reviewIndex],
    responded: true,
    response_text: responseText,
    response_date: new Date().toISOString(),
  };

  return [mockReviews[reviewIndex]];
}

export async function getReviewStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const reviews = mockReviews;

  // Calculate stats
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
  const respondedReviews = reviews.filter((review) => review.responded).length;
  const responseRate =
    totalReviews > 0 ? (respondedReviews / totalReviews) * 100 : 0;

  // Platform distribution
  const platforms = {};
  reviews.forEach((review) => {
    platforms[review.platform] = (platforms[review.platform] || 0) + 1;
  });

  const platformDistribution = Object.entries(platforms).map(
    ([platform, count]) => ({
      platform,
      count,
    }),
  );

  return {
    totalReviews,
    averageRating,
    responseRate,
    reviewsWithResponse: respondedReviews,
    platformDistribution,
  };
}

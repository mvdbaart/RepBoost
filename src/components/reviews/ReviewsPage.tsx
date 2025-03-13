import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import ReviewHub from "./ReviewHub";
import { ReviewsProvider } from "./ReviewsContext";

const ReviewsPage = () => {
  return (
    <ReviewsProvider>
      <DashboardLayout activePath="/reviews">
        <ReviewHub />
      </DashboardLayout>
    </ReviewsProvider>
  );
};

export default ReviewsPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Image,
  Share2,
  Download,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Review } from "@/services/reviewService";
import { mockReviews } from "@/services/mockData";

interface SocialMediaGeneratorProps {
  reviews?: Review[];
  onGeneratePost?: (post: SocialPost) => void;
}

interface SocialPost {
  platform: string;
  content: string;
  review: Review;
  template: string;
  scheduledDate?: Date;
}

const templates = [
  {
    id: "template1",
    name: "Customer Spotlight",
    preview:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
    description:
      "Highlight a positive customer review with a clean, professional design.",
  },
  {
    id: "template2",
    name: "Quote Card",
    preview:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80",
    description: "Simple quote card that emphasizes the review text.",
  },
  {
    id: "template3",
    name: "Star Rating",
    preview:
      "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?w=400&q=80",
    description: "Showcase the star rating alongside the review text.",
  },
];

const SocialMediaGenerator = ({
  reviews = mockReviews,
  onGeneratePost = () => {},
}: SocialMediaGeneratorProps) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(
    reviews[0] || null,
  );
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [platform, setPlatform] = useState("instagram");
  const [customCaption, setCustomCaption] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("select-review");

  const handleGeneratePost = () => {
    if (!selectedReview) return;

    const post: SocialPost = {
      platform,
      content:
        customCaption ||
        `Check out this ${selectedReview.rating}-star review from ${selectedReview.customer_name}!`,
      review: selectedReview,
      template: selectedTemplate.id,
      scheduledDate: scheduledDate || undefined,
    };

    onGeneratePost(post);
    // In a real app, this would save the post or schedule it
    alert("Post created successfully!");
  };

  const handleNextStep = () => {
    if (activeTab === "select-review") setActiveTab("design-post");
    else if (activeTab === "design-post") setActiveTab("schedule-post");
  };

  const handlePreviousStep = () => {
    if (activeTab === "design-post") setActiveTab("select-review");
    else if (activeTab === "schedule-post") setActiveTab("design-post");
  };

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Social Media Post Generator</h2>
        <p className="text-muted-foreground">
          Create engaging social media posts from your customer reviews
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="select-review">1. Select Review</TabsTrigger>
          <TabsTrigger value="design-post">2. Design Post</TabsTrigger>
          <TabsTrigger value="schedule-post">3. Schedule & Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="select-review" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className={`cursor-pointer transition-all ${selectedReview?.id === review.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedReview(review)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {review.customer_avatar && (
                        <img
                          src={review.customer_avatar}
                          alt={review.customer_name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <CardTitle className="text-sm">
                          {review.customer_name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground capitalize">
                          {review.platform}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{review.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNextStep} disabled={!selectedReview}>
              Next: Design Post
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="design-post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Select Template</h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTemplate.id === template.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="font-medium">{template.name}</div>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Select Platform</h3>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Custom Caption</h3>
                <Textarea
                  placeholder="Add a custom caption for your post..."
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <div className="border rounded-lg p-4 bg-white">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  {selectedReview && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full flex items-center justify-center relative"
                      style={{
                        backgroundImage: `url(${selectedTemplate.preview})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="relative z-10 text-white p-6 text-center max-w-md">
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < selectedReview.rating
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-xl font-medium mb-4">
                          "{selectedReview.content}"
                        </p>
                        <p className="text-sm">
                          - {selectedReview.customer_name}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="p-3 border-t">
                  <p className="text-sm font-medium mb-1">
                    {platform === "instagram" && (
                      <Instagram className="inline mr-2 h-4 w-4" />
                    )}
                    {platform === "facebook" && (
                      <Facebook className="inline mr-2 h-4 w-4" />
                    )}
                    {platform === "twitter" && (
                      <Twitter className="inline mr-2 h-4 w-4" />
                    )}
                    {platform === "linkedin" && (
                      <Linkedin className="inline mr-2 h-4 w-4" />
                    )}
                    Caption Preview:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customCaption ||
                      (selectedReview
                        ? `Check out this ${selectedReview.rating}-star review from ${selectedReview.customer_name}!`
                        : "No caption added yet.")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back: Select Review
            </Button>
            <Button onClick={handleNextStep}>Next: Schedule & Publish</Button>
          </div>
        </TabsContent>

        <TabsContent value="schedule-post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    When would you like to publish this post?
                  </h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Select Date & Time
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Post Now
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Additional Options
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Image className="h-4 w-4" />
                        Add More Media
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Cross-post to Other Platforms
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedReview && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Review by:</span>
                      <span className="text-sm">
                        {selectedReview.customer_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Platform:</span>
                      <span className="text-sm capitalize">{platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Template:</span>
                      <span className="text-sm">{selectedTemplate.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Schedule:</span>
                      <span className="text-sm">
                        {scheduledDate
                          ? scheduledDate.toLocaleDateString()
                          : "Post immediately"}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 mr-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleGeneratePost} className="flex-1">
                  Publish Post
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back: Design Post
            </Button>
            <Button onClick={handleGeneratePost}>Publish Post</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaGenerator;

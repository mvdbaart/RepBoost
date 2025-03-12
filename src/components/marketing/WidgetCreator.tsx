import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Copy, Eye, Code, Settings, Star, Check, Info } from "lucide-react";
import { mockReviews } from "@/services/mockData";

interface WidgetCreatorProps {
  onSave?: (widgetConfig: WidgetConfig) => void;
  initialConfig?: WidgetConfig;
  isOpen?: boolean;
}

interface WidgetConfig {
  type: string;
  appearance: {
    theme: string;
    showRating: boolean;
    showPlatform: boolean;
    maxReviews: number;
  };
  content: {
    title: string;
    subtitle: string;
    selectedReviews: string[];
  };
}

const defaultConfig: WidgetConfig = {
  type: "carousel",
  appearance: {
    theme: "light",
    showRating: true,
    showPlatform: true,
    maxReviews: 5,
  },
  content: {
    title: "What Our Customers Say",
    subtitle: "Read reviews from our satisfied customers",
    selectedReviews: mockReviews.slice(0, 3).map((review) => review.id),
  },
};

const WidgetCreator: React.FC<WidgetCreatorProps> = ({
  onSave = () => {},
  initialConfig = defaultConfig,
  isOpen = true,
}) => {
  const [activeTab, setActiveTab] = useState("design");
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>(initialConfig);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  const handleTypeChange = (value: string) => {
    setWidgetConfig((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleThemeChange = (value: string) => {
    setWidgetConfig((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: value,
      },
    }));
  };

  const handleToggleChange = (key: "showRating" | "showPlatform") => {
    setWidgetConfig((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: !prev.appearance[key],
      },
    }));
  };

  const handleMaxReviewsChange = (value: string) => {
    setWidgetConfig((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        maxReviews: parseInt(value) || 1,
      },
    }));
  };

  const handleContentChange = (key: "title" | "subtitle", value: string) => {
    setWidgetConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }));
  };

  const toggleReviewSelection = (reviewId: string) => {
    setWidgetConfig((prev) => {
      const selectedReviews = [...prev.content.selectedReviews];
      const index = selectedReviews.indexOf(reviewId);

      if (index > -1) {
        selectedReviews.splice(index, 1);
      } else {
        selectedReviews.push(reviewId);
      }

      return {
        ...prev,
        content: {
          ...prev.content,
          selectedReviews,
        },
      };
    });
  };

  const generateWidgetCode = () => {
    // This would generate the actual embed code in a real implementation
    return `<div class="review-widget" data-widget-id="${Date.now()}">
  <script src="https://example.com/widgets/embed.js"></script>
  <script>
    ReviewWidget.init({
      type: "${widgetConfig.type}",
      appearance: ${JSON.stringify(widgetConfig.appearance)},
      content: ${JSON.stringify(widgetConfig.content)}
    });
  </script>
</div>`;
  };

  const copyToClipboard = () => {
    // In a real implementation, this would copy the code to clipboard
    alert("Code copied to clipboard!");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Widget Creator</CardTitle>
        <CardDescription>
          Create customizable review widgets to embed on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reviews">Select Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Widget Type</h3>
                  <Select
                    value={widgetConfig.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select widget type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="slider">Slider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Theme</h3>
                  <Select
                    value={widgetConfig.appearance.theme}
                    onValueChange={handleThemeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="colorful">Colorful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Maximum Reviews to Display
                  </h3>
                  <Select
                    value={widgetConfig.appearance.maxReviews.toString()}
                    onValueChange={handleMaxReviewsChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of reviews" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 5, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Show Star Ratings</h3>
                    <p className="text-xs text-muted-foreground">
                      Display star ratings with each review
                    </p>
                  </div>
                  <Switch
                    checked={widgetConfig.appearance.showRating}
                    onCheckedChange={() => handleToggleChange("showRating")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Show Platform Icons</h3>
                    <p className="text-xs text-muted-foreground">
                      Display the source platform (Google, Yelp, etc.)
                    </p>
                  </div>
                  <Switch
                    checked={widgetConfig.appearance.showPlatform}
                    onCheckedChange={() => handleToggleChange("showPlatform")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Widget Title</h3>
                <Input
                  value={widgetConfig.content.title}
                  onChange={(e) => handleContentChange("title", e.target.value)}
                  placeholder="Enter widget title"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Widget Subtitle</h3>
                <Textarea
                  value={widgetConfig.content.subtitle}
                  onChange={(e) =>
                    handleContentChange("subtitle", e.target.value)
                  }
                  placeholder="Enter widget subtitle or description"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Select Reviews to Display
                </h3>
                <p className="text-xs text-muted-foreground">
                  {widgetConfig.content.selectedReviews.length} selected
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-colors ${widgetConfig.content.selectedReviews.includes(review.id) ? "border-primary bg-primary/5" : "border-border"}`}
                    onClick={() => toggleReviewSelection(review.id)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={review.customer_avatar}
                        alt={review.customer_name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.customer_name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-medium text-muted-foreground">
                            {review.platform}
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mt-1 line-clamp-2">
                        {review.content}
                      </p>
                    </div>
                    {widgetConfig.content.selectedReviews.includes(
                      review.id,
                    ) && (
                      <div className="flex-shrink-0 text-primary">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview Widget</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCodeOpen(true)}
                >
                  <Code size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get Embed Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => onSave(widgetConfig)}>Save Widget</Button>
        </div>
      </CardFooter>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Widget Preview</DialogTitle>
            <DialogDescription>
              This is how your widget will appear on your website
            </DialogDescription>
          </DialogHeader>

          <div
            className={`p-6 rounded-lg border ${widgetConfig.appearance.theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">
                {widgetConfig.content.title}
              </h3>
              <p className="text-sm mt-1">{widgetConfig.content.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockReviews
                .filter((review) =>
                  widgetConfig.content.selectedReviews.includes(review.id),
                )
                .slice(0, widgetConfig.appearance.maxReviews)
                .map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={review.customer_avatar}
                        alt={review.customer_name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">{review.customer_name}</h4>
                        <div className="flex items-center gap-2">
                          {widgetConfig.appearance.showPlatform && (
                            <span className="text-xs uppercase font-medium opacity-70">
                              {review.platform}
                            </span>
                          )}
                          {widgetConfig.appearance.showRating && (
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{review.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Code Dialog */}
      <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Embed Code</DialogTitle>
            <DialogDescription>
              Copy and paste this code into your website to display the widget
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
              <code>{generateWidgetCode()}</code>
            </pre>
          </div>

          <DialogFooter>
            <Button onClick={copyToClipboard} className="gap-2">
              <Copy size={16} />
              Copy Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WidgetCreator;

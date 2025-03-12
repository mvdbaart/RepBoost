import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Save, Eye, Layout, Type, Image, Check } from "lucide-react";

interface LandingPageEditorProps {
  initialPageData?: {
    title: string;
    description: string;
    headerImage: string;
    buttonText: string;
    thankYouMessage: string;
    showLogo: boolean;
    showRatings: boolean;
    customCSS: string;
  };
}

const LandingPageEditor = ({
  initialPageData = {
    title: "Share Your Experience With Us",
    description:
      "We value your feedback! Please take a moment to share your experience with our products/services.",
    headerImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    buttonText: "Submit Review",
    thankYouMessage:
      "Thank you for your feedback! Your review helps us improve our service.",
    showLogo: true,
    showRatings: true,
    customCSS: "/* Add your custom CSS here */",
  },
}: LandingPageEditorProps) => {
  const [pageData, setPageData] = useState(initialPageData);
  const [activeTab, setActiveTab] = useState("design");
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPageData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    // In a real implementation, this would save to a backend
    alert("Landing page settings saved!");
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Landing Page Editor</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            {previewMode ? <Pencil size={16} /> : <Eye size={16} />}
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="border rounded-lg p-6 bg-white">
          <div className="max-w-2xl mx-auto">
            {pageData.headerImage && (
              <div className="mb-6">
                <img
                  src={pageData.headerImage}
                  alt="Header"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            {pageData.showLogo && (
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Logo</span>
                </div>
              </div>
            )}
            <h2 className="text-2xl font-bold text-center mb-4">
              {pageData.title}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {pageData.description}
            </p>

            {pageData.showRatings && (
              <div className="mb-6">
                <p className="text-center mb-2">
                  How would you rate your experience?
                </p>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button className="px-8">{pageData.buttonText}</Button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-center text-sm text-gray-500">
                {pageData.thankYouMessage}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Layout size={16} />
              Design
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type size={16} />
              Content
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Pencil size={16} />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visual Elements</CardTitle>
                <CardDescription>
                  Customize the visual appearance of your landing page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headerImage">Header Image URL</Label>
                  <Input
                    id="headerImage"
                    name="headerImage"
                    value={pageData.headerImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {pageData.headerImage && (
                    <div className="mt-2">
                      <img
                        src={pageData.headerImage}
                        alt="Header preview"
                        className="h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showLogo"
                    checked={pageData.showLogo}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("showLogo", checked)
                    }
                  />
                  <Label htmlFor="showLogo">Show Company Logo</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showRatings"
                    checked={pageData.showRatings}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("showRatings", checked)
                    }
                  />
                  <Label htmlFor="showRatings">Show Rating Selection</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>
                  Edit the text content of your landing page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={pageData.title}
                    onChange={handleInputChange}
                    placeholder="Share Your Experience"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={pageData.description}
                    onChange={handleInputChange}
                    placeholder="We value your feedback..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    value={pageData.buttonText}
                    onChange={handleInputChange}
                    placeholder="Submit Review"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thankYouMessage">Thank You Message</Label>
                  <Textarea
                    id="thankYouMessage"
                    name="thankYouMessage"
                    value={pageData.thankYouMessage}
                    onChange={handleInputChange}
                    placeholder="Thank you for your feedback!"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Customize advanced settings for your landing page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS</Label>
                  <Textarea
                    id="customCSS"
                    name="customCSS"
                    value={pageData.customCSS}
                    onChange={handleInputChange}
                    placeholder="/* Add your custom CSS here */"
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Custom CSS will be applied to your landing page. Use with
                  caution.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default LandingPageEditor;

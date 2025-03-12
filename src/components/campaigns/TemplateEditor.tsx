import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Bold,
  Italic,
  Link,
  List,
  Mail,
  MessageSquare,
  Phone,
  Save,
  Smartphone,
  Undo,
} from "lucide-react";

interface TemplateEditorProps {
  onSave?: (template: Template) => void;
  initialTemplate?: Template;
  channelType?: "email" | "sms" | "whatsapp";
}

interface Template {
  id?: string;
  name: string;
  subject?: string;
  content: string;
  channelType: "email" | "sms" | "whatsapp";
  includeRatingButtons?: boolean;
  includeReviewLink?: boolean;
  previewText?: string;
}

const TemplateEditor = ({
  onSave = () => {},
  initialTemplate = {
    name: "New Template",
    content:
      "Hi [Customer Name],\n\nThank you for choosing [Business Name]. We would love to hear about your experience with us!\n\nPlease take a moment to leave us a review.\n\nThank you,\n[Business Name] Team",
    channelType: "email",
    subject: "We value your feedback!",
    includeRatingButtons: true,
    includeReviewLink: true,
    previewText: "Please share your experience with us",
  },
  channelType = "email",
}: TemplateEditorProps) => {
  const [template, setTemplate] = useState<Template>({
    ...initialTemplate,
    channelType: channelType || initialTemplate.channelType,
  });

  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate({ ...template, content: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemplate({ ...template, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setTemplate({ ...template, [name]: checked });
  };

  const handleChannelChange = (value: "email" | "sms" | "whatsapp") => {
    setTemplate({ ...template, channelType: value });
  };

  const handleSave = () => {
    onSave(template);
  };

  const formatPreview = (content: string) => {
    // Replace placeholders with example values
    return content
      .replace(/\[Customer Name\]/g, "John Smith")
      .replace(/\[Business Name\]/g, "Acme Inc.")
      .replace(/\n/g, "<br />");
  };

  const renderChannelIcon = () => {
    switch (template.channelType) {
      case "email":
        return <Mail className="h-5 w-5" />;
      case "sms":
        return <Phone className="h-5 w-5" />;
      case "whatsapp":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <Tabs defaultValue="edit" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {renderChannelIcon()}
            <h2 className="text-2xl font-semibold">Template Editor</h2>
          </div>
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
              <CardDescription>
                Create or edit your template for sending review requests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={template.name}
                    onChange={handleInputChange}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channelType">Channel Type</Label>
                  <Select
                    value={template.channelType}
                    onValueChange={(value: any) => handleChannelChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {template.channelType === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={template.subject || ""}
                    onChange={handleInputChange}
                    placeholder="Enter email subject"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="content">Message Content</Label>
                  <div className="flex space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bold</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Italic</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Link className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Insert Link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bullet List</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <Textarea
                  id="content"
                  value={template.content}
                  onChange={handleContentChange}
                  placeholder="Enter your message content here"
                  className="min-h-[200px]"
                />
                <p className="text-sm text-gray-500">
                  Use [Customer Name] and [Business Name] as placeholders that
                  will be replaced with actual values.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Undo className="h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>
                This is how your template will appear to recipients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-gray-50">
                {template.channelType === "email" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        From: Your Business &lt;reviews@yourbusiness.com&gt;
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        To: John Smith &lt;john@example.com&gt;
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        Subject: {template.subject}
                      </p>
                    </div>
                    <Separator />
                    <div className="prose max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatPreview(template.content),
                        }}
                      />

                      {template.includeRatingButtons && (
                        <div className="my-4 flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant="outline"
                              className="h-10 w-10"
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                      )}

                      {template.includeReviewLink && (
                        <div className="my-4">
                          <Button className="w-full sm:w-auto">
                            Leave a Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {template.channelType === "sms" && (
                  <div className="max-w-xs mx-auto bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Smartphone className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-xs text-blue-500 mb-1">
                          SMS Message
                        </p>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            {formatPreview(template.content).replace(
                              /<br \/>/g,
                              " ",
                            )}
                            {template.includeReviewLink && (
                              <span className="text-blue-500 block mt-2">
                                https://review.example.com/abc123
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {template.channelType === "whatsapp" && (
                  <div className="max-w-xs mx-auto bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-xs text-green-500 mb-1">
                          WhatsApp Message
                        </p>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            {formatPreview(template.content).replace(
                              /<br \/>/g,
                              " ",
                            )}
                            {template.includeReviewLink && (
                              <span className="text-blue-500 block mt-2">
                                https://review.example.com/abc123
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
              <CardDescription>
                Configure additional options for your template.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="includeRatingButtons">
                    Include Rating Buttons
                  </Label>
                  <p className="text-sm text-gray-500">
                    Add clickable rating buttons (1-5 stars) to your email
                    template.
                  </p>
                </div>
                <Switch
                  id="includeRatingButtons"
                  checked={template.includeRatingButtons || false}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("includeRatingButtons", checked)
                  }
                  disabled={template.channelType !== "email"}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="includeReviewLink">Include Review Link</Label>
                  <p className="text-sm text-gray-500">
                    Add a direct link to your review collection page.
                  </p>
                </div>
                <Switch
                  id="includeReviewLink"
                  checked={template.includeReviewLink || false}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("includeReviewLink", checked)
                  }
                />
              </div>
              {template.channelType === "email" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="previewText">Email Preview Text</Label>
                    <Input
                      id="previewText"
                      name="previewText"
                      value={template.previewText || ""}
                      onChange={handleInputChange}
                      placeholder="Brief preview text shown in email clients"
                    />
                    <p className="text-sm text-gray-500">
                      This text appears in the inbox preview of most email
                      clients.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateEditor;

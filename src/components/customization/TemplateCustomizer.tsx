import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  Code,
  Save,
  Undo,
} from "lucide-react";

interface TemplateEditorProps {
  template?: {
    id: string;
    name: string;
    type: "email" | "sms" | "whatsapp";
    subject?: string;
    content: string;
    variables: string[];
  };
  onSave?: (template: any) => void;
}

const TemplateEditor = ({
  template = {
    id: "template-1",
    name: "Welcome Review Request",
    type: "email",
    subject: "We value your feedback!",
    content:
      "Hi {{customerName}},\n\nThank you for choosing {{businessName}}. We would love to hear about your experience.\n\nPlease take a moment to leave us a review: {{reviewLink}}\n\nThank you,\n{{businessName}} Team",
    variables: ["customerName", "businessName", "reviewLink"],
  },
  onSave = () => console.log("Template saved"),
}: TemplateEditorProps) => {
  const [activeTemplate, setActiveTemplate] = useState(template);
  const [activeTab, setActiveTab] = useState("edit");
  const [previewData, setPreviewData] = useState({
    customerName: "John Doe",
    businessName: "Acme Inc",
    reviewLink: "https://review.example.com/acme",
  });

  const handleContentChange = (content: string) => {
    setActiveTemplate({ ...activeTemplate, content });
  };

  const handleNameChange = (name: string) => {
    setActiveTemplate({ ...activeTemplate, name });
  };

  const handleSubjectChange = (subject: string) => {
    setActiveTemplate({ ...activeTemplate, subject });
  };

  const handleTypeChange = (type: "email" | "sms" | "whatsapp") => {
    setActiveTemplate({ ...activeTemplate, type });
  };

  const getPreviewContent = () => {
    let content = activeTemplate.content;
    activeTemplate.variables.forEach((variable) => {
      const value =
        previewData[variable as keyof typeof previewData] || `{{${variable}}}`;
      content = content.replace(new RegExp(`{{${variable}}}`, "g"), value);
    });
    return content;
  };

  const getTemplateIcon = () => {
    switch (activeTemplate.type) {
      case "email":
        return <Mail className="h-5 w-5" />;
      case "sms":
        return <Smartphone className="h-5 w-5" />;
      case "whatsapp":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {getTemplateIcon()}
          <Input
            value={activeTemplate.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="font-semibold text-lg w-64"
          />
        </div>
        <div className="flex gap-2">
          <Select value={activeTemplate.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Template Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => onSave(activeTemplate)}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="edit">
            <Code className="h-4 w-4 mr-2" />
            Edit Template
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
          {activeTemplate.type === "email" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Subject Line
              </label>
              <Input
                value={activeTemplate.subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                placeholder="Enter subject line"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Template Content
            </label>
            <Textarea
              value={activeTemplate.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter template content"
              className="min-h-[300px] font-mono"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Available Variables</h3>
            <div className="flex flex-wrap gap-2">
              {activeTemplate.variables.map((variable) => (
                <div
                  key={variable}
                  className="bg-muted px-3 py-1 rounded-md text-sm"
                >
                  {`{{${variable}}}`}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your template will appear to recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTemplate.type === "email" && (
                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Subject:</div>
                  <div className="p-3 bg-muted rounded-md">
                    {activeTemplate.subject}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium mb-1">Content:</div>
                <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                  {getPreviewContent()}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Template Type:{" "}
                {activeTemplate.type.charAt(0).toUpperCase() +
                  activeTemplate.type.slice(1)}
              </div>
              <Button variant="outline" onClick={() => setActiveTab("edit")}>
                <Undo className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
            </CardFooter>
          </Card>

          <div>
            <h3 className="text-sm font-medium mb-2">Preview Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTemplate.variables.map((variable) => (
                <div key={variable} className="space-y-1">
                  <label className="text-sm font-medium">{variable}</label>
                  <Input
                    value={
                      previewData[variable as keyof typeof previewData] || ""
                    }
                    onChange={(e) =>
                      setPreviewData({
                        ...previewData,
                        [variable]: e.target.value,
                      })
                    }
                    placeholder={`Enter ${variable}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateEditor;

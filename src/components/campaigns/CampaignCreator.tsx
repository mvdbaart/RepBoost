import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MessageSquare, Calendar, Check, ChevronRight } from "lucide-react";

import * as Card from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

type CampaignData = {
  name: string;
  channel: string;
  template: string;
  schedule: {
    date: string;
    time: string;
    recurring: boolean;
  };
  audience: string;
};

interface CampaignCreatorProps {
  onSave?: (data: CampaignData) => void;
  onCancel?: () => void;
  initialData?: CampaignData;
}

const CampaignCreator = ({ 
  onSave = () => {}, 
  onCancel = () => {}, 
  initialData 
}: CampaignCreatorProps) => {
  const [currentStep, setCurrentStep] = useState<string>("channel");
  const [selectedChannel, setSelectedChannel] = useState<string>(initialData?.channel || "email");
  
  const form = useForm<CampaignData>({
    defaultValues: initialData || {
      name: "New Review Collection Campaign",
      channel: "email",
      template: "",
      schedule: {
        date: "",
        time: "",
        recurring: false
      },
      audience: "all-customers"
    }
  });

  const handleNext = () => {
    if (currentStep === "channel") setCurrentStep("template");
    else if (currentStep === "template") setCurrentStep("schedule");
    else if (currentStep === "schedule") setCurrentStep("review");
    else if (currentStep === "review") handleSave();
  };

  const handleBack = () => {
    if (currentStep === "template") setCurrentStep("channel");
    else if (currentStep === "schedule") setCurrentStep("template");
    else if (currentStep === "review") setCurrentStep("schedule");
  };

  const handleSave = () => {
    onSave(form.getValues());
  };

  return (
    <Card.Card className="w-full max-w-4xl mx-auto bg-white">
      <Card.CardHeader>
        <Card.CardTitle>Create Review Collection Campaign</Card.CardTitle>
        <Card.CardDescription>
          Set up a campaign to automatically request reviews from your customers
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent>
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="channel" disabled={currentStep !== "channel" && currentStep !== "review"}>Channel</TabsTrigger>
            <TabsTrigger value="template" disabled={currentStep !== "template" && currentStep !== "review" && currentStep !== "channel"}>Template</TabsTrigger>
            <TabsTrigger value="schedule" disabled={currentStep !== "schedule" && currentStep !== "review" && currentStep !== "template"}>Schedule</TabsTrigger>
            <TabsTrigger value="review" disabled={currentStep !== "review" && currentStep !== "schedule"}>Review</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <TabsContent value="channel" className="space-y-4">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter campaign name" {...field} />
                      </FormControl>
                      <FormDescription>Give your campaign a descriptive name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card.Card 
                    className={`cursor-pointer border-2 ${selectedChannel === "email" ? "border-primary" : "border-border"}`}
                    onClick={() => {
                      setSelectedChannel("email");
                      form.setValue("channel", "email");
                    }}
                  >
                    <Card.CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Mail className="h-10 w-10 mb-4 text-primary" />
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground mt-2">Send review requests via email</p>
                      {selectedChannel === "email" && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </Card.CardContent>
                  </Card.Card>
                  
                  <Card.Card 
                    className={`cursor-pointer border-2 ${selectedChannel === "sms" ? "border-primary" : "border-border"}`}
                    onClick={() => {
                      setSelectedChannel("sms");
                      form.setValue("channel", "sms");
                    }}
                  >
                    <Card.CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <MessageSquare className="h-10 w-10 mb-4 text-primary" />
                      <h3 className="font-medium">SMS</h3>
                      <p className="text-sm text-muted-foreground mt-2">Send review requests via text message</p>
                      {selectedChannel === "sms" && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </Card.CardContent>
                  </Card.Card>
                  
                  <Card.Card 
                    className={`cursor-pointer border-2 ${selectedChannel === "whatsapp" ? "border-primary" : "border-border"}`}
                    onClick={() => {
                      setSelectedChannel("whatsapp");
                      form.setValue("channel", "whatsapp");
                    }}
                  >
                    <Card.CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <MessageSquare className="h-10 w-10 mb-4 text-primary" />
                      <h3 className="font-medium">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mt-2">Send review requests via WhatsApp</p>
                      {selectedChannel === "whatsapp" && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </Card.CardContent>
                  </Card.Card>
                </div>
                
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all-customers">All Customers</SelectItem>
                          <SelectItem value="recent-customers">Recent Customers (Last 30 days)</SelectItem>
                          <SelectItem value="repeat-customers">Repeat Customers</SelectItem>
                          <SelectItem value="custom-segment">Custom Segment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose which customers will receive review requests</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Template</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your review request message" 
                          className="min-h-[200px]" 
                          {...field} 
                          defaultValue={`Hi {{customer.firstName}},

Thank you for choosing {{business.name}}! We hope you enjoyed your experience with us.

Would you mind taking a moment to share your feedback? Your review helps us improve and helps others discover our business.

{{review.link}}

Thank you!
{{business.name}} Team`}
                        />
                      </FormControl>
                      <FormDescription>
                        Customize your message. Use placeholders like {{customer.firstName}} for personalization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="bg-background p-4 rounded-md whitespace-pre-line">
                    {form.watch("template") ? form.watch("template")
                      .replace("{{customer.firstName}}", "John")
                      .replace(/{{business.name}}/g, "Your Business")
                      .replace("{{review.link}}", "https://review.yourbusiness.com/leave-review")
                      : "Preview will appear here"}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="schedule.date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>When to start sending review requests</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="schedule.time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>What time to send review requests</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="schedule.recurring"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Recurring Campaign</FormLabel>
                        <FormDescription>
                          Automatically send review requests to new customers
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <Card.Card>
                <Card.CardHeader>
                  <Card.CardTitle>Campaign Summary</Card.CardTitle>
                  <Card.CardDescription>Review your campaign details before launching</Card.CardDescription>
                </Card.CardHeader>
                <Card.CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Campaign Name</h3>
                      <p className="text-base">{form.watch("name")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Channel</h3>
                      <p className="text-base capitalize">{form.watch("channel")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Audience</h3>
                      <p className="text-base capitalize">{form.watch("audience").replace("-", " ")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Schedule</h3>
                      <p className="text-base">
                        {form.watch("schedule.date") ? new Date(form.watch("schedule.date")).toLocaleDateString() : "Not set"} at {form.watch("schedule.time") || "Not set"}
                        {form.watch("schedule.recurring") ? " (Recurring)" : ""}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Message Template</h3>
                    <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                      {form.watch("template")}
                    </div>
                  </div>
                </Card.CardContent>
              </Card.Card>
            </TabsContent>
          </Form>
        </Tabs>
      </Card.CardContent>
      <Card.CardFooter className="flex justify-between">
        {currentStep !== "channel" ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        <Button onClick={handleNext}>
          {currentStep === "review" ? "Launch Campaign" : "Next"}
          {currentStep !== "review" && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </Card.CardFooter>
    </Card.Card>
  );
};

export default CampaignCreator;
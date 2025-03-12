import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Calendar, Filter } from "lucide-react";
import ActiveCampaigns from "./ActiveCampaigns";
import CampaignCreator from "./CampaignCreator";
import TemplateEditor from "./TemplateEditor";

interface CampaignManagerProps {
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdated?: string;
}

const CampaignManager = ({
  onRefresh = () => console.log("Refresh clicked"),
  isLoading = false,
  lastUpdated = "Today at 12:45 PM",
}: CampaignManagerProps) => {
  const [activeTab, setActiveTab] = useState("active");
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const handleCreateCampaign = () => {
    setShowCampaignCreator(true);
  };

  const handleCreateTemplate = () => {
    setShowTemplateEditor(true);
  };

  const handleCampaignSave = (campaignData: any) => {
    console.log("Campaign saved:", campaignData);
    setShowCampaignCreator(false);
    // In a real implementation, this would save the campaign to the backend
  };

  const handleTemplateSave = (templateData: any) => {
    console.log("Template saved:", templateData);
    setShowTemplateEditor(false);
    // In a real implementation, this would save the template to the backend
  };

  const handleCampaignCancel = () => {
    setShowCampaignCreator(false);
  };

  const handleTemplateCancel = () => {
    setShowTemplateEditor(false);
  };

  if (showCampaignCreator) {
    return (
      <CampaignCreator
        onSave={handleCampaignSave}
        onCancel={handleCampaignCancel}
      />
    );
  }

  if (showTemplateEditor) {
    return (
      <TemplateEditor
        onSave={handleTemplateSave}
        onCancel={handleTemplateCancel}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gray-50">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">
              Campaign Manager
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage review collection campaigns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              onClick={handleCreateCampaign}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Campaign</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Last updated: {lastUpdated}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="active">Active Campaigns</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
                {activeTab === "templates" && (
                  <Button
                    size="sm"
                    onClick={handleCreateTemplate}
                    className="flex items-center gap-1"
                  >
                    <Plus size={16} />
                    <span>New Template</span>
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="active">
              <ActiveCampaigns
                campaigns={[
                  {
                    id: "1",
                    name: "Post-Purchase Follow-up",
                    status: "active",
                    channel: "email",
                    sent_count: 245,
                    opened_count: 189,
                    responded_count: 42,
                    start_date: new Date(
                      Date.now() - 30 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    created_at: new Date(
                      Date.now() - 30 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    updated_at: new Date(
                      Date.now() - 2 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                  },
                  {
                    id: "3",
                    name: "Loyalty Program",
                    status: "paused",
                    channel: "whatsapp",
                    sent_count: 120,
                    opened_count: 98,
                    responded_count: 24,
                    start_date: new Date(
                      Date.now() - 15 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    created_at: new Date(
                      Date.now() - 15 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    updated_at: new Date(
                      Date.now() - 1 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                  },
                ]}
                onEdit={(id) => console.log(`Edit campaign ${id}`)}
                onDuplicate={(id) => console.log(`Duplicate campaign ${id}`)}
                onDelete={(id) => console.log(`Delete campaign ${id}`)}
                onToggleStatus={(id, status) =>
                  console.log(`Toggle status for ${id} from ${status}`)
                }
              />
            </TabsContent>

            <TabsContent value="scheduled">
              <ActiveCampaigns
                campaigns={[
                  {
                    id: "2",
                    name: "Service Feedback",
                    status: "scheduled",
                    channel: "sms",
                    sent_count: 0,
                    opened_count: 0,
                    responded_count: 0,
                    start_date: new Date(
                      Date.now() + 1 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    created_at: new Date(
                      Date.now() - 5 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    updated_at: new Date(
                      Date.now() - 5 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                  },
                ]}
                onEdit={(id) => console.log(`Edit campaign ${id}`)}
                onDuplicate={(id) => console.log(`Duplicate campaign ${id}`)}
                onDelete={(id) => console.log(`Delete campaign ${id}`)}
                onToggleStatus={(id, status) =>
                  console.log(`Toggle status for ${id} from ${status}`)
                }
              />
            </TabsContent>

            <TabsContent value="completed">
              <ActiveCampaigns
                campaigns={[
                  {
                    id: "4",
                    name: "Holiday Special",
                    status: "completed",
                    channel: "email",
                    sent_count: 500,
                    opened_count: 425,
                    responded_count: 87,
                    start_date: new Date(
                      Date.now() - 60 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    created_at: new Date(
                      Date.now() - 70 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                    updated_at: new Date(
                      Date.now() - 30 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                  },
                ]}
                onEdit={(id) => console.log(`Edit campaign ${id}`)}
                onDuplicate={(id) => console.log(`Duplicate campaign ${id}`)}
                onDelete={(id) => console.log(`Delete campaign ${id}`)}
                onToggleStatus={(id, status) =>
                  console.log(`Toggle status for ${id} from ${status}`)
                }
              />
            </TabsContent>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "1",
                    name: "Post-Purchase Follow-up",
                    type: "email",
                    lastUsed: "2 days ago",
                    description:
                      "Standard template for requesting reviews after purchase",
                  },
                  {
                    id: "2",
                    name: "Service Feedback",
                    type: "sms",
                    lastUsed: "1 week ago",
                    description:
                      "Short message for requesting feedback after service",
                  },
                  {
                    id: "3",
                    name: "Loyalty Program",
                    type: "whatsapp",
                    lastUsed: "1 month ago",
                    description:
                      "Template for loyal customers with special offers",
                  },
                ].map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {template.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Last used: {template.lastUsed}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCreateTemplate()}
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManager;

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  PieChart,
  Plus,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "scheduled" | "completed";
  channel: "email" | "sms" | "whatsapp";
  sent: number;
  opened: number;
  responded: number;
  progress: number;
  lastUpdated: string;
}

interface CampaignStatusProps {
  campaigns?: Campaign[];
  onCreateCampaign?: () => void;
  onViewCampaign?: (id: string) => void;
}

const CampaignStatus = ({
  campaigns = [
    {
      id: "1",
      name: "Post-Purchase Follow-up",
      status: "active",
      channel: "email",
      sent: 245,
      opened: 189,
      responded: 42,
      progress: 65,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Service Feedback",
      status: "scheduled",
      channel: "sms",
      sent: 0,
      opened: 0,
      responded: 0,
      progress: 0,
      lastUpdated: "Starts tomorrow",
    },
    {
      id: "3",
      name: "Loyalty Program",
      status: "paused",
      channel: "whatsapp",
      sent: 120,
      opened: 98,
      responded: 24,
      progress: 30,
      lastUpdated: "Paused yesterday",
    },
  ],
  onCreateCampaign = () => {},
  onViewCampaign = () => {},
}: CampaignStatusProps) => {
  const getChannelIcon = (channel: Campaign["channel"]) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "whatsapp":
        return <Phone className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-amber-100 text-amber-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Campaign Status</CardTitle>
          <CardDescription>Active review collection campaigns</CardDescription>
        </div>
        <Button
          onClick={onCreateCampaign}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </CardHeader>
      <CardContent className="px-6 overflow-auto max-h-[320px]">
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <BarChart className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">No active campaigns</p>
            <p className="text-gray-400 text-sm mt-1">
              Create a campaign to start collecting reviews
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => onViewCampaign(campaign.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {campaign.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(campaign.status)} border-0`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 gap-1">
                        {getChannelIcon(campaign.channel)}
                        <span>
                          {campaign.channel.charAt(0).toUpperCase() +
                            campaign.channel.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{campaign.lastUpdated}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-1.5" />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center">
                    <p className="text-sm font-medium">{campaign.sent}</p>
                    <p className="text-xs text-gray-500">Sent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{campaign.opened}</p>
                    <p className="text-xs text-gray-500">Opened</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{campaign.responded}</p>
                    <p className="text-xs text-gray-500">Responded</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center gap-2">
          <PieChart className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Campaign analytics</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-sm"
        >
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignStatus;

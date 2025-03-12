import React, { useState } from "react";
import { format } from "date-fns";
import {
  Play,
  Pause,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Calendar,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the campaign type
interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "scheduled" | "completed";
  channel: "email" | "sms" | "whatsapp";
  sent_count: number;
  opened_count: number;
  responded_count: number;
  start_date: string;
  created_at: string;
  updated_at: string;
}

interface ActiveCampaignsProps {
  campaigns?: Campaign[];
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string, currentStatus: string) => void;
}

const ActiveCampaigns = ({
  campaigns = [
    {
      id: "1",
      name: "Post-Purchase Follow-up",
      status: "active",
      channel: "email",
      sent_count: 245,
      opened_count: 189,
      responded_count: 42,
      start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      name: "Service Feedback",
      status: "scheduled",
      channel: "sms",
      sent_count: 0,
      opened_count: 0,
      responded_count: 0,
      start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      name: "Loyalty Program",
      status: "paused",
      channel: "whatsapp",
      sent_count: 120,
      opened_count: 98,
      responded_count: 24,
      start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  onEdit = () => {},
  onDuplicate = () => {},
  onDelete = () => {},
  onToggleStatus = () => {},
}: ActiveCampaignsProps) => {
  // Function to get the appropriate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "scheduled":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Scheduled
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="text-gray-500">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to get the channel icon
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4 mr-2" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case "whatsapp":
        return <Phone className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  // Calculate response rate
  const calculateResponseRate = (sent: number, responded: number) => {
    if (sent === 0) return "0%";
    return `${Math.round((responded / sent) * 100)}%`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Active Campaigns</h2>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>Response Rate</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getChannelIcon(campaign.channel)}
                    <span className="capitalize">{campaign.channel}</span>
                  </div>
                </TableCell>
                <TableCell>{campaign.sent_count}</TableCell>
                <TableCell>{campaign.opened_count}</TableCell>
                <TableCell>
                  {calculateResponseRate(
                    campaign.sent_count,
                    campaign.responded_count,
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(campaign.start_date), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    {campaign.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onToggleStatus(campaign.id, campaign.status)
                        }
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : campaign.status === "paused" ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onToggleStatus(campaign.id, campaign.status)
                        }
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : null}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(campaign.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDuplicate(campaign.id)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(campaign.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {campaigns.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No active campaigns found. Create a new campaign to get
                  started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActiveCampaigns;

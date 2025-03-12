import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle, RefreshCw, ExternalLink } from "lucide-react";

interface ConnectionCardProps {
  platformName?: string;
  platformLogo?: string;
  isConnected?: boolean;
  lastSynced?: string;
  reviewCount?: number;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSync?: () => void;
}

const ConnectionCard = ({
  platformName = "Google Reviews",
  platformLogo = "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
  isConnected = false,
  lastSynced = "Never",
  reviewCount = 0,
  onConnect = () => {},
  onDisconnect = () => {},
  onSync = () => {},
}: ConnectionCardProps) => {
  return (
    <Card className="w-full max-w-md bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-3">
          <img
            src={platformLogo}
            alt={`${platformName} logo`}
            className="w-10 h-10 rounded-md"
          />
          <div>
            <CardTitle className="text-lg">{platformName}</CardTitle>
            <CardDescription>
              {isConnected ? (
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                  <span>Not connected</span>
                </div>
              )}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center">
          <Switch
            checked={isConnected}
            onCheckedChange={isConnected ? onDisconnect : onConnect}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Last synced</span>
            <span className="text-sm font-medium">{lastSynced}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Reviews collected</span>
            <Badge variant="secondary" className="font-medium">
              {reviewCount}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={onSync}
          disabled={!isConnected}
        >
          <RefreshCw className="mr-1 h-3.5 w-3.5" />
          Sync now
        </Button>

        <Button variant="ghost" size="sm" className="text-xs" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1 h-3.5 w-3.5" />
            View platform
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;

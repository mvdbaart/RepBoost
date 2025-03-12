import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Download, FileText, Mail, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReportExportProps {
  onExport?: (format: string) => void;
  onSchedule?: (schedule: ScheduleConfig) => void;
  exportFormats?: string[];
}

interface ScheduleConfig {
  frequency: string;
  recipients: string[];
  startDate: Date;
  format: string;
}

const ReportExport = ({
  onExport = () => {},
  onSchedule = () => {},
  exportFormats = ["PDF", "CSV", "Excel"],
}: ReportExportProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduleOpen, setScheduleOpen] = useState(true);
  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>({
    frequency: "weekly",
    recipients: ["team@example.com"],
    startDate: new Date(),
    format: "PDF",
  });

  const handleExport = (format: string) => {
    onExport(format);
  };

  const handleScheduleSubmit = () => {
    onSchedule(scheduleConfig);
    setScheduleOpen(false);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Export
        </CardTitle>
        <CardDescription>
          Export analytics reports or schedule regular deliveries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Export Now</h3>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {exportFormats.map((format) => (
                    <DropdownMenuItem
                      key={format}
                      onClick={() => handleExport(format)}
                    >
                      {format === "PDF" && (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      {format === "CSV" && (
                        <BarChart className="mr-2 h-4 w-4" />
                      )}
                      {format === "Excel" && (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      Export as {format}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Schedule Reports</h3>
            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Schedule Regular Reports
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Report Delivery</DialogTitle>
                  <DialogDescription>
                    Configure automatic report delivery to your team
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="frequency"
                      className="text-right text-sm font-medium"
                    >
                      Frequency
                    </label>
                    <div className="col-span-3">
                      <Select
                        value={scheduleConfig.frequency}
                        onValueChange={(value) =>
                          setScheduleConfig({
                            ...scheduleConfig,
                            frequency: value,
                          })
                        }
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="recipients"
                      className="text-right text-sm font-medium"
                    >
                      Recipients
                    </label>
                    <input
                      id="recipients"
                      className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="email@example.com"
                      value={scheduleConfig.recipients.join(", ")}
                      onChange={(e) =>
                        setScheduleConfig({
                          ...scheduleConfig,
                          recipients: e.target.value
                            .split(",")
                            .map((email) => email.trim()),
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="startDate"
                      className="text-right text-sm font-medium"
                    >
                      Start Date
                    </label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="startDate"
                            variant={"outline"}
                            className={
                              "w-full justify-start text-left font-normal"
                            }
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              if (newDate) {
                                setScheduleConfig({
                                  ...scheduleConfig,
                                  startDate: newDate,
                                });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="format"
                      className="text-right text-sm font-medium"
                    >
                      Format
                    </label>
                    <div className="col-span-3">
                      <Select
                        value={scheduleConfig.format}
                        onValueChange={(value) =>
                          setScheduleConfig({
                            ...scheduleConfig,
                            format: value,
                          })
                        }
                      >
                        <SelectTrigger id="format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          {exportFormats.map((format) => (
                            <SelectItem key={format} value={format}>
                              {format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setScheduleOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleScheduleSubmit}>
                    Schedule Reports
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Last export: {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          <FileText className="h-4 w-4" /> View History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportExport;

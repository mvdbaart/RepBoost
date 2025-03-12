import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Smile, Send, AlertCircle, Eye } from "lucide-react";

interface ResponseDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  reviewId?: string;
  reviewPlatform?: string;
  reviewerName?: string;
  initialReviewText?: string;
  onSubmitResponse?: (response: string, reviewId: string) => void;
}

const ResponseDialog = ({
  isOpen = true,
  onOpenChange,
  reviewId = "review-123",
  reviewPlatform = "Google",
  reviewerName = "John Doe",
  initialReviewText = "The service was great but the response time could be improved. Overall a good experience though!",
  onSubmitResponse = () => {},
}: ResponseDialogProps) => {
  const [responseText, setResponseText] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const maxCharCount = 500;

  const handleSubmitResponse = () => {
    onSubmitResponse(responseText, reviewId);
    setResponseText("");
    onOpenChange && onOpenChange(false);
  };

  const charCount = responseText.length;
  const isOverLimit = charCount > maxCharCount;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Respond to {reviewerName}'s review on {reviewPlatform}
          </DialogTitle>
          <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">{initialReviewText}</p>
          </div>
        </DialogHeader>

        <div className="my-4">
          {isPreviewMode ? (
            <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
              <h3 className="text-sm font-medium mb-2">Preview Response:</h3>
              <div className="whitespace-pre-wrap text-sm">
                {responseText || (
                  <span className="text-gray-400 italic">
                    No response drafted yet
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="response" className="text-sm font-medium">
                  Your Response
                </label>
                <span
                  className={`text-xs ${isOverLimit ? "text-red-500 font-bold" : "text-gray-500"}`}
                >
                  {charCount}/{maxCharCount}
                </span>
              </div>
              <Textarea
                id="response"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response here..."
                className={`min-h-[200px] ${isOverLimit ? "border-red-500" : ""}`}
              />
              {isOverLimit && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Character limit exceeded
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-500"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {isPreviewMode ? "Edit" : "Preview"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isPreviewMode
                    ? "Switch to edit mode"
                    : "Preview your response"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-500"
                  onClick={() => setResponseText((prev) => prev + "😊")}
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add emoji</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmitResponse}
            disabled={responseText.trim() === "" || isOverLimit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  SlidersHorizontal,
  Star,
  Calendar as CalendarIcon,
  X,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

interface FilterBarProps {
  onFilterChange?: (filters: FilterOptions) => void;
  onSortChange?: (sort: SortOption) => void;
  initialFilters?: FilterOptions;
  initialSort?: SortOption;
}

interface FilterOptions {
  platforms: string[];
  rating: [number, number];
  dateRange: DateRange | null;
  keyword: string;
}

interface DateRange {
  from: Date;
  to?: Date;
}

type SortOption =
  | "date-desc"
  | "date-asc"
  | "rating-desc"
  | "rating-asc"
  | "platform";

const FilterBar = ({
  onFilterChange = () => {},
  onSortChange = () => {},
  initialFilters = {
    platforms: [],
    rating: [1, 5],
    dateRange: null,
    keyword: "",
  },
  initialSort = "date-desc",
}: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [dateRange, setDateRange] = useState<DateRange | null>(
    initialFilters.dateRange,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const platforms = [
    { id: "google", name: "Google", color: "bg-red-100 text-red-800" },
    { id: "yelp", name: "Yelp", color: "bg-blue-100 text-blue-800" },
    {
      id: "facebook",
      name: "Facebook",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "tripadvisor",
      name: "TripAdvisor",
      color: "bg-green-100 text-green-800",
    },
    { id: "other", name: "Other", color: "bg-gray-100 text-gray-800" },
  ];

  const sortOptions = [
    { value: "date-desc", label: "Newest First" },
    { value: "date-asc", label: "Oldest First" },
    { value: "rating-desc", label: "Highest Rating" },
    { value: "rating-asc", label: "Lowest Rating" },
    { value: "platform", label: "By Platform" },
  ];

  const handlePlatformToggle = (platformId: string) => {
    const updatedPlatforms = filters.platforms.includes(platformId)
      ? filters.platforms.filter((id) => id !== platformId)
      : [...filters.platforms, platformId];

    const newFilters = { ...filters, platforms: updatedPlatforms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      rating: [value[0], value[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (range: DateRange | null) => {
    setDateRange(range);
    if (range?.from) {
      const newFilters = { ...filters, dateRange: range };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, keyword: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const sortValue = value as SortOption;
    setSort(sortValue);
    onSortChange(sortValue);
  };

  const clearFilters = () => {
    const resetFilters = {
      platforms: [],
      rating: [1, 5],
      dateRange: null,
      keyword: "",
    };
    setFilters(resetFilters);
    setDateRange(null);
    onFilterChange(resetFilters);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Select dates";
    if (!dateRange.to) return format(dateRange.from, "MMM d, yyyy");
    return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`;
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.rating[0] > 1 ||
    filters.rating[1] < 5 ||
    !!filters.dateRange ||
    filters.keyword.trim() !== "";

  return (
    <div className="w-full bg-white border-b p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reviews by keyword..."
            className="pl-9 bg-gray-50"
            value={filters.keyword}
            onChange={handleKeywordChange}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Platforms
                {filters.platforms.length > 0 && (
                  <Badge
                    className="ml-2 bg-primary text-white"
                    variant="secondary"
                  >
                    {filters.platforms.length}
                  </Badge>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by platform</h4>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <Badge
                      key={platform.id}
                      variant={
                        filters.platforms.includes(platform.id)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${filters.platforms.includes(platform.id) ? "bg-primary" : platform.color}`}
                      onClick={() => handlePlatformToggle(platform.id)}
                    >
                      {platform.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Rating Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Rating
                {(filters.rating[0] > 1 || filters.rating[1] < 5) && (
                  <Badge
                    className="ml-2 bg-primary text-white"
                    variant="secondary"
                  >
                    {filters.rating[0]}-{filters.rating[1]}★
                  </Badge>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter by rating</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.rating[0], filters.rating[1]]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={handleRatingChange}
                  />
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{filters.rating[0]}</span>
                    </div>
                    <span className="text-xs text-gray-500">to</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{filters.rating[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Date Range Filter */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  <span>{formatDateRange()}</span>
                ) : (
                  <span>Date Range</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange as any}
                onSelect={(range) => {
                  handleDateRangeChange(range as DateRange);
                  if (range?.to) setIsCalendarOpen(false);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Sort Dropdown */}
          <Select defaultValue={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Advanced Filters Button */}
          <Button variant="ghost" size="sm" className="h-9">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Advanced
          </Button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {filters.platforms.map((platformId) => {
            const platform = platforms.find((p) => p.id === platformId);
            return (
              <Badge
                key={platformId}
                variant="secondary"
                className={platform?.color}
              >
                {platform?.name}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => handlePlatformToggle(platformId)}
                />
              </Badge>
            );
          })}
          {(filters.rating[0] > 1 || filters.rating[1] < 5) && (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              {filters.rating[0]}-{filters.rating[1]} Stars
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleRatingChange([1, 5])}
              />
            </Badge>
          )}
          {dateRange?.from && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {formatDateRange()}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleDateRangeChange(null)}
              />
            </Badge>
          )}
          {filters.keyword && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              "{filters.keyword}"
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, keyword: "" };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;

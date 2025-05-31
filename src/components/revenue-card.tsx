"use client";

import { IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type TimePeriod = "weekly" | "biweekly" | "monthly" | "fourweekly";

interface RevenueData {
  totalRevenue: string;
  regularHours: number;
  overtimeHours: number;
}

interface RevenueCardProps {
  weeklyRevenue: RevenueData;
  biWeeklyRevenue: RevenueData;
  monthlyRevenue: RevenueData;
  fourWeeklyRevenue: RevenueData;
}

export function RevenueCard({
  weeklyRevenue,
  biWeeklyRevenue,
  monthlyRevenue,
  fourWeeklyRevenue,
}: RevenueCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");

  const getRevenueForPeriod = (period: TimePeriod): RevenueData => {
    switch (period) {
      case "weekly":
        return weeklyRevenue;
      case "biweekly":
        return biWeeklyRevenue;
      case "monthly":
        return monthlyRevenue;
      case "fourweekly":
        return fourWeeklyRevenue;
    }
  };

  const getPeriodLabel = (period: TimePeriod) => {
    switch (period) {
      case "weekly":
        return "Weekly";
      case "biweekly":
        return "Bi-Weekly";
      case "monthly":
        return "Monthly";
      case "fourweekly":
        return "4-Weekly";
    }
  };

  const getPeriodDescription = (period: TimePeriod) => {
    switch (period) {
      case "weekly":
        return "Revenue for this week";
      case "biweekly":
        return "Revenue for last two weeks";
      case "monthly":
        return "Revenue for this month";
      case "fourweekly":
        return "Revenue for last 4 weeks";
    }
  };

  const currentRevenue = getRevenueForPeriod(selectedPeriod);

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>Total Revenue</CardDescription>
          <Select
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="fourweekly">4-Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          ${currentRevenue.totalRevenue}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            {getPeriodLabel(selectedPeriod)}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Regular: {currentRevenue.regularHours}h | Overtime:{" "}
          {currentRevenue.overtimeHours}h
        </div>
        <div className="text-muted-foreground">
          {getPeriodDescription(selectedPeriod)}
        </div>
      </CardFooter>
    </Card>
  );
}

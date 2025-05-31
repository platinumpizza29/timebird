"use client";

import { IconClock } from "@tabler/icons-react";
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

interface HoursData {
  weeklyHours: number;
  biWeeklyHours: number;
  monthlyHours: number;
  fourWeeklyHours: number;
}

interface HoursCardProps extends HoursData {
  title: string;
  description: string;
}

export function HoursCard({
  title,
  description,
  weeklyHours,
  biWeeklyHours,
  monthlyHours,
  fourWeeklyHours,
}: HoursCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");

  const getHoursForPeriod = (period: TimePeriod): number => {
    switch (period) {
      case "weekly":
        return weeklyHours;
      case "biweekly":
        return biWeeklyHours;
      case "monthly":
        return monthlyHours;
      case "fourweekly":
        return fourWeeklyHours;
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
        return "Hours for this week";
      case "biweekly":
        return "Hours for last two weeks";
      case "monthly":
        return "Hours for this month";
      case "fourweekly":
        return "Hours for last 4 weeks";
    }
  };

  const currentHours = getHoursForPeriod(selectedPeriod);

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
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
          {currentHours}h
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">{description}</div>
        <div className="text-muted-foreground">
          {getPeriodDescription(selectedPeriod)}
        </div>
      </CardFooter>
    </Card>
  );
}

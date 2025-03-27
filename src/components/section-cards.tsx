import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { headers } from "next/headers";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function SectionCards() {
  const userData = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = userData?.session.userId;
  //fetch the data from prisma
  const hours = await db.hours.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: {
        include: {
          PayRate: true,
        },
      },
    },
  });
  // get the total hours for just this month
  const totalHours = hours.reduce((acc, hour) => {
    return acc + parseFloat(hour.hours.toString());
  }, 0);

  // get the total overtime for just this month
  const totalOvertime = hours.reduce((acc, hour) => {
    return acc + parseFloat(hour.overtime.toString());
  }, 0);

  // get the total revenue for just this month hours+overtime * payrate
  const totalRevenue = hours
    .reduce((acc, hour) => {
      return (
        acc +
        parseFloat(hour.hours.toString()) *
          parseFloat(hour.user.PayRate[0]?.rate.toString() ?? "0")
      );
    }, 0)
    .toFixed(3);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${totalRevenue}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total revenue for this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Hours</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalHours}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total hours worked this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Overtime</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalOvertime}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Overtime hours more/less
            <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Overtime hours as per user logged{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

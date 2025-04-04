import type { Hours } from "@prisma/client";
import { headers } from "next/headers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { Badge } from "./ui/badge";

export async function DataTable() {
  const userData = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = userData?.session.userId;

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
    take: 10,
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="@container/card">
      <h2 className="text-2xl font-bold tracking-tight">Recent Hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Overtime</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Pay Rate</TableHead>
            <TableHead className="text-right">Pay Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hours.map((hour, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{hour.department}</TableCell>
              <TableCell>{hour.hours.toString()}</TableCell>
              <TableCell>{hour.overtime.toString()}</TableCell>
              <TableCell className="">{hour.date.toDateString()}</TableCell>
              <TableCell className="">
                {hour.user.PayRate[0]?.rate.toString()}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline">{hour.user.PayRate[0]?.type}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

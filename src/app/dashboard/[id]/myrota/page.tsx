import { headers } from "next/headers";
import { EventCalendar, type CalendarEvent } from "~/components/event-calendar";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

const getDatesAndTime = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = userSession!.user.id;
  const response = await db.hours.findMany({
    where: { userId: userId },
  });

  // map the new response to CalendarEvent[]
  const hours: CalendarEvent[] = response.map((hour) => ({
    id: hour.id.toString(),
    title: hour.department,
    start: new Date(hour.startTime!),
    end: new Date(hour.endTime!),
  }));
  return hours;
};

export default async function MyRotaPage() {
  const response = await getDatesAndTime();
  return (
    <div className="h-screen">
      <EventCalendar className="max-w-6xl" events={response} />
    </div>
  );
}

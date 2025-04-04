import { cn } from "~/lib/utils";
import {
  BatteryCharging,
  Clock,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  User,
  WandSparkles,
} from "lucide-react";
import { IconAuth2fa, IconCalendar, IconKey } from "@tabler/icons-react";
//
//
interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature43Props {
  heading?: string;
  reasons?: Reason[];
}

export const FeaturesSection = ({
  heading = "Why Work With Us?",
  reasons = [
    {
      title: "Secure User Authentication",
      description:
        "Ensures only authorized personnel access their information with reliable login and registration processes.",
      icon: <IconKey className="size-6" />,
    },
    {
      title: "Flexible Rota Management",
      description:
        "Empowers users to create and manage work rotas tailored to their needs, supporting weekly, bi-weekly, and 4-weekly schedules. Features an intuitive calendar display for easy schedule visualization.",
      icon: <IconCalendar className="size-6" />,
    },
    {
      title: "Effortless Overtime Logging",
      description:
        "Simplifies the process of logging overtime hours with detailed descriptions, promoting accurate record-keeping.",
      icon: <RadioTower className="size-6" />,
    },
    {
      title: "Personalized Pay Rate Management",
      description:
        "Allows users to configure their own base and overtime pay rates, while also maintaining a historical record of rate changes for transparency.",
      icon: <WandSparkles className="size-6" />,
    },
    {
      title: "Real-Time Earnings Insights",
      description:
        "Provides automated calculations of estimated pay, based on rota, overtime, and user-defined pay rates. Offers clear summaries of hours worked, both regular and overtime.",
      icon: <Clock className="size-6" />,
    },
    {
      title: "User-Centric Design",
      description:
        "Eliminates the need for an administrative role, promoting self-management and giving workers direct control over their schedules and earnings information",
      icon: <User className="size-6" />,
    },
  ],
}: Feature43Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

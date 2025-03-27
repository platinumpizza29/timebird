"use client"

import * as React from "react"
import {
  IconCalendar,
  IconDashboard,
  IconFeather,
  IconHelp,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { useSession } from "~/lib/auth-client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const userSession = useSession()
  const user = userSession.data?.user;

  const data = {
    user: {
      name: user ? user.name : "Shadcn",
      email: user ? user.email : "m@example.com",
      avatar: user?.image == "" ? "/avatars/shadcn.jpg" : user?.image,
    },
    navMain: [
      {
        title: "Dashboard",
        url: `/dashboard/${user?.id}`,
        icon: IconDashboard,
      },
      {
        title: "My Rota",
        url: "#",
        icon: IconCalendar,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: `/dashboard/${user?.id}/settings`,
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
  }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconFeather className="!size-5" />
                <span className="text-base font-semibold">Timebird</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

import * as React from "react"
import {
  BookOpen,
  Bot,
  ChartBarDecreasing,
  Command,
  Database,
  Edit,
  Frame,
  Image,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavProjects } from "~/components/nav-projects"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Workouts",
      url: "#",
      icon: Edit,
      isActive: true,
      items: [
        {
          title: "Edit",
          url: "/admin/workouts/edit",
        },
        {
          title: "Create",
          url: "admin/workouts/create",
        },

      ],
    },
    {
      title: "Media",
      url: "#",
      icon: Image,
      items: [
        {
          title: "Edit",
          url: "#",
        },
        {
          title: "Upload",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "#",
        },

      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  analytics: [
    {
      name: "Dashboard",
      url: "#",
      icon: ChartBarDecreasing,
    },

  ],
  rawData: [
    {
      name: "Database",
      url: "#",
      icon: Database,
    },


  ],
}

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent className={className}>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.rawData} title="Data" />
        <NavProjects projects={data.analytics} title="Statistics" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

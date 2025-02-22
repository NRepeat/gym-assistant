import * as React from "react"
import {
  BookOpen,
  Bot,
  ChartBarDecreasing,
  Command,
  Database,
  Dumbbell,
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
    avatar: "",
  },
  navMain: [
    {
      title: "Workouts",
      url: "/admin/workouts",
      icon: Dumbbell,
      isActive: true,
      items: [
        {
          title: "Opens",
          url: "/admin/workout/opens",
        },
        {
          title: "Heroes",
          url: "/admin/workout/heroes",
        },
        {
          title: "Semifinals",
          url: "/admin/workout/semifinals",
        },
        {
          title: 'Workout',
          url: '/admin/workout/workout',
        }
      ],
    },
    {
      title: "Media",
      url: "#",
      icon: Image,
      items: [

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
  navMainSecondary: [
    {
      title: "Database",
      url: "/admin/data",
      icon: Database,
      isActive: false,
      items: [
        {
          title: "Opens",
          url: "/admin/data/workout/opens",
        },
        {
          title: "Heroes",
          url: "/admin/data/workout/heroes",
        },
        {
          title: "Semifinals",
          url: "/admin/data/workout/semifinals",
        },
        {
          title: 'Workout',
          url: '/admin/data/workout/workout',
        },
        {
          title: 'Movement',
          url: '/admin/data/workout/movement',
        }
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
        <NavMain items={data.navMain} title="" />
        <NavMain items={data.navMainSecondary} title="Data" />
        <NavProjects projects={data.analytics} title="Statistics" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

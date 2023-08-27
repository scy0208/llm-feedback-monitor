
import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
      {
        title: "Documentation",
        href: "/docs/get-start",
      },
      {
        title: "Support",
        href: "/support",
        disabled: true,
      },
    ],
    sidebarNav: [
      {
        title: "Overviews",
        href: "/dashboard",
        icon: "post",
      },
      {
        title: "Summary",
        href: "/dashboard/summary",
        icon: "folderOpenDot",
      },
      {
        title: "Outage monitor",
        href: "/dashboard/monitor",
        icon: "activity",
      },
      {
        title: "Config",
        href: "/dashboard/config",
        icon: "settings",
      },
      {
        title: "Feedback",
        href: "/dashboard/feedback",
        icon: "thumbsup",
      },
    ],
  }
  
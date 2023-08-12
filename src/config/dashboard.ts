
import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
      {
        title: "Documentation",
        href: "/docs",
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
        title: "Project",
        href: "/dashboard/project",
        icon: "folderOpenDot",
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
  
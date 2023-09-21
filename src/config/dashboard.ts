
import { DashboardConfig } from "@/types"

// export const dashboardConfig: DashboardConfig = {
//     mainNav: [
//       {
//         title: "Documentation",
//         href: "/docs/get-start",
//       },
//       {
//         title: "Support",
//         href: "/support",
//         disabled: true,
//       },
//     ],
//     sidebarNav: [
//       {
//         title: "Overviews",
//         href: "/dashboard",
//         icon: "post",
//       },
//       {
//         title: "Summary",
//         href: "/dashboard/summary",
//         icon: "folderOpenDot",
//       },
//       // {
//       //   title: "Outage monitor",
//       //   href: "/dashboard/monitor",
//       //   icon: "activity",
//       // },
//       // {
//       //   title: "Query Deepdive",
//       //   href: "/dashboard/query",
//       //   icon: "microscope",
//       // },
//       {
//         title: "Config",
//         href: "/dashboard/config",
//         icon: "settings",
//       },
//       {
//         title: "Feedback",
//         href: "/dashboard/feedback",
//         icon: "thumbsup",
//       },
//     ],
//   }

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
      title: "Projects",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Configs",
      href: "/dashboard/config",
      icon: "settings",
    },
    {
      title: "Metrics",
      href: "/dashboard/metrics",
      icon: "settings",
    },
    {
        title: "Feedback",
        href: "/dashboard/feedback",
        icon: "thumbsup",
    }
    // {
    //   title: "Monitoring",
    //   href: "/dashboard/monitoring",
    //   icon: "thumbsup",
    // },
    // {
    //   title: "Analysis",
    //   href: "/dashboard/analysis",
    //   icon: "thumbsup",
    // },
    // {
    //   title: "Datasets",
    //   href: "/dashboard/feedback",
    //   icon: "thumbsup",
    // },
  ],
}
  
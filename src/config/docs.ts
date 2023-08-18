import { DocsConfig } from "@/types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs/api",
    },
    // {
    //   title: "Guides",
    //   href: "/guides",
    // },
  ],
  sidebarNav: [
    {
      title: "Documentation",
      items: [
        {
          title: "API",
          href: "/docs/api",
        },
        // {
        //   title: "Code Blocks",
        //   href: "/docs/code-blocks",
        // },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Blog",
      items: [
        // {
        //   title: "Introduction",
        //   href: "/docs/in-progress",
        //   disabled: true,
        // },
        // {
        //   title: "Build your own",
        //   href: "/docs/in-progress",
        //   disabled: true,
        // },
        // {
        //   title: "Writing Posts",
        //   href: "/docs/in-progress",
        //   disabled: true,
        // },
      ],
    },
  ],
}

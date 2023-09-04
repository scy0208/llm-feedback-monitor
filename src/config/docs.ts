import { DocsConfig } from "@/types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs/get-start",
    },
  ],
  sidebarNav: [
    {
      title: "Documentation",
      items: [
        {
          title: "Get Start",
          href: "/docs/get-start",
        },
        {
          title: "Integrate with Vercel AI SDK",
          href: "/docs/vercel-ai-sdk-integration",
        },
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
    // {
    //   title: "Dashboard",
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //   ],
    // },
    {
      title: "Blog",
      items: [
        {
          title: "Evolving AI Product Through Feedback Insights",
          href: "/blogs/evolve-ai-product-through-feedback-insights",
        },
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

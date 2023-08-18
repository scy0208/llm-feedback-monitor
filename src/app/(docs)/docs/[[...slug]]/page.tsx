import { allDocs } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from '@/components/mdx-components'
import { DocsPageHeader } from "@/components/page-header"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"


interface DocPageProps {
    params: {
        slug: string[]
    }
}

async function getDocFromParams(slugs: string[]) {
    const slug = slugs?.join("/") || ""
    const doc = allDocs.find((doc) => doc.slugAsParams === slug)

    if (!doc) {
        null
    }

    return doc
}


export default async function DocPage({ params }: DocPageProps) {
    const doc = await getDocFromParams(params.slug)
    if (!doc) {
        return <div></div>
    }
    const toc = await getTableOfContents(doc.body.raw)
    return (
        <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
                <DocsPageHeader heading={doc.title} text={doc.description} />
                <Mdx code={doc.body.code} />
                <hr className="my-4 md:my-6" />
            </div>
            <div className="hidden text-sm xl:block">
                <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
                    <DashboardTableOfContents toc={toc} />
                </div>
            </div>
        </main>
    )
}

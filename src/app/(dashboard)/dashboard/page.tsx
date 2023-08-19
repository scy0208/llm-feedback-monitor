import { redirect } from "next/navigation"

import { createClient } from '@/utils/supabase';
import { Table } from '@radix-ui/themes';
import { getCurrentUser } from "@/lib/session"
import { authOptions } from "@/lib/auth"

import { NewProjectButton } from "@/components/new-project";

export const metadata = {
    title: "Project",
}

export default async function ProjectPage() {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const { data, error } = await createClient()
        .from('project')
        .select(`*`)
        .eq('user_id', user.id);

    return (
        <>
            <NewProjectButton userID={user.id} />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Project</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Create At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data && data.length > 0 ? (
                        data.map((project) => (
                            <Table.Row key={project.id}>
                                <Table.RowHeaderCell>{project.name}</Table.RowHeaderCell>
                                <Table.Cell>{project.id}</Table.Cell>
                                <Table.Cell>{new Date(project.created_at).toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={3}>No projects available</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </>
    )
}
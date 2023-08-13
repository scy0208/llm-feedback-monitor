import { createClient } from '@/utils/supabase';
import { Table } from '@radix-ui/themes';

export const metadata = {
    title: "Project",
}

export default async function ProjectPage() {

    const { data, error } = await createClient()
        .from('Project')
        .select(`*`)

    return (
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
                          qq2  <Table.Cell>{new Date(project.created_at).toLocaleDateString()}</Table.Cell>
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell colSpan={3}>No projects available</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}
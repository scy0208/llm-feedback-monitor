import { createClient } from '@/utils/supabase';
import { Table } from '@radix-ui/themes';

export default async function DashboardPage() {
    const { data, error } = await createClient()
        .from('LLMConfig')
        .select(`*`)
    
    console.log(data)

    return (
        <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>LLM Config</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Config ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Project ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
    
                <Table.Body>
                    {data && data.length > 0 ? (
                        data.map((item, index) => {
                            const config = JSON.stringify(item.config)
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{config}</Table.Cell>
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.project_id}</Table.Cell>
                                    <Table.Cell>{item.created_at}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={4}>No data available</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
    )
}
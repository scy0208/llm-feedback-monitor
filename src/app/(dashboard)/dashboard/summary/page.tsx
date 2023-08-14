import { createClient } from '@/utils/supabase';
import { Table } from '@radix-ui/themes';

export default async function DashboardPage() {

    const { data, error } = await createClient()
        .from('llm_config_summary_view')
        .select('*')

    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Configuration Prompt</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Project ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Total Score</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data && data.length > 0 ? (
                    data.map((item, index) => {
                        const config = JSON.parse(item.config);

                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{item.config}</Table.Cell>
                                <Table.Cell>{item.project_id}</Table.Cell>
                                <Table.Cell>{item.key}</Table.Cell>
                                <Table.Cell>{item.total_score}</Table.Cell>
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
    );
}
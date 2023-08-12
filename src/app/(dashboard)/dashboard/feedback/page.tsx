import { createClient } from '@/utils/supabase';
import { Table } from '@radix-ui/themes';

export default async function FeedbackPage() {
    const { data, error } = await createClient()
        .from('Feedback')
        .select(`
      *,
      LLMConfig (*),
      Content (*)
    `)

    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Configuration Prompt</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.user}</Table.Cell>
                            <Table.Cell>{item.key}</Table.Cell>
                            <Table.Cell>{item.score}</Table.Cell>
                            <Table.Cell>{item.Content.content}</Table.Cell>
                            <Table.Cell>{item.LLMConfig.config.prompt}</Table.Cell>
                            <Table.Cell>{item.LLMConfig.config.model}</Table.Cell>
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell colSpan={6}>No data available</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}
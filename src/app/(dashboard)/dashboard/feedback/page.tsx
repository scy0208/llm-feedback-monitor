import { createClient } from '@/utils/supabase';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { Table } from '@radix-ui/themes';
import { ContextPopup } from '@/components/context-pop';


export default async function FeedbackPage() {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const { data, error } = await createClient()
        .from('feedback_by_project')
        .select(`
      *,
      LLMConfig (*),
      Content (*)`)
        .eq('user_id', user.id);

    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>LLM Configuration</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data && data.length > 0 ? (
                    data.map((item) => {
                        const config = JSON.stringify(item.LLMConfig.config)
                        return (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.user}</Table.Cell>
                                <Table.Cell>{item.key}</Table.Cell>
                                <Table.Cell>{item.score}</Table.Cell>
                                <Table.Cell>
                                    <ContextPopup
                                        groupID={item.Content.group_id}
                                        content={item.Content.content}
                                    />
                                </Table.Cell>
                                <Table.Cell>{config}</Table.Cell>
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
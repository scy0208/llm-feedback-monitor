import { createClient } from '@/utils/supabase';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { Table } from '@radix-ui/themes';

export default async function DashboardPage({ params }: { params: { projectId: string } }) {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }


    const { data, error } = await createClient()
        .from('model_config')
        .select(`*`)
        .eq('project_id', params.projectId)

    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>LLM Config</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Config Name</Table.ColumnHeaderCell>
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
                                <Table.Cell>{item.name}</Table.Cell>
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
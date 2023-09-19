import { createClient } from '@/utils/supabase';
import { Table, Grid, Heading } from '@radix-ui/themes';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { Monitor } from "@/components/charts/monitor";
import { ConfigSelector } from "@/components/config-selector";


export default async function DashboardPage() {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const { data, error } = await createClient()
        .from('content')
        .select('*')
        .eq('project_id', 'proj_H1VnkAuFsGnaB9eykx_P0');

    return (
        <>
            <Heading size="7" className="pb-5">Failed Query Detection</Heading>
            <Grid columns="2" gap="3" width="auto">
                <div>
                    <Heading size="5" className="pb-5">General</Heading>
                    <Monitor/>
                </div>
                <div>
                    <Heading size="5" className="pb-5">Details</Heading>
                    <div className="overflow-y-auto h-[445px] rounded-lg">
                    <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Failed Quries</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Config Name</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                        {data && data.length > 0 ? (
                            data.map((item, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.content}</Table.Cell>
                                        <Table.Cell>{item.config_name}</Table.Cell>
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
                </div>
            </div>
            </Grid>
        </>
    );
}
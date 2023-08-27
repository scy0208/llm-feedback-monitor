import { createClient } from '@/utils/supabase';
import { Table, Grid, Heading, Section } from '@radix-ui/themes';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { TabExample } from "@/components/charts/queryAnalyze";


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
            <Heading size="7" className="pb-5">Query Analysis and Deepdive</Heading>
                <div>
                    <Heading size="5" className="pb-5"> Most frequent asked questions and topics</Heading>
                    <TabExample/>
            </div>
        </>
    );
}
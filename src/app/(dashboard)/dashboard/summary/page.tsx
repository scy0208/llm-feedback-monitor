import { createClient } from '@/utils/supabase';
import { Table, Grid, Heading, Section } from '@radix-ui/themes';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { FeedbackSummary } from "@/components/charts/feedbackSummary";
import { ConfigCSAT } from "@/components/charts/configCSAT";

export default async function DashboardPage() {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const { data, error } = await createClient()
        .from('model_config_summary_view')
        .select('*')
        .eq('user_id', user.id);

    const feedbacks1 = [
        {
            key: "ThumbUp",
            totalScore: 109,
        },
        {
            key: "ThumbDown",
            totalScore: 48,
        },
    ];

    const feedbacks2 = [
        {
            key: "ThumbUp",
            totalScore: 25,
        },
        {
            key: "ThumbDown",
            totalScore: 7,
        },
    ];

    return (
        <>
            <Heading size="7" className="pb-5">Feedback Summary on LLM Config</Heading>
            <Grid columns="2" gap="3" width="auto">
                <div>
                    <Heading size="5" className="pb-5">General</Heading>
                    <Grid columns="2" gap="3" width="auto">
                        <FeedbackSummary
                            configName="VERSION_2023-08-01"
                            feedbackData={feedbacks1}
                        />
                        <FeedbackSummary
                            configName="VERSION_2023-08-15"
                            feedbackData={feedbacks2}
                        />
                    </Grid>
                    <ConfigCSAT/>
                </div>
                <div>
                    <Heading size="5" className="pb-5">Details</Heading>
                    <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>LLM Config</Table.ColumnHeaderCell>
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
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell className="text-xs">{item.config}</Table.Cell>
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
            </div>
            </Grid>
        </>
    );
}
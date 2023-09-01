import { createClient } from '@/utils/supabase';
import { Table, Grid, Heading, Section } from '@radix-ui/themes';

import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { FeedbackSummary } from "@/components/charts/feedbackSummary";



export default async function DashboardPage({ params }: { params: { projectId: string } }) {

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const client = createClient()

    const { data } = await client
        .from('model_config_summary_view')
        .select('*')
        .eq('project_id', params.projectId);

    const feedbacks = data?.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push({
            key: item.key,
            totalScore: item.total_score,
        });
        return acc;
    }, {}) || [];

    const feedbacksArray = Object.entries(feedbacks).map(([name, data]) => ({
        name,
        data,
      }));


    return (
        <>
            <Heading size="7" className="pb-5">Feedback Summary on LLM Config</Heading>
            <Grid columns="2" gap="3" width="auto">
                <div>
                    <Heading size="5" className="pb-5">General</Heading>
                    <Grid columns="2" gap="3" width="auto">
                        {feedbacksArray && feedbacksArray.map((feedback: any, index: number) => (
                            <FeedbackSummary
                                key={index}
                                configName={feedback.name}
                                feedbackData={feedback.data}
                            />
                        ))}
                    </Grid>
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
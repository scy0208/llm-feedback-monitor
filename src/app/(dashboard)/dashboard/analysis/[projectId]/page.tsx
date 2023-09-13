import Questions from '@/components/analysis/questions';
import Topics from '@/components/analysis/topics';
import { Table, Grid, Heading } from '@radix-ui/themes';


export default async function MetricsPage({ params }: { params: { projectId: string } }) {

    return (
        <>
        <Grid columns="2" width="auto">
            <Topics/>
            <Questions/>
        </Grid>
        </>
    )
}
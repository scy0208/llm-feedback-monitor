import { ConfigSelector } from "@/components/config-selector";
import { MetricsCard } from "@/components/metrics/metricsCard";
import { KeyMetrics } from "@/components/metrics/numberCard";



export default async function MetricsPage({ params }: { params: { projectId: string } }) {

    return (
        <>
        <KeyMetrics/>
        <ConfigSelector/>
        <MetricsCard/>
        </>
    )
}
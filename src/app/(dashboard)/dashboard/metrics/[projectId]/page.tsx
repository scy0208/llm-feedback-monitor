import { ConfigSelector } from "@/components/config-selector";
import { MetricsCard } from "@/components/metrics/metricsCard";
import { Metric, KeyMetrics } from "@/components/metrics/numberCard";
// import { useState,useEffect } from 'react';

// MetricsPage
export default async function MetricsPage({ params }: { params: { projectId: string } }) {


    return (
        <>
            <KeyMetrics projectId={params.projectId} />
            <MetricsCard projectId={params.projectId}/>
        </>
    )
}
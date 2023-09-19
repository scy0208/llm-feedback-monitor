'use client';
import {
    AreaChart,
    Card,
    Metric,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { ConfigSelector } from "../config-selector";


interface MetricsCardProps {
    projectId: string;
}


export function MetricsCard({ projectId }: MetricsCardProps) {
    
    const [dailySessions, setSessions] = useState<{ name: string, daily_active_sessions: number }[]>([]);
    const [dailyCSATs, setCSATs] = useState<{ name: string, daily_csat_percentage: number }[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<string | null>(null);
    const [configs, setConfigs] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const sessionsUrl = `/api/v0/get-daily-sessions/${projectId}`;
        const csatUrl = `/api/v0/get-daily-csat/${projectId}`;
        const configParam = selectedConfig ? `?config_name=${selectedConfig}` : '';

        fetch(sessionsUrl + configParam)
        .then((res) => res.json())
        .then((data: { name: string, daily_active_sessions: number }[]) => {
            setSessions(data);
        })

        fetch(csatUrl + configParam)
        .then((res) => res.json())
        .then((data: { name: string, daily_csat_percentage: number }[]) => {
            setCSATs(data);
        })

        fetch(`/api/v0/list-configs/${projectId}`)
        .then((res) => res.json())
        .then((data: { name: string }[]) => {
            const configNames = data.map(item => item.name);
            setConfigs(configNames);
            
            console.log(configNames);
            console.log(isLoading);
        })
        setLoading(false);
    }, [selectedConfig])
    
    if (isLoading) return <p>Loading...</p>

    return (
        <>
        <ConfigSelector configs={configs} onConfigChange={setSelectedConfig} />
        <Card className="p-0">
            <TabGroup>
                <TabList>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base"> Sessions</p>
                        <p className="text-xs sm:text-xs">Total chat sessions</p>
                        {/* <Metric className="mt-2 text-inherit">
                            {numberFormatter(sumArray(data, "daily_active_sessions"))}
                        </Metric> */}
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base"> CSAT</p>
                        <p className="text-xs sm:text-xs">User CSAT</p>
                        {/* <Metric className="mt-2 text-inherit">
                            {numberFormatter(sumArray(data, "daily_active_sessions"))}
                        </Metric> */}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={dailySessions}
                            index="day"
                            categories={["daily_active_sessions"]}
                            colors={["blue"]}
                            showLegend={false}
                            yAxisWidth={50}
                        />
                    </TabPanel>

                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={dailyCSATs}
                            index="day"
                            categories={["daily_csat_percentage"]}
                            colors={["blue"]}
                            showLegend={false}
                            yAxisWidth={50}
                        />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
        </>
    );
}
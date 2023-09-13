'use client'
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

function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function generateData() {
    const data = [];
    let chatSessions = 300;
    let bounceRate = 0.9;
    let fallbackRate = 0.3;

    for (let i = 2; i <= 30; i++) {
        const date = `Aug ${String(i).padStart(2, '0')}`;

        // Apply growth trend to Chat Sessions
        chatSessions += getRandom(2, 5);
        const chatSessionsRounded = Math.round(chatSessions);

        // Generate random CSAT
        const csat = getRandom(0.5, 1).toFixed(2);

        // Apply decreasing trend to Bounce Rate
        bounceRate -= getRandom(0.002, 0.006);
        const bounceRateRounded = Math.min(Math.max(bounceRate, 0.6), 0.9).toFixed(2);

        // Apply decreasing trend to Fallback Rate
        const fallbackRateRounded = getRandom(0, 0.2).toFixed(2);

        data.push({
            Date: date,
            "Chat Sessions": chatSessionsRounded,
            CSAT: parseFloat(csat),
            "Bounce Rate": parseFloat(bounceRateRounded),
            "Fallback Rate": parseFloat(fallbackRateRounded),
        });
    }
    return data;
}

const data = generateData();

const numberFormatter = (value: number) => Intl.NumberFormat("us").format(value).toString();
const percentageFormatter = (value: number) =>
    `${Intl.NumberFormat("us")
        .format(value * 100)
        .toString()}%`;
function sumArray(array: any[], metric: string): number {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
}

export function MetricsCard() {
    return (
        <Card className="p-0">
            <TabGroup>
                <TabList>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base"> Sessions</p>
                        <p className="text-xs sm:text-xs">Total chat sessions</p>
                        <Metric className="mt-2 text-inherit">
                            {numberFormatter(sumArray(data, "Chat Sessions"))}
                        </Metric>
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base">CSAT</p>
                        <p className="text-xs sm:text-xs">User satisfactory feedback</p>
                        <Metric className="mt-2 text-inherit">
                            {numberFormatter(sumArray(data, "CSAT")/ data.length)}
                        </Metric>
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base">Bounce rate</p>
                        <p className="text-xs sm:text-xs">Visitors not interacting with chatbot</p>
                        <Metric className="mt-2 text-inherit">
                            {percentageFormatter(sumArray(data, "Bounce Rate") / data.length)}
                        </Metric>
                    </Tab>
                    <Tab className="p-4 sm:p-6 text-left focus:bg-slate-100">
                        <p className="text-sm sm:text-base">Fallback rate</p>
                        <p className="text-xs sm:text-xs">Responses failing to follow user instruction</p>
                        <Metric className="mt-2 text-inherit">
                            {percentageFormatter(sumArray(data, "Fallback Rate") / data.length)}
                        </Metric>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={data}
                            index="Date"
                            categories={["Chat Sessions"]}
                            colors={["blue"]}
                            valueFormatter={numberFormatter}
                            showLegend={false}
                            yAxisWidth={50}
                        />
                    </TabPanel>
                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={data}
                            index="Date"
                            categories={["CSAT"]}
                            colors={["blue"]}
                            valueFormatter={numberFormatter}
                            showLegend={false}
                            yAxisWidth={50}
                        />
                    </TabPanel>
                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={data}
                            index="Date"
                            categories={["Bounce Rate"]}
                            colors={["blue"]}
                            valueFormatter={percentageFormatter}
                            showLegend={false}
                            yAxisWidth={40}
                        />
                    </TabPanel>
                    <TabPanel className="p-6">
                        <AreaChart
                            className="h-80 mt-10"
                            data={data}
                            index="Date"
                            categories={["Fallback Rate"]}
                            colors={["blue"]}
                            valueFormatter={percentageFormatter}
                            showLegend={false}
                            yAxisWidth={40}
                        />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    );
}
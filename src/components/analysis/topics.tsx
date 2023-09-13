'use client'
import {
    BadgeDelta,
    Card,
    DeltaType,
    DonutChart,
    Flex,
    Legend,
    List,
    ListItem,
    Title,
} from "@tremor/react";


interface CityData {
    name: string;
    region: string;
    sales: number;
    delta: string;
    deltaType: DeltaType;
}

interface TopicData {
    name: string;
    sessions: number;
    delta: string;
    deltaType: DeltaType;
}

const topicsData: TopicData[] = [
    {
        name: "Order Status",
        sessions: 6908,
        delta: "-19.09%",
        deltaType: "decrease"
    },
    {
        name: "Payment Issues",
        sessions: 3406,
        delta: "19.36%",
        deltaType: "increase"
    },
    {
        name: "Refund Process",
        sessions: 9832,
        delta: "-18.13%",
        deltaType: "decrease"
    },
    {
        name: "Shipping",
        sessions: 6000,
        delta: "-5.31%",
        deltaType: "decrease"
    },
    {
        name: "Product Questions",
        sessions: 3209,
        delta: "-1.08%",
        deltaType: "moderateDecrease"
    },
    {
        name: "Product Availability",
        sessions: 7094,
        delta: "8.39%",
        deltaType: "increase"
    },
    {
        name: "Promotions and Discounts",
        sessions: 5205,
        delta: "3.82%",
        deltaType: "moderateIncrease"
    },
    {
        name: "Technical Support",
        sessions: 2589,
        delta: "-18.41%",
        deltaType: "decrease"
    }
];

export default function Topics() {

    return (
        <Card className="max-w-md mx-auto">
            <Flex className="space-x-8" justifyContent="start" alignItems="center">
                <Title>Topics</Title>
            </Flex>
            <Legend categories={topicsData.map((topic) => topic.name)} className="mt-6" />
            <DonutChart
                data={topicsData}
                category="sessions"
                index="name"
                valueFormatter={(number: number) =>
                    `${Intl.NumberFormat("us").format(number).toString()}`
                }
                className="mt-6"
            />
            <List className="mt-6 overflow-y-auto h-[250px]">
                {topicsData.map((topic) => (
                    <ListItem key={topic.name}>
                        {topic.name}
                        <BadgeDelta deltaType={topic.deltaType} size="xs">
                            {topic.delta}
                        </BadgeDelta>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
'use client';

import { Card, Title, AreaChart } from '@tremor/react';

const chartdata = [
    {
      date: "Aug 01",
      "VERSION_2023-08-01": 100,
    },
    {
      date: "Aug 03",
      "VERSION_2023-08-01": 68,
    },
    {
      date: "Aug 05",
      "VERSION_2023-08-01": 75,
    },
    {
      date: "Aug 07",
      "VERSION_2023-08-01": 65,
    },
    {
      date: "Aug 10",
      "VERSION_2023-08-01": 88,
    },
    {
      date: "Aug 12",
      "VERSION_2023-08-01": 88,
    },
    {
      date: "Aug 15",
      "VERSION_2023-08-01": 73,
      "VERSION_2023-08-15": 100,
    },
    {
      date: "Aug 17",
      "VERSION_2023-08-01": 75,
      "VERSION_2023-08-15": 100,
    },
    {
      date: "Aug 20",
      "VERSION_2023-08-01": 69,
      "VERSION_2023-08-15": 75,
    },
  ];
  
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

export function ConfigCSAT({ configName, feedbackData }: any) {

  
    return (
        <Card>
            <Title>User Satisfaction Score</Title>
            <AreaChart
                className="h-72 mt-4"
                data={chartdata}
                index="date"
                categories={["VERSION_2023-08-01", "VERSION_2023-08-15"]}
                colors={["indigo", "cyan"]}
                valueFormatter={dataFormatter}
            />
        </Card>
    );
}
'use client';

import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata = [
  {
    name: "2023-08-08",
    "Bad answer": 8,
  },
  {
    name: "2023-08-09",
    "Bad answer": 8,
  },
  {
    name: "2023-08-10",
    "Bad answer": 0,
  },
  {
    name: "2023-08-11",
    "Bad answer": 1,
  },
  {
    name: "2023-08-12",
    "Bad answer": 8,
  },
  {
    name: "2023-08-13",
    "Bad answer": 0,
  },
  {
    name: "2023-08-14",
    "Bad answer": 7,
  },
  {
    name: "2023-08-15",
    "Bad answer": 4,
  },
  {
    name: "2023-08-16",
    "Bad answer": 13,
  },
  {
    name: "2023-08-17",
    "Bad answer": 5,
  },
  {
    name: "2023-08-18",
    "Bad answer": 9,
  },
  {
    name: "2023-08-19",
    "Bad answer": 3,
  },
  {
    name: "2023-08-20",
    "Bad answer": 0,
  },
  {
    name: "2023-08-21",
    "Bad answer": 11,
  },
];

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

export function Monitor() {
  return (
    <Card>
      <Title>Failed queries monitoring</Title>
      <Subtitle>
        Bad answer detected
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={["Bad answer"]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  )
}
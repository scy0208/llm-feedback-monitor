'use client'

import { Card, Metric, Text, Flex, BadgeDelta, DeltaType, Color, Grid } from "@tremor/react";

const colors: { [key: string]: Color } = {
  increase: "emerald",
  moderateIncrease: "emerald",
  unchanged: "orange",
  moderateDecrease: "rose",
  decrease: "rose",
};

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
}[] = [
  {
    title: "Total Chat Session",
    metric: "11,833",
    metricPrev: "11,438",
    delta: "3.45%",
    deltaType: "moderateIncrease",
  },
  {
    "title": "Daily Active Session",
    "metric": "395",
    "metricPrev": "524",
    "delta": "-24.62%",
    "deltaType": "moderateDecrease"
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Avereage Chat Length",
    metric: "298 words",
    metricPrev: "287",
    delta: "3.83%",
    deltaType: "moderateIncrease",
  },
];

export function KeyMetrics() {
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
            <Metric>{item.metric}</Metric>
            <Text className="truncate">from {item.metricPrev}</Text>
          </Flex>
          <Flex justifyContent="start" className="space-x-2 mt-4">
            <BadgeDelta deltaType={item.deltaType} />
            <Flex justifyContent="start" className="space-x-1 truncate">
              <Text color={colors[item.deltaType]}>{item.delta}</Text>
              <Text className="truncate">to previous day</Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
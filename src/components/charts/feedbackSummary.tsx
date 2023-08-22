'use client';

import { Card, DonutChart, Title, Text } from '@tremor/react';

const valueFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`;

export function FeedbackSummary({configName, feedbackData}: any) {
  return (
    <Card>
      <Title>{configName}</Title>
      <DonutChart
        className="mt-6"
        data={feedbackData}
        category="totalScore"
        index="key"
        valueFormatter={valueFormatter}
        colors={["teal", "rose"]}
      />
    </Card>
  );
}
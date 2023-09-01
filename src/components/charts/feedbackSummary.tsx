'use client';

import { Card, DonutChart, Title, Text } from '@tremor/react';

const valueFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`;

type Color = "red" | "cyan" | "orange" | "sky" | "yellow" | "blue" | "lime" | "indigo" | "green" | "violet" | "emerald" | "purple" | "teal" | "fuchsia" | "slate" | "pink" | "gray" | "rose" | "zinc" | "neutral" | "stone";
const colorValues: Color[] = ["red", "cyan", "orange", "sky", "yellow", "blue", "lime", "indigo", "green", "violet", "emerald", "purple", "teal", "fuchsia", "slate", "pink", "gray", "rose", "zinc", "neutral", "stone"];

const generateColors = (dataLength: number): Color[] => {
  let colors: Color[] = [];
  for(let i = 0; i < dataLength; i++) {
    colors.push(colorValues[i % colorValues.length]);
  }
  return colors;
}

export function FeedbackSummary({configName, feedbackData}: any) {
  const colors = generateColors(feedbackData.length);

  return (
    <Card>
      <Title>{configName}</Title>
      <DonutChart
        className="mt-6"
        data={feedbackData}
        category="totalScore"
        index="key"
        valueFormatter={valueFormatter}
        colors={colors}
      />
    </Card>
  );
}
import { Card, Metric, Text, Flex, BadgeDelta, DeltaType, Color, Grid } from "@tremor/react";
import { createClient } from '@/utils/supabase';


const colors: { [key: string]: Color } = {
  increase: "emerald",
  moderateIncrease: "emerald",
  unchanged: "orange",
  moderateDecrease: "rose",
  decrease: "rose",
};

export type Metric = {
  title: string;
  metric: number;
  metricPrev?: string;
  delta?: string;
  deltaType?: DeltaType;
};

type KeyMetricsProps = {
  projectId: string;
};


async function getNumberMetric(projectId: string, functionName: string, metricName: string) : Promise<Metric> {
  const client = createClient()
  const response = await client
    .rpc(functionName, { project: projectId });

  if (response.error) {
    console.error("Error fetching data:", response.error);
    return {
      title: metricName,
      metric: 0,
    };
  }
  console.log(response.data)

  let metricValue = response.data === null ? 0 : response.data;
  metricValue = parseFloat(metricValue.toFixed(2)); // Format to 2 decimal places

  return {
      title: metricName,
      metric: metricValue
  }  
}


export async function KeyMetrics({ projectId }: KeyMetricsProps) {
  
  const totalSessions = await getNumberMetric(projectId, 'get_total_sessions', 'Total Chat Session');
  const dailySessions = await getNumberMetric(projectId, 'get_total_users', 'Total Users');
  const averageWords = await getNumberMetric(projectId, 'get_avg_words_per_group', 'Average Chat Length (words)');

  const metrics: Metric[] = [totalSessions, dailySessions, averageWords];
  
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {metrics.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
            <Metric>{item.metric}</Metric>
            {item.metricPrev && <Text className="truncate">from {item.metricPrev}</Text>}
          </Flex>
          {item.delta && item.deltaType && (
            <Flex justifyContent="start" className="space-x-2 mt-4">
              <BadgeDelta deltaType={item.deltaType} />
              <Flex justifyContent="start" className="space-x-1 truncate">
                <Text color={colors[item.deltaType]}>{item.delta}</Text>
                <Text className="truncate">to previous day</Text>
              </Flex>
            </Flex>
          )}
        </Card>
      ))}
    </Grid>
  );
}
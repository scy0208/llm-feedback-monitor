'use client'
import {
    Card,
} from "@tremor/react";

import { Table, Tabs, Box, Text } from '@radix-ui/themes'

export const TabExample = () => {

    const data = [{
        'category': 'Economic Indicators & Data',
        'queries': [{
            'query': 'How have housing prices changed over the past year?',
            'frequent': 98
        },
        {
            'query': 'How do current oil prices compare to last year?',
            'frequent': 77
        },
        {
            'query': 'How has the GDP changed over the last quarter?',
            'frequent': 65
        },
        {
            'query': 'Which sectors have shown the most growth recently?',
            'frequent': 63
        },
        { 'query': 'What is the current inflation rate?', 'frequent': 80 },
        {
            'query': 'What are the predictions for economic growth next year?',
            'frequent': 55
        },
        { 'query': "What's the current consumer confidence index?", 'frequent': 57 },
        {
            'query': 'How does the trade balance look for the last year?',
            'frequent': 53
        },
        {
            'query': 'What are the current interest rates set by the central bank?',
            'frequent': 32
        },
        {
            'query': 'Can you give me an overview of the current unemployment rate?',
            'frequent': 18
        }]
    },
    {
        'category': 'Financial Reports & Analysis',
        'queries': [{
            'query': "What are the main takeaways from TSLA's income statement?",
            'frequent': 96
        },
        {
            'query': 'What is the current debt-to-equity ratio of TSLA?',
            'frequent': 92
        },
        {
            'query': "How does NVDA's operating margin compare to its industry peers?",
            'frequent': 71
        },
        {
            'query': 'Has [Company F] mentioned any strategic shifts in their latest report?',
            'frequent': 69
        },
        {
            'query': "Are there any red flags in [Company A]'s balance sheet?",
            'frequent': 49
        },
        {
            'query': 'Can you summarize the latest financial report of [Company X]?',
            'frequent': 37
        },
        { 'query': 'What is the return on equity for [Company E]?', 'frequent': 35 },
        {
            'query': "How has [Company Y]'s revenue changed over the past three quarters?",
            'frequent': 31
        },
        {
            'query': 'Which sectors are currently outperforming in terms of profitability?',
            'frequent': 16
        },
        {
            'query': "Can you provide a breakdown of [Company D]'s cash flow statement?",
            'frequent': 5
        }]
    },
    {
        'category': 'Earnings Calls & Forecasts',
        'queries': [{
            'query': "Were there any surprises or unexpected announcements in [Company K]'s earnings call?",
            'frequent': 99
        },
        {
            'query': "How does [Company L]'s forecasted revenue growth compare to previous years?",
            'frequent': 87
        },
        {
            'query': 'What are the main challenges discussed by [Company N] in their earnings call?',
            'frequent': 84
        },
        {
            'query': "How did the market react to [Company I]'s earnings announcement?",
            'frequent': 82
        },
        {
            'query': 'What major projects or investments were discussed by [Company P] in their earnings call?',
            'frequent': 67
        },
        {
            'query': 'Did [Company M] announce any dividend changes in their recent earnings call?',
            'frequent': 41
        },
        {
            'query': "Were there any significant questions raised by analysts in [Company H]'s earnings call?",
            'frequent': 34
        },
        {
            'query': "What are the key takeaways from [Company J]'s recent earnings call?",
            'frequent': 30
        },
        {
            'query': 'How confident is [Company O] about meeting its future targets?',
            'frequent': 26
        },
        {
            'query': 'What guidance did [Company G] provide in their latest earnings call?',
            'frequent': 14
        }]
    },
    {
        'category': 'Investment & Portfolio Management',
        'queries': [{
            'query': "Are there any tax-saving investment options you'd recommend?",
            'frequent': 90
        },
        {
            'query': 'Based on current data, which stocks seem undervalued?',
            'frequent': 66
        },
        {
            'query': 'Can you provide a risk assessment for my current portfolio?',
            'frequent': 59
        },
        {
            'query': "What's the outlook on emerging markets for the next year?",
            'frequent': 58
        },
        {
            'query': 'Which sectors are currently recommended for investment?',
            'frequent': 51
        },
        {
            'query': 'Can you suggest some diversification strategies for my portfolio?',
            'frequent': 38
        },
        { 'query': 'How is the bond market performing currently?', 'frequent': 32 },
        {
            'query': 'How are mutual funds in the technology sector performing?',
            'frequent': 15
        },
        { 'query': 'Are there any upcoming IPOs to watch out for?', 'frequent': 14 },
        {
            'query': 'How have commodities been performing recently?',
            'frequent': 9
        }]
    },
    {
        'category': 'General Financial Queries',
        'queries': [{
            'query': 'Can you explain the Efficient Market Hypothesis?',
            'frequent': 84
        },
        {
            'query': 'What are the implications of a trade war on global markets?',
            'frequent': 83
        },
        {
            'query': 'What are the advantages and disadvantages of investing in gold?',
            'frequent': 82
        },
        {
            'query': 'How does quantitative easing impact the economy?',
            'frequent': 57
        },
        { 'query': 'How do interest rates affect stock prices?', 'frequent': 37 },
        {
            'query': "What's the difference between fiscal and monetary policy?",
            'frequent': 33
        },
        {
            'query': 'Can you give an overview of how mergers and acquisitions impact stock prices?',
            'frequent': 29
        },
        {
            'query': 'How does currency devaluation affect exports and imports?',
            'frequent': 17
        },
        {
            'query': 'What is the impact of geopolitical events on oil prices?',
            'frequent': 17
        },
        {
            'query': 'Can you explain the concept of the Price-to-Earnings ratio?',
            'frequent': 6
        }]
    }]


    return (
        <Card>
            <Tabs.Root defaultValue={data[0]?.category || "Economic Indicators & Data"}>
                <Tabs.List>
                    {data.map((categoryData, index) => (
                        <Tabs.Trigger key={index} value={categoryData.category}>
                            {categoryData.category}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    {data.map((categoryData, index) => (
                        <Tabs.Content key={index} value={categoryData.category}>
                            <Table.Root variant="surface">
                                <Table.Body>
                                    {categoryData.queries && categoryData.queries.length > 0 ? (
                                        categoryData.queries.map((query, qIndex) => (
                                            <Table.Row key={qIndex}>
                                                <Table.Cell>{query.query}</Table.Cell>
                                                <Table.Cell>
                                                    <Text weight="bold" size="4" as="div">
                                                        {query.frequent}
                                                    </Text>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row>
                                            <Table.Cell colSpan={4}>No data available</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table.Root>
                        </Tabs.Content>
                    ))}
                </Box>
            </Tabs.Root>
        </Card>
    );
};
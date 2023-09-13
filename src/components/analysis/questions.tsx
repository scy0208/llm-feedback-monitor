'use client'
import { Card, List, ListItem, Title, Select, SelectItem, Flex } from "@tremor/react";

interface QuestionData {
    question: string;
    sessions: number;
}

const questions: QuestionData[] = [
    { question: "Why was my payment declined?", sessions: 467 },
    { question: "How do I update my payment information?", sessions: 293 },
    { question: "What payment methods do you accept?", sessions: 271 },
    { question: "Can I make a payment using multiple credit cards?", sessions: 187 },
    { question: "Is it safe to save my payment information on your website?", sessions: 134 },
    { question: "Why am I being charged an additional fee?", sessions: 111 },
    { question: "How do I apply a promo code or gift card to my payment?", sessions: 98 },
    { question: "Can I change my payment method after placing an order?", sessions: 89 },
    { question: "Why was I double-charged for my order?", sessions: 76 },
    { question: "When will the payment be deducted from my account?", sessions: 82 },
    { question: "Do you offer any installment payment options?", sessions: 71 },
    { question: "How do I get a refund for a canceled order?", sessions: 67 },
    { question: "Can I pay using a foreign currency?", sessions: 59 },
    { question: "Why haven't I received my refund yet?", sessions: 58 },
    { question: "What should I do if my payment is stuck or pending?", sessions: 47 },
    { question: "Is my payment information secure?", sessions: 52 },
    { question: "Why is my coupon code not working at checkout?", sessions: 43 },
    { question: "Can I make a payment over the phone?", sessions: 41 },
    { question: "How do I get a copy of my payment receipt?", sessions: 38 },
    { question: "What is your policy on chargebacks?", sessions: 37 }
];

export default function Questions() {
    return (
        <Card className="gap-5">
            <Flex className="pb-8" justifyContent="start" alignItems="center">
                <Title>Most Common Queries</Title>
            </Flex>
            <Select>
                <SelectItem value="1">
                    Payment Issues
                </SelectItem>
                <SelectItem value="2">
                    Meters
                </SelectItem>
                <SelectItem value="3">
                    Miles
                </SelectItem>
                <SelectItem value="4">
                    Nautical Miles
                </SelectItem>
            </Select>
            <List className="overflow-y-auto h-[520px]">
                {questions.map((item) => (
                    <ListItem key={item.question}>
                        <span>{item.question}</span>
                        <span>{item.sessions}</span>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
};
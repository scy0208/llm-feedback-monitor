"use client"
import { Dialog, Button, Flex, Text, Table } from "@radix-ui/themes"
import { Icons } from "@/components/icons"
import { useState } from 'react'

interface Props {
    groupID: string
    content: string
}


export function ContextPopup({ groupID, content }: Props) {  
    const [tableData, setTableData] = useState<any[]>([]);

    async function onSubmit() {
        const res = await fetch(`/api/v0/get-context/${groupID}`);
        const data = await res.json();
        
        if (data && data.data) {
            setTableData(data.data);
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Text onClick={onSubmit}>{content}</Text>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 650, maxHeight: 650}}>

                <Table.Root>
                    {tableData.map((row, index) => (
                        <Table.Row key={index}>
                            <Table.RowHeaderCell>
                                {row.created_by === 'assistant' ? <Icons.bot /> : <Icons.user />}
                            </Table.RowHeaderCell>
                            <Table.Cell>{row.content}</Table.Cell>
                            <Table.Cell>{new Date(row.created_at).toLocaleString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Root>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Close
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

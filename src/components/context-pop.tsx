"use client"
import { Dialog, Button, Flex, Text, Table } from "@radix-ui/themes"
import { createClient } from '@/utils/supabase';
import { Icons } from "@/components/icons"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

interface Props {
    groupID: string
    content: string
}

type Repo = {
    name: string
    stargazers_count: number
  }

export const getServerSideProps: GetServerSideProps<{
    repo: Repo
  }> = async ({ groupID, content }: Props) => {
    const { data, error } = await createClient()
        .from('Content')
        .select(`*`)
        .eq('group_id', groupID)
        .order('created_at')

    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    return { props: { repo } }
  }
   

export async function ContextPopup({ groupID, content }: Props) {

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Text>{content}</Text>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 650, maxHeight: 650}}>

                <Table.Root>
                    <Table.Row>
                        <Table.RowHeaderCell><Icons.user /></Table.RowHeaderCell>
                        <Table.Cell>Hello</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Icons.bot /></Table.RowHeaderCell>
                        <Table.Cell>With reference to Fig. 1, it is shown a bearing column 9 of a technical floor 5 to which an anti-seismic safety device 10, made according to the present invention, is applied. The bearing column 9, disclosed here for completeness, is of a known type and comprises a base plate 11, configured to rest on a technical layer 12, and a tube 14, with a circular section, which protrudes from the base plate 11 for a predetermined length. The base plate 11 and the tube 14 form the base 19 of the bearing column 9. The bearing column 9 also comprises a threaded tie-rod 25, which is sized so as to be arranged to slide inside the tube 14, and a threaded nut 15 which is configured to limit, in a known way, the sliding of the threaded tie-rod inside the tube 14 and thus to define the height of the bearing column. Please click the feedback button, thank you!</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>

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
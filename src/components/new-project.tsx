"use client"
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';

interface Props {
    userID: string;
}

export function NewProjectButton({userID}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const router = useRouter();
      const refreshData = () => {
        router.refresh()
      }

    async function onSubmit(data: any) {
        const res = await fetch("/api/v0/register-project", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              user_id: userID
            }),
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        refreshData()
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="w-30 place-self-end">New Project</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Dialog.Title>New Project</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Create A New Project
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Input
                                id="name"
                                type="text"
                                defaultValue="New Project"
                                placeholder="Enter your project name"
                                {...register('name')}
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit" >Save</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}
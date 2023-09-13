"use client"

import { Select } from '@radix-ui/themes';

const configs = [
    "All",
    "VERSION_2023-08-15",
    "VERSION_2023-08-01"
]

export function ConfigSelector() {
    return (
        <div className="flex gap-2">
        <p>
            Select LLM Config
        </p>
        <Select.Root>
            <Select.Trigger placeholder={configs[0]} />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Configs</Select.Label>
                    {Object.entries(configs).map(([id, name]) => (
                        <Select.Item key={name} value={name}>{name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        </div>
    )
}
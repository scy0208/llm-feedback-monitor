'use client';
import { Select } from '@radix-ui/themes';

interface ConfigSelectorProps {
    configs: string[];
    onConfigChange: (configName: string | null) => void;
}

export function ConfigSelector({ configs, onConfigChange }: ConfigSelectorProps) {
    return (
        <div className="flex gap-2">
            <p>Select LLM Config</p>
            <Select.Root onValueChange={value => onConfigChange(value as string)}>
                <Select.Trigger placeholder="All" />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Configs</Select.Label>
                        {configs.map(name => (
                            <Select.Item key={name} value={name}>{name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    )
}

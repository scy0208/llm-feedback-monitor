"use client"

import { Select } from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';

interface ProjectSelectorProps {
    projects: Record<string, string>,
    projectId: string,
    setProjectId: (projectId: string) => void
}

export function ProjectSelector({ projects, projectId, setProjectId }: ProjectSelectorProps) {
    const pathname = usePathname()
    const router = useRouter()

    const onValueChange = (value: string) => {
        localStorage.setItem('projectId', value);
        setProjectId(value);

        const newPath = pathname?.match(/\/proj_[^/]*$/)
            ? pathname?.replace(/\/proj_[^/]*$/, `/${value}`)
            : `${pathname}/${value}`;

        router.push(newPath || "/");
    }

    return (
        <Select.Root onValueChange={onValueChange}>
            <Select.Trigger placeholder={projects[projectId] || "No project"} />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Projects</Select.Label>
                    {Object.entries(projects).map(([id, name]) => (
                        <Select.Item key={id} value={id}>{name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
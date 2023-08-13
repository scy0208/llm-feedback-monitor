"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { DropdownMenu, Avatar } from '@radix-ui/themes';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const avatarImg = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
      <Avatar
        src={user.image || avatarImg}
        fallback={user.name || 'U'}
      />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Icons } from "@/components/icons"
import { Button } from "@radix-ui/themes"

import * as Sentry from "@sentry/nextjs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  // async function onSubmit(data: FormData) {
  //   setIsLoading(true)

  //   const signInResult = await signIn("email", {
  //     email: data.email.toLowerCase(),
  //     redirect: false,
  //     callbackUrl: searchParams?.get("from") || "/dashboard",
  //   })

  //   setIsLoading(false)

  //   if (!signInResult?.ok) {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "Your sign in request failed. Please try again.",
  //       variant: "destructive",
  //     })
  //   }

  //   return toast({
  //     title: "Check your email",
  //     description: "We sent you a login link. Be sure to check your spam too.",
  //   })
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Connect with
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={async () => {
          const transaction = Sentry.startTransaction({
            name: "GitHub Auth Transaction",
          });

          Sentry.configureScope((scope) => {
            scope.setSpan(transaction);
          });

          setIsGitHubLoading(true);
          try {
            await signIn("github", {
              redirect: false,
              callbackUrl: searchParams?.get("from") || "/dashboard",
            });
          } catch (error) {
            Sentry.captureException(error); // Capture the error in Sentry if signIn fails.
          } finally {
            transaction.finish(); // Finish the Sentry transaction
            setIsGitHubLoading(false); // Reset the loading state
          }
        }}
        disabled={isLoading || isGitHubLoading}
        highContrast
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}

"use client"

import { updateUsername } from "@/app/_actions/actions"
import { SubmitButton } from "@/app/_components/SubmitButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  username: string | null | undefined
}

const initialState = {
  status: "",
  message: "",
}

export const SettingsForm = ({ username }: Props) => {
  const [state, formAction] = useFormState(updateUsername, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === "green") {
      toast({ title: state.message })
    } else if (state?.status === "error") {
      toast({ title: state.message, variant: "destructive" })
    }
  }, [state, toast])

  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">In this settings page you can change your username!</p>
      <Input name="username" required className="mt-2" min={2} maxLength={21} defaultValue={username ?? ""} />
      {state?.status === "error" && <p className="text-red-500 mt-1">{state.message}</p>}
      <div className="w-full flex mt-5 gap-x-4 justify-end">
        <Button variant="secondary" asChild type="button">
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton title="Change username" />
      </div>
    </form>
  )
}

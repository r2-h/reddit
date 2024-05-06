"use client"

import { updateSubDescription } from "@/app/_actions/actions"
import { SaveButton } from "@/app/_components/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  subName: string
  description: string | null | undefined
}

const initialState = {
  status: "",
  message: "",
}

export const SubDescriptionForm = ({ subName, description }: Props) => {
  const [state, formAction] = useFormState(updateSubDescription, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === "green") {
      toast({ title: state.message })
    } else if (state?.status === "error") {
      toast({ title: state.message, variant: "destructive" })
    }
  }, [state, toast])

  return (
    <form action={formAction} className="mt-3">
      <input className="hidden" value={subName} name="subName" />
      <Textarea
        placeholder="Create your custom description for your subreddit"
        maxLength={100}
        name="description"
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  )
}

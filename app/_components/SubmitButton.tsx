"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{title}</Button>
      )}
    </>
  )
}

export const SaveButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button className="mt-2 w-full" disabled size="sm">
          <Loader2 className="mr-2 w-3 h-3 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" size="sm" className="mt-2 w-full">
          Save
        </Button>
      )}
    </>
  )
}

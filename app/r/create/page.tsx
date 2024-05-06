"use client"
import { createCommunity } from "@/app/_actions/actions"
import { SubmitButton } from "@/app/_components/SubmitButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState } from "react-dom"

const initialState = {
  status: "",
  message: "",
}

const SubredditPage = () => {
  const [state, formAction] = useFormState(createCommunity, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === "green") {
      toast({ title: state.message })
    } else if (state?.status === "error") {
      toast({ title: state.message, variant: "destructive" })
    }
  }, [state, toast])

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <form action={formAction}>
        <h1 className="text-3xl font-extrabold tracking-tight">Create community</h1>
        <Separator className="my-4" />
        <Label className="text-lg">Name</Label>
        <p className="text-muted-foreground">Community names including capitalization cannot be changed!</p>
        <div className="relative mt-3">
          <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">r/</p>
          <Input name="name" required className="pl-6" minLength={2} maxLength={21} />
        </div>
        {state?.status === "error" && <p className="text-red-500 mt-1">{state.message}</p>}
        <div className="w-full flex mt-5 gap-x-5 justify-end">
          <Button variant="secondary" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <SubmitButton title="Create community" />
        </div>
      </form>
    </div>
  )
}

export default SubredditPage

"use client"
import { useToast } from "@/components/ui/use-toast"
import { Share } from "lucide-react"

export const CopyLink = ({ id }: { id: string }) => {
  const { toast } = useToast()

  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`)
    toast({ title: "Success", description: "Your link is copied to your clipboard" })
  }

  return (
    <button className="flex items-center gap-x-1" onClick={copyToClipboard}>
      <Share className="h-4 w-4 text-muted-foreground" />
      <p className="text-muted-foreground">Share</p>
    </button>
  )
}

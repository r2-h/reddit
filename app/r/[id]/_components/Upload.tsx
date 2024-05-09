"use client"

import { UploadDropzone } from "@/app/_components/Uploadthing"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  setImageUrl: (imageUrl: null | string) => void
}
export const Upload = ({ setImageUrl }: Props) => {
  const { toast } = useToast()

  return (
    <UploadDropzone
      className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setImageUrl(res[0].url)
        toast({ title: "Success", description: "Upload completed" })
      }}
      onUploadError={(error: Error) => {
        toast({ title: "Error" })
      }}
    />
  )
}

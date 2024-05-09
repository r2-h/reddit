"use client"

import { UploadDropzone } from "@/app/_components/Uploadthing"

type Props = {
  setImageUrl: (imageUrl: null | string) => void
}
export const Upload = ({ setImageUrl }: Props) => {
  return (
    <UploadDropzone
      className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setImageUrl(res[0].url)
        alert("Upload Completed")
      }}
      onUploadError={(error: Error) => {
        alert(error)
      }}
    />
  )
}

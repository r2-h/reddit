import { updateSubDescription } from "@/app/_actions/actions"
import { SaveButton } from "@/app/_components/SubmitButton"
import prisma from "@/app/lib/db"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { useFormState } from "react-dom"
import { SubDescriptionForm } from "./_components/page"
import { Cake } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

async function getData(name: string) {
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  })

  return data
}

export default async function SubRedditRoute({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  const { getUser } = await getKindeServerSession()
  const user = await getUser()

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>Hello from the post section</h1>
      </div>

      <div className="w-[35%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About community</div>
          <div className="p-4">
            <div>
              <Image
                className="rounded-full h-16 w-16"
                alt="image of subreddit"
                width={60}
                height={60}
                src={`https://avatar.vercel.sh/${data?.name}`}
              />
              <Link className="font-medium" href={`/r/${data?.name}`}>
                r/{data?.name}
              </Link>
            </div>
            {user?.id === data?.userId ? (
              <SubDescriptionForm description={data?.description} subName={params.id} />
            ) : (
              <p className="text-sm font-normal text-secondary-foreground mt-2">{data?.description}</p>
            )}
            <div className="flex items-center gap-x-2 mt-4">
              <Cake className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-sm">
                Created:{" "}
                {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <Separator className="my-5" />

            <Button asChild className="rounded-full w-full">
              <Link href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}>Create post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

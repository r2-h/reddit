import { Card } from "@/components/ui/card"
import Image from "next/image"
import Banner from "../public/banner.png"
import HelloImage from "../public/hero-image.png"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreatePostCard } from "./_components/CreatePostCard"
import prisma from "./lib/db"
import { PostCard } from "./_components/PostCard"

async function getData() {
  return await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      imageString: true,
      subName: true,
      votes: true,
      User: {
        select: {
          userName: true,
        },
      },
    },
  })
}

export default async function Home() {
  const data = await getData()

  return (
    <section className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />

        {data.map((post) => (
          <PostCard
            key={post.id}
            createdAt={post.createdAt}
            id={post.id}
            imageString={post.imageString}
            subName={post.subName}
            textContent={post.textContent}
            title={post.title}
            userName={post.User?.userName}
            voteCount={post.votes.reduce((acc, vote) => (vote.voteType === "DOWN" ? (acc -= 1) : (acc += 1)), 0)}
          />
        ))}
      </div>

      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image src={HelloImage} alt="Hello image" className="w-10 h-16 -mt-6" />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your home Reddit frontpage. Come here to check in with your favorite communites!
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/dad/create">Crate post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Crate community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

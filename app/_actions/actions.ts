"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import db from "../lib/db"
import { redirect } from "next/navigation"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function updateUsername(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/api/auth/login")

  const username = formData.get("username") as string

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    })

    return {
      message: "Successfully updated name",
      status: "green",
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Username is already taken",
          status: "error",
        }
      }
    }
    throw error
  }
}

export async function createCommunity(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/api/auth/login")

  const name = formData.get("name") as string

  try {
    await db.subreddit.create({ data: { userId: user.id, name } })

    return redirect("/")
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "This name is already used",
          status: "error",
        }
      }
    }
    throw error
  }
}

export async function updateSubDescription(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/api/auth/login")

  try {
    const description = formData.get("description") as string
    const subName = formData.get("subName") as string

    await db.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description,
      },
    })

    return {
      message: "Successfully updated description",
      status: "green",
    }
  } catch (error) {
    return {
      message: "Some error ocurred",
      status: "error",
    }
  }
}

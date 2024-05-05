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
  }
}

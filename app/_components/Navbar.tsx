import { Button } from "@/components/ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import redditText from "../../public/logo-name.svg"
import redditMobile from "../../public/reddit-full.svg"
import { ModeToggle } from "./ModeToggle"
import { UserDropdown } from "./UserDropdown"

export const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex gap-x-3 items-center">
        <Image src={redditMobile} alt="Reddit mobile icon" className="h-10 w-fit" />
        <Image src={redditText} alt="Reddit desktop" className="h-9 w-fit hidden lg:block" />
      </Link>

      <div className="flex items-center gap-x-2">
        <ModeToggle />
        {user ? (
          <UserDropdown userImage={user.picture} />
        ) : (
          <>
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button>
              <LoginLink>Log in</LoginLink>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

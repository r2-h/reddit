/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

type Props = {
  userImage: string | null
}
export const UserDropdown = ({ userImage }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-4 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              userImage ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QpKHeBbrELrNRa-63gDAsBM2TQR3GzSxCYwMw73LVw&s"
            }
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w=[200px]">
        <DropdownMenuItem>
          <Link href="/r/create" className="w-full">
            Create Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/create" className="w-full">
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

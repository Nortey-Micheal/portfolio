'use client';

import {
  BookOpenIcon,
  LayoutDashboard,
  Menu,
  UserSearch,
} from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import {  useState } from "react"
import Link from "next/link"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [sessionNotification, setSessionNotification] = useState<boolean>(false); // State for session notifications

  const navs = [
      { link: "Blogs", icon: UserSearch, to: "/blogs" },
      { link: 'Contact', icon: BookOpenIcon, to: "/contact"},
    ]

  // Close the sheet when a navigation item is clicked
  const handleNavClick = (to?:string) => {
    setOpen(false)
    to === 'session' && setSessionNotification(false)
  }

  return (
    <div className="bg-deep-space sticky top-0 z-50 w-screen  shadow-sm">
      <div className="w-[95vw] max-w-[1300px] mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          Nortey Micheal
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="text-aqua-glow rounded-full hover:bg-steel-gray cursor-pointer relative">
              <Menu className="h-9 w-9 " />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-xs p-0 border-r-steel-gray bg-steel-gray">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 border-b border-steel-gray flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img className="w-8" src="/assets/images/Tutor1o1.svg" alt="logo" />
                  <span className="font-extrabold text-xl text-slate-800">Nortey Michael</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="mb-3 px-2">
                  <Link
                    href="/"
                    className={'flex gap-2'}
                    onClick={() => handleNavClick()}
                  >
                    <LayoutDashboard className="h-5 w-5 text-slate-600" />
                    <span>Home</span>
                  </Link>
                </div>

                
                <>
                    <div className="px-4 pb-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Navigation</h3>
                    </div>
                    <div className="px-2">
                        {navs.map((nav) => (
                        <Link
                            key={nav.link + nav.to}
                            href={nav.to}
                            className={'flex gap-2'}
                            onClick={() => handleNavClick(nav.to)}
                        >
                            <nav.icon className="h-5 w-5 text-slate-600" />
                            <span>{nav.link}</span>
                            </Link>
                        ))}
                    </div>
                </>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

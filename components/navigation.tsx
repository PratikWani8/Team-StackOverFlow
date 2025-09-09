"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  Recycle,
  Users,
  BookOpen,
  MapPin,
  Settings,
  BarChart3,
  User,
  LogOut,
} from "lucide-react"

const navigationItems = [
  { name: "Training", href: "/training", icon: BookOpen },
  { name: "Track Waste", href: "/tracking", icon: Recycle },
  { name: "Community", href: "/community", icon: Users },
  { name: "Facilities", href: "/facilities", icon: MapPin },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        setProfile(profile)
      }
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
        setProfile(profile)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const userInitials =
    profile?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 backdrop-blur-md shadow-lg border-b border-emerald-400/40">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Recycle className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
          <span className="font-heading text-xl font-bold text-white">WasteWise India</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {/* Animated underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full bg-yellow-300 transform transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            )
          })}
          {user && profile?.role === "admin" && (
            <Link
              href="/admin"
              className="relative flex items-center space-x-1 text-sm font-medium text-white hover:text-yellow-300 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-yellow-300">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt={profile?.full_name || "User"} />
                    <AvatarFallback className="bg-yellow-200 text-green-900">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm text-black shadow-lg" align="end" forceMount>
                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* Sign In Button */}
{user ? (
  <DropdownMenu> ... </DropdownMenu>
) : (
  <>
    {/* Sign In Button */}
    <Button
      variant="outline"
      size="sm"
      className="hidden md:inline-flex border-black text-black hover:bg-gray-100 hover:text-black transition-shadow hover:shadow-lg"
      asChild
    >
      <Link href="/auth/login">Sign In</Link>
    </Button>

    {/* Get Started Button */}
    <Button
      size="sm"
      className="hidden md:inline-flex bg-yellow-400 text-black hover:bg-yellow-500 hover:text-black hover:shadow-lg"
      asChild
    >
      <Link href="/auth/signup">Get Started</Link>
    </Button>
  </>
)}


            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-b from-green-700 to-emerald-600 text-white p-6"
            >
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 text-sm font-medium p-2 rounded-md transition ${
                      pathname === item.href
                        ? "bg-yellow-400 text-green-900"
                        : "hover:bg-green-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Menu, Recycle, Users, BookOpen, MapPin, Settings, BarChart3, User, LogOut } from "lucide-react"

// const navigationItems = [
//   { name: "Training", href: "/training", icon: BookOpen },
//   { name: "Track Waste", href: "/tracking", icon: Recycle },
//   { name: "Community", href: "/community", icon: Users },
//   { name: "Facilities", href: "/facilities", icon: MapPin },
// ]

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [user, setUser] = useState<any>(null)
//   const [profile, setProfile] = useState<any>(null)
//   const router = useRouter()
//   const supabase = createClient()

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       setUser(user)

//       if (user) {
//         const { data: profile } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", user.id)
//           .single()
//         setProfile(profile)
//       }
//     }
//     getUser()

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_, session) => {
//       setUser(session?.user ?? null)
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single()
//         setProfile(profile)
//       } else {
//         setProfile(null)
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [supabase])

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     router.push("/")
//   }

//   const userInitials =
//     profile?.full_name
//       ?.split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase() || "U"

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-green-700 text-white shadow-md">
//       <div className="container flex h-16 items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <Recycle className="h-8 w-8 text-white" />
//           <span className="font-heading text-xl font-bold">WasteWise India</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           {navigationItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center space-x-1 text-sm font-medium hover:underline hover:text-yellow-300 transition"
//             >
//               <item.icon className="h-4 w-4" />
//               <span>{item.name}</span>
//             </Link>
//           ))}
//           {user && profile?.role === "admin" && (
//             <Link
//               href="/admin"
//               className="flex items-center space-x-1 text-sm font-medium hover:underline hover:text-yellow-300 transition"
//             >
//               <Settings className="h-4 w-4" />
//               <span>Admin</span>
//             </Link>
//           )}
//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center space-x-4">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-green-600">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/placeholder.svg" alt={profile?.full_name || "User"} />
//                     <AvatarFallback className="bg-yellow-200 text-green-900">
//                       {userInitials}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 bg-white text-black" align="end" forceMount>
//                 <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard">Dashboard</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard/profile">Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="hidden md:inline-flex border-white text-white hover:bg-white hover:text-green-700"
//                 asChild
//               >
//                 <Link href="/auth/login">Sign In</Link>
//               </Button>
//               <Button
//                 size="sm"
//                 className="hidden md:inline-flex bg-yellow-400 text-green-900 hover:bg-yellow-500"
//                 asChild
//               >
//                 <Link href="/auth/signup">Get Started</Link>
//               </Button>
//             </>
//           )}

//           {/* Mobile Menu */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80 bg-green-700 text-white">
//               <div className="flex flex-col space-y-4 mt-8">
//                 {navigationItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="flex items-center space-x-3 text-sm font-medium hover:bg-green-600 p-2 rounded-md transition"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }













// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Menu, Recycle, Users, BookOpen, MapPin, BarChart3, Settings, User, LogOut } from "lucide-react"

// const navigationItems = [
//   { name: "Training", href: "/training", icon: BookOpen },
//   { name: "Track Waste", href: "/tracking", icon: Recycle },
//   { name: "Community", href: "/community", icon: Users },
//   { name: "Facilities", href: "/facilities", icon: MapPin },
// ]

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [user, setUser] = useState<any>(null)
//   const [profile, setProfile] = useState<any>(null)
//   const router = useRouter()
//   const supabase = createClient()

//   useEffect(() => {
//     // Get initial user
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()
//       setUser(user)

//       if (user) {
//         // Get user profile
//         const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
//         setProfile(profile)
//       }
//     }

//     getUser()

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setUser(session?.user ?? null)
//       if (session?.user) {
//         const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()
//         setProfile(profile)
//       } else {
//         setProfile(null)
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [supabase])

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     router.push("/")
//   }

//   const userInitials =
//     profile?.full_name
//       ?.split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase() || "U"

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2">
//           <Recycle className="h-8 w-8 text-primary" />
//           <span className="font-heading text-xl font-bold text-foreground">WasteWise India</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           {navigationItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//             >
//               <item.icon className="h-4 w-4" />
//               <span>{item.name}</span>
//             </Link>
//           ))}
//           {user && profile?.role === "admin" && (
//             <Link
//               href="/admin"
//               className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//             >
//               <Settings className="h-4 w-4" />
//               <span>Admin</span>
//             </Link>
//           )}
//         </nav>

//         <div className="flex items-center space-x-4">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/placeholder.svg" alt={profile?.full_name || "User"} />
//                     <AvatarFallback className="bg-emerald-100 text-emerald-700">{userInitials}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{profile?.full_name || "User"}</p>
//                     <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard" className="flex items-center">
//                     <BarChart3 className="mr-2 h-4 w-4" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard/profile" className="flex items-center">
//                     <User className="mr-2 h-4 w-4" />
//                     <span>Profile</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent" asChild>
//                 <Link href="/auth/login">Sign In</Link>
//               </Button>
//               <Button size="sm" className="hidden md:inline-flex" asChild>
//                 <Link href="/auth/signup">Get Started</Link>
//               </Button>
//             </>
//           )}

//           {/* Mobile Navigation */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="sm">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80">
//               <div className="flex flex-col space-y-4 mt-8">
//                 {navigationItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.name}</span>
//                   </Link>
//                 ))}
//                 {user && profile?.role === "admin" && (
//                   <Link
//                     href="/admin"
//                     className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <Settings className="h-5 w-5" />
//                     <span>Admin</span>
//                   </Link>
//                 )}
//                 <div className="pt-4 border-t space-y-2">
//                   {user ? (
//                     <>
//                       <Button variant="outline" className="w-full bg-transparent" asChild>
//                         <Link href="/dashboard">Dashboard</Link>
//                       </Button>
//                       <Button variant="outline" className="w-full text-red-600 bg-transparent" onClick={handleSignOut}>
//                         Sign Out
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button variant="outline" className="w-full bg-transparent" asChild>
//                         <Link href="/auth/login">Sign In</Link>
//                       </Button>
//                       <Button className="w-full" asChild>
//                         <Link href="/auth/signup">Get Started</Link>
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }

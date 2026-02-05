"use client"

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, ExternalLink, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'

export function AdminHeader() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="relative h-8 w-24">
                            <Image
                                src="/logo.png"
                                alt="R&R Admin"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-sm font-semibold text-zinc-400 border-l border-zinc-700 pl-3 ml-1">
                            Admin Portal
                        </span>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/" target="_blank">
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Live Site
                        </Button>
                    </Link>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleLogout}
                        className="bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 border border-red-900/50"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )
}

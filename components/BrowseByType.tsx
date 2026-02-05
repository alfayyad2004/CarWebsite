"use client"

import Link from 'next/link'
import { Car, Truck, Sparkles, Tag } from 'lucide-react'

const CATEGORIES = [
    {
        title: "Roll On Roll Off",
        description: "Fresh imports, pristine condition",
        href: "/inventory?condition=RORO",
        icon: Car,
        color: "from-blue-600 to-blue-900"
    },
    {
        title: "Local Used",
        description: "Quality pre-owned vehicles",
        href: "/inventory?condition=Local%20Used",
        icon: Tag,
        color: "from-emerald-600 to-emerald-900"
    },
    {
        title: "Commercial & Trucks",
        description: "Heavy duty workhorses",
        href: "/inventory?type=Truck",
        icon: Truck,
        color: "from-orange-600 to-orange-900"
    },
    {
        title: "New Arrivals",
        description: "Just landed in Trinidad",
        href: "/inventory?sort=newest",
        icon: Sparkles,
        color: "from-purple-600 to-purple-900"
    }
]

export function BrowseByType() {
    return (
        <section className="py-20 bg-zinc-950">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">
                    Browse by <span className="text-primary">Type</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 block"
                        >
                            {/* Background with Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                            {/* Content */}
                            <div className="relative h-full p-6 flex flex-col justify-end z-10">
                                <category.icon className="h-10 w-10 text-white mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {category.description}
                                </p>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

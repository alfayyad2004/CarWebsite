"use client"

import { VehicleCard } from '@/components/VehicleCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Vehicle } from '@/types/database'

export function RecentlyAdded() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchRecent = async () => {
            const { data } = await supabase
                .from('vehicles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(4)

            if (data) setVehicles(data)
            setLoading(false)
        }

        fetchRecent()
    }, [])

    if (loading) return null // Or a skeleton loader
    if (vehicles.length === 0) return null

    return (
        <section className="py-20 bg-background border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Fresh off the <span className="text-primary">Boat</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            The latest additions to our premium inventory.
                        </p>
                    </div>
                    <Link href="/inventory?sort=newest" className="hidden md:flex items-center text-primary font-medium hover:text-white transition-colors">
                        View All New Arrivals <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="min-w-[280px]"> {/* Simple wrapper */}
                            <VehicleCard vehicle={vehicle} />
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/inventory?sort=newest" className="inline-flex items-center text-primary font-medium hover:text-white transition-colors">
                        View All New Arrivals <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

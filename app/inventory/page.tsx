import { Header } from '@/components/Header'
import { InventoryGrid } from '@/components/InventoryGrid'
import { InventoryFilters } from '@/components/InventoryFilters'
import { PaginationControls } from '@/components/PaginationControls'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
    title: 'Inventory - R&R Trading',
    description: 'Browse our selection of quality RORO and local used vehicles.'
}

export default async function InventoryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = await createClient()

    let query = supabase
        .from('vehicles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

    // Apply Filter Logic
    const q = searchParams['q'] as string
    const make = searchParams['make'] as string
    const minPrice = searchParams['minPrice'] as string
    const maxPrice = searchParams['maxPrice'] as string

    // Pagination Logic
    const page = Number(searchParams['page']) || 1
    const PAGE_SIZE = 12
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    if (q) {
        query = query.textSearch('fts', q, { type: 'websearch', config: 'english' })
    }
    if (make) {
        query = query.eq('make', make)
    }
    if (minPrice) {
        query = query.gte('price_ttd', minPrice)
    }
    if (maxPrice) {
        query = query.lte('price_ttd', maxPrice)
    }

    // Get count and data in single query if possible, or correct count syntax
    // Using select('*', { count: 'exact' }) on the builder BEFORE range() is standard
    // But since query is already built, we need to modify it or chain correctly

    // Efficient way:
    // query.select('*', { count: 'exact' }) will mutate if it's a builder? No, it returns new builder.
    // Let's refactor to ensure we get count and data effectively.

    // We can't easily re-select on an existing SelectBuilder in some versions.
    // Safest bet for reliability:
    const { data: vehicles, count } = await query.range(from, to)

    const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Our Inventory</h1>
                    <p className="text-muted-foreground">Find the perfect vehicle for your lifestyle.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Sidebar Filters */}
                    <div className="hidden md:block">
                        <InventoryFilters />
                    </div>

                    {/* Mobile Filters (You might want a collapsible Sheet here later, but stacking is okay for now) */}
                    <div className="md:hidden">
                        {/* Simplified mobile view or just show Filters */}
                        <InventoryFilters />
                    </div>

                    {/* Results Grid */}
                    <div className="md:col-span-3">
                        <InventoryGrid vehicles={vehicles || []} />
                        {totalPages > 1 && (
                            <PaginationControls totalPages={totalPages} currentPage={page} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

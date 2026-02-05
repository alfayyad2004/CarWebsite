"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react'; // Placeholder for Badge component if using shadcn, or simple div
import { motion } from 'framer-motion';
import { Vehicle } from '@/types/database';

// Simple Badge component since we didn't add shadcn badge
// Simple Badge component
function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        'In Stock': 'bg-green-500/20 text-green-400 border-green-500/50',
        'In Transit': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        'Sold': 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    const colorClass = colors[status] || 'bg-gray-500/20 text-gray-400';

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium border ${colorClass} uppercase tracking-wider`}>
            {status}
        </span>
    );
}

interface VehicleCardProps {
    vehicle: Vehicle;
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
    // Check if vehicle and specs exist before accessing
    if (!vehicle) return null;
    const specs = vehicle.specs || {};
    const price = vehicle.price_ttd ? new Intl.NumberFormat('en-TT', { style: 'currency', currency: 'TTD', maximumFractionDigits: 0 }).format(vehicle.price_ttd) : 'Price TBD';

    // Fallback Image Logic: Check if images exist and is an array with at least one item
    const imageUrl = (vehicle.images && Array.isArray(vehicle.images) && vehicle.images.length > 0)
        ? vehicle.images[0]
        : null;

    return (
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href={`/inventory/${vehicle.id}`}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-700 group-hover:bg-zinc-800 transition-colors">
                            <span className="text-xs font-medium uppercase tracking-widest">No Image</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <StatusBadge status={vehicle.status || 'In Stock'} />
                        {vehicle.condition === 'Local Used' && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/50 uppercase tracking-wider">
                                Local Used
                            </span>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute bottom-3 right-3">
                        <span className="text-xl font-bold text-white drop-shadow-md">
                            ${vehicle.price_ttd?.toLocaleString()} TTD
                        </span>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        <span>{vehicle.mileage?.toLocaleString()} km</span>
                        <span>{vehicle.transmission || 'Automatic'} • {vehicle.fuel_type || 'Petrol'}</span>
                    </div>

                    <div className="w-full h-10 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium">
                        View Details
                    </div>
                </div>
            </Link>
        </motion.div >
    );
}

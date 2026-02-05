import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-white">
                            About <span className="text-primary">R&R Trading</span>
                        </h2>

                        <div className="space-y-6 text-lg text-zinc-400 leading-relaxed font-light">
                            <p>
                                Our genesis commenced 20 years ago with the importation of 'knocked-down' vehicles to Trinidad and Tobago.
                                We rode the wave of technology and embraced the fast change of time and welcomed the importation of fully
                                assembled Rollon-Rolloff vehicles from various countries such as Japan, Singapore, Thailand and England,
                                just to name a few.
                            </p>
                            <p>
                                Our reputation in the foreign used car dealership industry remains of high standard as we provide
                                impeccable service, extreme professionalism, quality motor vehicles of all makes and models as well
                                as competitive prices.
                            </p>
                            <p>
                                Here, at R&R Trading Company Limited, we have always embraced and will continue to encourage our
                                valued customers to <span className="text-white font-medium italic">'Drive the Difference'</span>.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link
                                href="/contact"
                                className="inline-flex items-center text-primary hover:text-white transition-colors font-medium text-lg group"
                            >
                                Contact Us Today
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="/about-image-1.png"
                                alt="R&R Trading Logistics"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-10 right-10 w-full h-full bg-primary/20 blur-3xl rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroTextAnimation, HeroVisualAnimation } from "./hero-animations";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Text Content - Left Side (7 cols) */}
                    <div className="lg:col-span-7 z-10">
                        <HeroTextAnimation>
                            <span className="block text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-4 sm:mb-6">
                                The Modern Document Tool
                            </span>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-foreground leading-[0.9] mb-6 sm:mb-8">
                                Refine your <br />
                                <span className="italic font-normal text-primary">digital paper.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 sm:mb-10">
                                A curated suite of tools to merge, split, and sign your PDFs.
                                Designed for clarity, built for speed.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <Button
                                    size="lg"
                                    className="rounded-none h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-foreground text-background hover:bg-primary hover:text-white transition-colors duration-300 editorial-shadow border border-transparent hover:border-foreground min-h-[44px]"
                                    asChild
                                >
                                    <Link href="/dashboard">
                                        Start Editing
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-none h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-foreground text-foreground hover:bg-secondary transition-colors duration-300 min-h-[44px]"
                                    asChild
                                >
                                    <Link href="#features">
                                        Explore Tools
                                    </Link>
                                </Button>
                            </div>
                        </HeroTextAnimation>
                    </div>

                    {/* Visual/Abstract Element - Right Side (5 cols) */}
                    <div className="lg:col-span-5 relative">
                        <HeroVisualAnimation>
                            <div className="absolute inset-0 border border-foreground m-2 opacity-20" />
                            <div className="h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-primary rounded-full" />
                                    <div className="h-2 w-1/3 bg-foreground/10" />
                                    <div className="h-2 w-2/3 bg-foreground/10" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-32 w-full bg-foreground/5 border border-foreground/10" />
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2 w-1/2">
                                            <div className="h-2 w-full bg-foreground/10" />
                                            <div className="h-2 w-2/3 bg-foreground/10" />
                                        </div>
                                        <div className="text-6xl font-serif text-foreground/10">
                                            Aa
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HeroVisualAnimation>
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
        </section>
    );
}

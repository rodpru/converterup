import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function CTA() {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-background">
            <div className="container mx-auto">
                <FadeIn className="relative overflow-hidden bg-foreground text-background px-6 sm:px-12 md:px-24 py-16 sm:py-20 md:py-32 text-center border border-foreground">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 leading-[0.9]">
                            Ready to refine <br />
                            <span className="italic text-primary">your workflow?</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2">
                            Join users who trust PDF Pocket Knife for their document needs.
                            Precision tools, zero friction.
                        </p>
                        <Button
                            size="lg"
                            className="rounded-none h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg bg-background text-foreground hover:bg-primary hover:text-white transition-all duration-300 border border-transparent hover:border-background min-h-[44px]"
                            asChild
                        >
                            <Link href="/dashboard">
                                Start Editing
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    {/* Decorative Lines */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-background" />
                        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-background" />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

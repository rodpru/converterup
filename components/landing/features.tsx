import {
    Merge,
    Scissors,
    Minimize2,
    FileType,
    Shield,
    Zap
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const features = [
    {
        icon: Merge,
        title: "Merge PDFs",
        description: "Combine multiple PDF files into a single document in seconds."
    },
    {
        icon: Scissors,
        title: "Split PDFs",
        description: "Extract pages or split large documents into smaller files."
    },
    {
        icon: Minimize2,
        title: "Compress PDFs",
        description: "Reduce file size while maintaining high quality for easy sharing."
    },
    {
        icon: FileType,
        title: "Convert Format",
        description: "Convert PDFs to Word, Excel, JPG, and more with high accuracy."
    },
    {
        icon: Shield,
        title: "Secure Processing",
        description: "Your files are processed securely and deleted automatically."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Powered by advanced algorithms for instant results."
    }
];

export function Features() {
    return (
        <section id="features" className="py-16 sm:py-24 md:py-32 bg-background border-t border-foreground">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-16 md:mb-24">
                    <div className="lg:col-span-5">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground leading-[0.9] px-2 sm:px-0">
                            Essential <br />
                            <span className="italic text-primary">Utilities.</span>
                        </h2>
                    </div>
                    <div className="lg:col-span-7 flex items-end">
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed px-2 sm:px-0">
                            A complete set of tools designed to handle every aspect of your digital documentation workflow.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground">
                    {features.map((feature, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                            className="group relative p-6 sm:p-8 md:p-10 border-r border-b border-foreground hover:bg-secondary/30 transition-colors duration-500 min-h-[200px] sm:min-h-[220px]"
                        >
                            <div className="flex justify-between items-start mb-8 sm:mb-12">
                                <span className="font-mono text-xs sm:text-sm tracking-widest opacity-40">
                                    0{index + 1}
                                </span>
                                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-1 text-primary" />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3 sm:mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is PDF Pocket Knife free to use?",
        answer:
            "Yes, PDF Pocket Knife offers a free tier that allows you to perform basic PDF operations. We also have premium plans for advanced features and higher usage limits.",
    },
    {
        question: "Is my document data safe?",
        answer:
            "Absolutely. All processing happens locally in your browser for most operations. When server-side processing is required, we use secure, encrypted connections and do not store your files longer than necessary for the operation.",
    },
    {
        question: "Can I use it on my mobile device?",
        answer:
            "Yes! PDF Pocket Knife is fully responsive and works great on smartphones and tablets, allowing you to manage your PDFs on the go.",
    },
    {
        question: "What types of PDF edits can I make?",
        answer:
            "You can merge, split, compress, convert, sign, and annotate PDFs. We are constantly adding new tools to help you manage your documents better.",
    },
];

export function FAQ() {
    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-neutral-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                        Everything you need to know about PDF Pocket Knife.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium text-neutral-900 dark:text-white hover:no-underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

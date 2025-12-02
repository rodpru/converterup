import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4 group">
                            <Logo className="w-8 h-8" />
                            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                PDF Pocket Knife
                            </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-xs">
                            The ultimate tool for all your PDF needs. Simple, fast, and secure.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 md:mb-0">
                        © {new Date().getFullYear()} PDF Pocket Knife. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

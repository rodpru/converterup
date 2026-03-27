import type { Metadata } from "next";
import { StripeFeeCalculator } from "./calculator";

export const metadata: Metadata = {
  title:
    "Stripe Fee Calculator — Calculate Stripe Processing Fees | ConverterUp",
  description:
    "Calculate Stripe processing fees instantly. See exactly what you'll pay and receive for any transaction amount. Supports USD, EUR, GBP, and BRL. Free and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/stripe-fee-calculator",
  },
  openGraph: {
    title: "Stripe Fee Calculator — Calculate Stripe Processing Fees",
    description:
      "Calculate Stripe processing fees instantly. See exactly what you'll pay and receive for any transaction amount.",
    url: "https://converterup.com/tools/stripe-fee-calculator",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Fee Calculator — Calculate Stripe Processing Fees",
    description:
      "Calculate Stripe processing fees instantly. See exactly what you'll pay and receive for any transaction amount.",
  },
};

export default function StripeFeeCalculatorPage() {
  return <StripeFeeCalculator />;
}

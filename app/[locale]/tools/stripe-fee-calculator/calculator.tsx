"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp, Calculator, DollarSign, Info } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { trackToolEvent } from "@/lib/track-tool";

type Currency = "USD" | "EUR" | "GBP" | "BRL";

type CurrencyConfig = {
  code: Currency;
  symbol: string;
  label: string;
  region: string;
  percentFee: number;
  fixedFee: number;
};

const CURRENCIES: CurrencyConfig[] = [
  {
    code: "USD",
    symbol: "$",
    label: "US Dollar",
    region: "United States",
    percentFee: 2.9,
    fixedFee: 0.3,
  },
  {
    code: "EUR",
    symbol: "\u20AC",
    label: "Euro",
    region: "European Union",
    percentFee: 1.5,
    fixedFee: 0.25,
  },
  {
    code: "GBP",
    symbol: "\u00A3",
    label: "British Pound",
    region: "United Kingdom",
    percentFee: 1.5,
    fixedFee: 0.2,
  },
  {
    code: "BRL",
    symbol: "R$",
    label: "Brazilian Real",
    region: "Brazil",
    percentFee: 3.99,
    fixedFee: 0.39,
  },
];

type CalcMode = "charge" | "receive";

const ease = [0.16, 1, 0.3, 1] as const;

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stripe Fee Calculator",
  url: "https://converterup.com/tools/stripe-fee-calculator",
  description:
    "Calculate Stripe processing fees instantly. See exactly what you'll pay and receive for any transaction amount.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (browser-based)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "ConverterUp",
    url: "https://converterup.com",
  },
};

function calculateFees(
  amount: number,
  currency: CurrencyConfig,
  mode: CalcMode,
) {
  if (amount <= 0) {
    return { chargeAmount: 0, fee: 0, netAmount: 0, effectiveRate: 0 };
  }

  const rate = currency.percentFee / 100;
  const fixed = currency.fixedFee;

  if (mode === "charge") {
    const fee = amount * rate + fixed;
    const netAmount = amount - fee;
    const effectiveRate = netAmount > 0 ? (fee / amount) * 100 : 0;
    return {
      chargeAmount: amount,
      fee: Math.max(fee, 0),
      netAmount: Math.max(netAmount, 0),
      effectiveRate,
    };
  }

  // Reverse: user wants to receive `amount`, calculate what to charge
  const chargeAmount = (amount + fixed) / (1 - rate);
  const fee = chargeAmount - amount;
  const effectiveRate = chargeAmount > 0 ? (fee / chargeAmount) * 100 : 0;
  return {
    chargeAmount: Math.max(chargeAmount, 0),
    fee: Math.max(fee, 0),
    netAmount: amount,
    effectiveRate,
  };
}

function formatMoney(value: number, symbol: string): string {
  return `${symbol}${value.toFixed(2)}`;
}

export function StripeFeeCalculator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [mode, setMode] = useState<CalcMode>("charge");
  const hasTrackedStarted = useRef(false);
  const hasTrackedCompleted = useRef(false);

  const selectedCurrency = useMemo(
    () => CURRENCIES.find((c) => c.code === currency) as CurrencyConfig,
    [currency],
  );

  const numericAmount = Number.parseFloat(amount) || 0;

  const result = useMemo(
    () => calculateFees(numericAmount, selectedCurrency, mode),
    [numericAmount, selectedCurrency, mode],
  );

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
        setAmount(val);
        if (val && !hasTrackedStarted.current) {
          trackToolEvent("stripe-fee-calculator", "started");
          hasTrackedStarted.current = true;
        }
        const num = Number.parseFloat(val);
        if (num > 0 && !hasTrackedCompleted.current) {
          trackToolEvent("stripe-fee-calculator", "completed");
          hasTrackedCompleted.current = true;
        }
      }
    },
    [],
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "charge" ? "receive" : "charge"));
  }, []);

  return (
    <>
      <JsonLd data={jsonLdSchema} />

      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            Free Tool
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            Stripe Fee
            <br />
            <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Calculate Stripe processing fees instantly. See exactly how much
            you&rsquo;ll pay and receive for any transaction amount.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Mode Toggle */}
          <div className="flex items-center justify-center mb-8">
            <button
              type="button"
              onClick={toggleMode}
              className="group flex items-center gap-3 h-12 px-6 rounded-lg border border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors min-h-[44px]"
            >
              <ArrowDownUp className="w-4 h-4 text-[#2DD4BF] transition-transform group-hover:rotate-180 duration-300" />
              <span className="font-[Inter] text-sm text-[#EDEDEF]">
                {mode === "charge" ? "I want to charge" : "I want to receive"}
              </span>
            </button>
          </div>

          {/* Input Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder={
                  mode === "charge"
                    ? "Amount to charge..."
                    : "Amount to receive..."
                }
                className="w-full h-12 pl-11 pr-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60 font-mono text-sm"
              />
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="h-12 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] appearance-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Fee Rate Info */}
          <div className="flex items-center gap-2 mb-8 px-1">
            <Info className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
            <p className="font-mono text-[11px] text-[#71717A]">
              {selectedCurrency.region}: {selectedCurrency.percentFee}% +{" "}
              {selectedCurrency.symbol}
              {selectedCurrency.fixedFee.toFixed(2)} per transaction
            </p>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {numericAmount > 0 && (
              <motion.div
                key={`${mode}-${currency}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
                  <span className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                    {mode === "charge" ? "You charge" : "You should charge"}
                  </span>
                  <p className="text-2xl font-mono font-bold text-[#EDEDEF] mt-2">
                    {formatMoney(result.chargeAmount, selectedCurrency.symbol)}
                  </p>
                </div>

                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
                  <span className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                    Stripe fee
                  </span>
                  <p className="text-2xl font-mono font-bold text-[#FB7185] mt-2">
                    -{formatMoney(result.fee, selectedCurrency.symbol)}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A] mt-1">
                    {result.effectiveRate.toFixed(2)}% effective rate
                  </p>
                </div>

                <div className="bg-[#16131E] border border-[#2DD4BF]/20 rounded-xl p-5">
                  <span className="font-mono text-[11px] text-[#2DD4BF] uppercase tracking-wider">
                    You receive
                  </span>
                  <p className="text-2xl font-mono font-bold text-[#2DD4BF] mt-2">
                    {formatMoney(result.netAmount, selectedCurrency.symbol)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Fee Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
              Stripe Fees by Region
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#2A2535]">
                  <th className="py-3 px-4 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Region
                  </th>
                  <th className="py-3 px-4 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Currency
                  </th>
                  <th className="py-3 px-4 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Rate
                  </th>
                  <th className="py-3 px-4 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Fixed Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {CURRENCIES.map((c) => (
                  <tr
                    key={c.code}
                    className="border-b border-[#2A2535]/50 hover:bg-[#16131E]/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-[Inter] text-sm text-[#EDEDEF]">
                      {c.region}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[#EDEDEF]">
                      {c.code}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[#EDEDEF]">
                      {c.percentFee}%
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[#EDEDEF]">
                      {c.symbol}
                      {c.fixedFee.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Enter Amount",
                desc: "Type the amount you want to charge or receive from a payment.",
              },
              {
                step: "02",
                title: "Pick Currency",
                desc: "Select your currency to apply the correct regional Stripe fee rates.",
              },
              {
                step: "03",
                title: "See Results",
                desc: "Instantly see the Stripe fee, net amount, and effective fee percentage.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.1 }}
                className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5"
              >
                <span className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  Step {item.step}
                </span>
                <h3 className="text-base font-[Syne] font-bold text-[#EDEDEF] mt-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}

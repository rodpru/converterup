"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("stripe-fees-explained");

export function ArticleContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm font-[Inter] text-[#71717A] mb-8 pt-8">
          <Link href="/" className="hover:text-[#EDEDEF] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#EDEDEF] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#EDEDEF]">Stripe Fees Explained</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
              Utility
            </span>
            <span className="text-[#71717A]">/</span>
            <time
              dateTime="2026-03-27"
              className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
            >
              Mar 27, 2026
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
            Stripe Fees Explained: How to Calculate Processing Costs
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            Understand Stripe&apos;s fee structure for USD, EUR, GBP, and BRL.
            Use our calculator to see exactly what you&apos;ll pay and receive.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            Stripe is the payment processor of choice for millions of
            businesses, from solo founders to enterprise companies. Its
            developer-friendly API and transparent pricing are major draws, but
            the fee structure has nuances that are easy to overlook — especially
            when dealing with international transactions, currency conversion,
            and refunds. Understanding exactly how Stripe calculates fees will
            help you price your products accurately and avoid surprises.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Stripe&apos;s Fee Structure by Region
          </h2>
          <p>
            Stripe uses a percentage-plus-fixed-fee model. The exact rates
            depend on where your Stripe account is based (not where your
            customer is). Here are the standard rates for the most common
            regions:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Region
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Domestic Rate
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    International Card
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">
                    United States (USD)
                  </td>
                  <td className="p-3">2.9% + 30¢</td>
                  <td className="p-3 text-[#71717A]">
                    +1% international, +1% conversion
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">Europe (EUR)</td>
                  <td className="p-3">1.5% + 25¢</td>
                  <td className="p-3 text-[#71717A]">+2% for non-EEA cards</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">
                    United Kingdom (GBP)
                  </td>
                  <td className="p-3">1.5% + 20p</td>
                  <td className="p-3 text-[#71717A]">+2% for non-UK cards</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">Brazil (BRL)</td>
                  <td className="p-3">3.99% + R$0.39</td>
                  <td className="p-3 text-[#71717A]">+2% international</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            European merchants benefit from significantly lower domestic rates
            (1.5% vs 2.9% in the US) due to EU regulations on interchange fees.
            If your customers are primarily in Europe and you can base your
            Stripe account there, the savings are substantial.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            How to Calculate Net Amount
          </h2>
          <p>
            The formula for calculating what you receive after Stripe fees is:
          </p>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF]">
            Net Amount = Charge Amount - (Charge Amount × Percentage Fee) -
            Fixed Fee
          </div>
          <p>For a $100 charge on a US Stripe account with a domestic card:</p>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF] space-y-1">
            <div>Fee = ($100 × 0.029) + $0.30 = $2.90 + $0.30 = $3.20</div>
            <div>Net = $100 - $3.20 = $96.80</div>
          </div>
          <p>
            For a $100 charge with an international card requiring currency
            conversion:
          </p>
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 my-4 font-mono text-sm text-[#EDEDEF] space-y-1">
            <div>Fee = ($100 × 0.049) + $0.30 = $4.90 + $0.30 = $5.20</div>
            <div>Net = $100 - $5.20 = $94.80</div>
          </div>
          <p>
            That additional 2% for international + conversion is meaningful at
            scale. A business processing $50,000/month in international
            transactions pays an extra $1,000/month compared to domestic-only
            transactions.
          </p>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                Calculate Your Stripe Fees Instantly
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Enter your charge amount, select your currency, and see exactly
                what Stripe will deduct and what you will receive.
              </p>
              <Link
                href="/tools/stripe-fee-calculator"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open Stripe Fee Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Tips to Minimize Stripe Fees
          </h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Price to absorb or pass through fees.
              </strong>{" "}
              If you want to receive exactly $100, charge $103.30 (for US
              domestic). The formula to calculate the charge amount is:{" "}
              <code className="text-[#2DD4BF] bg-[#16131E] px-1.5 py-0.5 rounded text-sm">
                (desired_amount + fixed_fee) / (1 - percentage_fee)
              </code>
              .
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Use local payment methods.
              </strong>{" "}
              SEPA Direct Debit in Europe (0.8%, capped at €5) and ACH in the US
              (0.8%, capped at $5) have much lower fees than card payments.
              Encourage customers to use these where possible.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Negotiate volume discounts.
              </strong>{" "}
              Stripe offers custom pricing for businesses processing over
              $100,000/month. Even at lower volumes, it is worth reaching out —
              especially if you have low chargeback rates.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Minimize currency conversions.
              </strong>{" "}
              If you have significant revenue in EUR or GBP, open a Stripe
              account in that region to avoid the 1% conversion surcharge.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Batch small transactions.
              </strong>{" "}
              The fixed fee (30¢ in the US) hits hardest on small transactions.
              A $5 charge loses 8.9% to fees, while a $100 charge loses only
              3.2%. If possible, batch small purchases.
            </li>
          </ol>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Stripe vs. PayPal vs. Square
          </h2>
          <p>How does Stripe compare to the other major payment processors?</p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#16131E]">
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Processor
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Online Rate (US)
                  </th>
                  <th className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold">
                    Key Difference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2535]">
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">Stripe</td>
                  <td className="p-3">2.9% + 30¢</td>
                  <td className="p-3 text-[#71717A]">
                    Best developer API, most flexible
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">PayPal</td>
                  <td className="p-3">3.49% + 49¢</td>
                  <td className="p-3 text-[#71717A]">
                    Higher fees, but buyers trust the brand
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#2DD4BF]">Square</td>
                  <td className="p-3">2.9% + 30¢</td>
                  <td className="p-3 text-[#71717A]">
                    Same online rate, stronger for in-person POS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Stripe and Square have identical online rates, but Stripe is
            significantly more developer-friendly with better APIs, webhooks,
            and subscription management. PayPal&apos;s higher fees come with the
            advantage of buyer familiarity — some customers complete purchases
            faster when they see the PayPal button.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            Understanding Refund Fees
          </h2>
          <p>
            An important detail many businesses overlook: when you issue a
            refund on Stripe, the processing fee is not returned. If you charged
            $100 and paid $3.20 in fees, refunding the full $100 means you lose
            the $3.20 fee entirely. The customer gets their $100 back, but you
            absorb the processing cost.
          </p>
          <p>
            This policy is standard across Stripe, PayPal, and Square. It means
            high refund rates can be costly. For a business with a 5% refund
            rate processing $100,000/month, the unrecoverable fees on refunds
            alone are approximately $160/month.
          </p>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Does Stripe charge a monthly fee?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  No. Stripe&apos;s standard pricing has no monthly fees, setup
                  fees, or minimum charges. You only pay when you process a
                  transaction. However, some premium features like Stripe Tax
                  (0.5% per transaction), Radar for Fraud Teams ($0.07 per
                  screened transaction), and Stripe Atlas ($500 one-time) have
                  additional costs.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  What about international transaction fees?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Stripe charges an additional 1% for international cards (cards
                  issued outside your country) and another 1% if currency
                  conversion is required. For a US merchant processing a
                  European card in EUR, the total would be 2.9% + 30¢ + 1%
                  (international) + 1% (conversion) = 4.9% + 30¢. To avoid the
                  conversion fee, settle in the original currency.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  How do refund fees work?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  When you issue a refund, Stripe returns the full transaction
                  amount to the customer but does not refund the processing fee
                  to you. For a $100 charge where you paid $3.20 in fees, you
                  would refund $100 to the customer and lose the $3.20. This is
                  standard across all major payment processors.
                </p>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-[Syne] font-semibold text-[#EDEDEF] mt-2 group-hover:text-[#2DD4BF] transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.article>
  );
}

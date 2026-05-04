import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using ConverterUp's free, browser-based file conversion tools.",
  alternates: { canonical: "https://converterup.com/terms" },
};

const LAST_UPDATED = "2026-05-02";

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p>
        <em>Last updated: {LAST_UPDATED}</em>
      </p>

      <h2>1. Acceptance</h2>
      <p>
        By using <strong>converterup.com</strong> (the &quot;Service&quot;) you
        agree to these Terms. If you do not agree, do not use the Service.
      </p>

      <h2>2. The Service</h2>
      <p>
        ConverterUp provides free, browser-based tools for converting and
        manipulating images, videos, audio and text. All processing happens
        locally on your device.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for unlawful purposes.</li>
        <li>
          Process content you do not have the right to use or distribute.
        </li>
        <li>
          Attempt to disrupt the Service, scrape it at scale, or circumvent
          security controls.
        </li>
        <li>
          Misrepresent your identity or impersonate ConverterUp.
        </li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>
        The Service&apos;s code, design, copy and brand belong to ConverterUp.
        Content you process belongs to you; we never claim rights to your
        files.
      </p>

      <h2>5. No warranty</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranty of any kind.
        We do not guarantee that conversions will be lossless, that the Service
        will be available without interruption, or that it will be free of
        bugs.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, ConverterUp shall not be liable
        for any indirect, incidental, special, consequential, or punitive
        damages, or for loss of data, revenue or profits, arising from your use
        of the Service.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        We use Vercel for hosting, Google Analytics 4 for analytics, and Google
        AdSense for advertising. Their respective terms apply to data they
        collect.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms. Continued use after changes constitutes
        acceptance.
      </p>

      <h2>9. Governing law</h2>
      <p>These Terms are governed by the laws of Portugal.</p>

      <h2>10. Contact</h2>
      <p>
        Questions: <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a>
      </p>
    </>
  );
}

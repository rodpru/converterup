import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for ConverterUp. Files are processed locally in your browser and never uploaded.",
  alternates: { canonical: "https://converterup.com/privacy" },
};

const LAST_UPDATED = "2026-05-02";

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: {LAST_UPDATED}</em>
      </p>

      <h2>1. Summary</h2>
      <p>
        ConverterUp processes files entirely inside your browser using
        WebAssembly. Files you convert are <strong>never uploaded</strong> to
        any server. We do not require an account, do not collect personal
        information, and do not sell data.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>
          <strong>Files you process:</strong> stay on your device. They are
          loaded into your browser&apos;s memory, transformed locally, and
          released when you close the page.
        </li>
        <li>
          <strong>Anonymous analytics:</strong> we use Vercel Analytics and
          Google Analytics 4 to count page views and measure performance. These
          tools may set cookies and collect your IP address (anonymized) and
          browser information.
        </li>
        <li>
          <strong>Advertising:</strong> we display advertisements from Google
          AdSense. Google may use cookies to serve relevant ads. You can review
          Google&apos;s practices at{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads policies
          </a>
          .
        </li>
        <li>
          <strong>Server logs:</strong> our hosting provider (Vercel) keeps
          short-lived request logs (IP, user-agent, path) for security and
          uptime purposes.
        </li>
      </ul>

      <h2>3. Cookies</h2>
      <p>We use cookies for the following categories:</p>
      <ul>
        <li>
          <strong>Necessary:</strong> session preferences (e.g., your selected
          language).
        </li>
        <li>
          <strong>Analytics:</strong> Vercel Analytics, Google Analytics 4 — set
          only after you accept the cookie banner.
        </li>
        <li>
          <strong>Advertising:</strong> Google AdSense — non-personalized ads
          are shown by default; personalized ads are enabled only if you opt in
          through the cookie banner.
        </li>
      </ul>

      <h2>4. Data sharing</h2>
      <p>
        We do not sell your personal data. Anonymous analytics and ad metrics
        are processed by Google and Vercel under their respective privacy
        policies.
      </p>

      <h2>5. Your rights (GDPR / CCPA)</h2>
      <p>
        Because we do not store personal data on our servers, there is nothing
        for us to delete or export. You can disable analytics and personalized
        ads at any time through the cookie banner or your browser settings.
        Contact us at{" "}
        <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a> for any
        privacy-related question.
      </p>

      <h2>6. Children</h2>
      <p>
        ConverterUp is not directed to children under 13. We do not knowingly
        collect data from children.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update this policy. Material changes will be reflected on this
        page with a new &quot;Last updated&quot; date.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions: <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a>
      </p>
    </>
  );
}

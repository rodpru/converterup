import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ConverterUp for support, feedback, or tool suggestions.",
  alternates: { canonical: "https://converterup.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>

      <p>
        We&apos;re a one-person project, so the fastest way to reach us is by
        email. Expect a reply within a few days.
      </p>

      <h2>General inquiries, bugs, feature requests</h2>
      <p>
        <a href="mailto:rgp.prt@gmail.com">rgp.prt@gmail.com</a>
      </p>

      <h2>Privacy or legal questions</h2>
      <p>
        Same address, but please put <em>&quot;Privacy&quot;</em> or{" "}
        <em>&quot;Legal&quot;</em> in the subject so we can prioritise.
      </p>

      <h2>What to include</h2>
      <ul>
        <li>The page or tool you were using.</li>
        <li>Your browser and operating system.</li>
        <li>For bug reports: the file type/size and what you expected to happen.</li>
      </ul>
    </>
  );
}

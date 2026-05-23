import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | ATS Resume Checker",
  description:
    "Review the Terms of Service for ATS Resume Checker, including acceptable use, account responsibilities, content rights, and service limitations.",
  keywords: [
    "ATS Resume Checker terms",
    "terms of service",
    "resume analysis terms",
    "AI resume checker terms",
    "account terms",
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | ATS Resume Checker",
    description:
      "Review the Terms of Service for ATS Resume Checker, including acceptable use, account responsibilities, content rights, and service limitations.",
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | ATS Resume Checker",
    description:
      "Review the Terms of Service for ATS Resume Checker, including acceptable use, account responsibilities, content rights, and service limitations.",
  },
};

const sections = [
  {
    title: "Agreement to These Terms",
    body: [
      "By accessing or using ATS Resume Checker, you agree to these Terms of Service and any additional terms that apply to specific features or services.",
      "If you do not agree to these terms, you should not use the platform.",
      "We may update these terms from time to time. Continued use of the service after changes take effect means you accept the revised terms.",
    ],
  },
  {
    title: "Who May Use the Service",
    body: [
      "You must be at least 13 years old to use the service, and if you are using it on behalf of a company or organization, you must have authority to bind that entity to these terms.",
      "You are responsible for providing accurate account information and for keeping your login credentials secure.",
    ],
  },
  {
    title: "The Service We Provide",
    body: [
      "ATS Resume Checker helps users analyze resumes against job descriptions, identify ATS compatibility issues, and generate improvement recommendations using software and AI-assisted tools.",
      "We may change, suspend, or discontinue parts of the service at any time, including features, pricing, availability, or limits, with or without notice where permitted by law.",
    ],
  },
  {
    title: "Acceptable Use",
    body: [
      "You agree not to misuse the service, upload malicious code, attempt unauthorized access, interfere with normal operation, or use the product in violation of applicable law.",
      "You may not scrape, reverse engineer, or attempt to extract source code, models, or proprietary systems except where such restrictions are prohibited by law.",
      "You must not upload content that infringes intellectual property rights, violates privacy, or includes unlawful, abusive, deceptive, or harmful material.",
    ],
  },
  {
    title: "User Content and Permissions",
    body: [
      "You retain ownership of the resumes, job descriptions, and other content you submit to the platform.",
      "You grant us a limited license to host, process, analyze, transmit, and display your content only as necessary to operate, maintain, and improve the service.",
      "You are responsible for confirming that you have the rights needed to upload and use the content you submit.",
    ],
  },
  {
    title: "AI Output and Recommendations",
    body: [
      "The service may generate scores, recommendations, rewritten content, summaries, and other outputs based on your inputs.",
      "AI-generated outputs are provided for informational purposes only and may contain inaccuracies, omissions, or formatting issues.",
      "You are responsible for reviewing and verifying any output before relying on it for job applications or professional use.",
    ],
  },
  {
    title: "Payments and Plans",
    body: [
      "If paid plans or billing features are offered, the applicable pricing, renewal, cancellation, and refund terms will be shown at the point of purchase or in the related subscription terms.",
      "We may change pricing or plan features in the future, subject to applicable notice requirements and law.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The service, including its design, software, branding, and underlying technology, is owned by us or our licensors and protected by intellectual property laws.",
      "Except for the rights expressly granted to you in these terms, we reserve all rights in and to the service.",
    ],
  },
  {
    title: "Termination",
    body: [
      "We may suspend or terminate your access if we believe you have violated these terms, created risk or legal exposure, or used the service in a harmful way.",
      "You may stop using the service at any time. Certain provisions, including those related to intellectual property, disclaimers, and liability limitations, will continue after termination.",
    ],
  },
  {
    title: "Disclaimer and Liability",
    body: [
      "The service is provided on an as-is and as-available basis to the extent permitted by law.",
      "We do not guarantee that the service will be uninterrupted, error-free, secure, or that it will produce any specific job-search outcome.",
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the service.",
    ],
  },
  {
    title: "Privacy",
    body: [
      "Your use of the service is also governed by our Privacy Policy, which explains how we collect and use personal information.",
      "Please review the Privacy Policy to understand how your data is handled and what choices you may have.",
    ],
  },
  {
    title: "Contact and Changes",
    body: [
      "If you have questions about these terms, use the support or contact options available in the product or account dashboard.",
      "We may update these terms from time to time and will revise the last updated date below when changes are made.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(to_bottom,_rgba(248,250,252,0.92),_rgba(241,245,249,0.55),_transparent_68%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(to_bottom,_rgba(2,6,23,0.92),_rgba(15,23,42,0.62),_transparent_68%)]" />
        <div className="container mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-12">
          <div className="mb-10 rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-medium tracking-wide text-primary">
                Legal
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  ATS Resume Checker
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Terms of Service
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base">
                  These terms explain how you may access and use the ATS Resume
                  Checker platform, what rights you have in the content you
                  submit, and the limitations that apply to AI-assisted output.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-background/70 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Quick facts
                </p>
                <ul className="mt-4 space-y-3 text-sm text-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    You keep ownership of your uploaded content.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    AI recommendations should always be reviewed before use.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    Misuse, abuse, or unlawful activity can lead to suspension.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <section className="mb-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Account use",
                text: "Keep credentials secure and make sure account details are accurate.",
              },
              {
                title: "Content rights",
                text: "You retain ownership of your uploads while granting the platform limited processing rights.",
              },
              {
                title: "AI limits",
                text: "Outputs are informational and may need human review before action is taken.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm"
              >
                <p className="mb-2 text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </section>

          <article className="space-y-6 rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-8">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <div className="space-y-3 text-[15px] leading-7 text-muted-foreground">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-border/70 bg-secondary/60 p-5">
              <h2 className="text-lg font-semibold text-foreground">
                Last Updated
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                These Terms of Service were last updated on May 23, 2026.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
                  Effective date: May 23, 2026
                </span>
                <Link
                  href="/privacy"
                  className="rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Read privacy policy
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

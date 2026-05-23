import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ATS Resume Checker",
  description:
    "Read how ATS Resume Checker collects, uses, and protects your information when you use the platform.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you provide directly, such as your name, email address, account details, and the resume or job description content you upload for analysis.",
      "We also collect technical and usage information, including device details, browser type, pages visited, feature interactions, IP address, and diagnostic logs.",
      "If you contact us for support, we may keep the contents of your message and any related metadata so we can respond and improve the service.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use your information to create and manage accounts, provide resume analysis, deliver AI-generated recommendations, and personalize your experience.",
      "We may also use information to improve product performance, monitor security, prevent abuse, troubleshoot issues, and comply with legal obligations.",
      "Where permitted, we may use aggregated or de-identified data to understand product usage and improve the platform.",
    ],
  },
  {
    title: "How We Share Information",
    body: [
      "We do not sell your personal information.",
      "We may share information with service providers that help us run the product, such as authentication, hosting, analytics, or infrastructure vendors.",
      "We may disclose information if required by law, to protect our rights or users, or in connection with a merger, acquisition, or similar business transaction.",
    ],
  },
  {
    title: "Cookies and Analytics",
    body: [
      "We may use cookies or similar technologies to keep you signed in, remember preferences, and understand how the product is used.",
      "Analytics tools may collect usage data to help us measure traffic, improve features, and diagnose performance issues.",
      "You can usually control cookies through your browser settings, but some features may not work as expected if cookies are disabled.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We keep personal information only as long as needed to provide the service, maintain your account, comply with legal obligations, resolve disputes, and enforce agreements.",
      "If you delete your account or request deletion, we will take reasonable steps to remove or anonymize your information, subject to legal or operational retention requirements.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use administrative, technical, and physical safeguards designed to protect your information.",
      "No system is completely secure, so we cannot guarantee absolute protection. We encourage you to use strong passwords and protect access to your account.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information.",
      "You may also be able to object to certain processing or withdraw consent where consent is the legal basis for processing.",
      "To exercise your rights, use the account controls available in the product or contact the site owner through the support channel provided in the app.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "This service is not intended for children under 13, and we do not knowingly collect personal information from them.",
      "If you believe a child has provided personal information, please contact us so we can review and delete it where appropriate.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.1),_transparent_26%),linear-gradient(to_bottom,_rgba(248,250,252,0.9),_rgba(241,245,249,0.55),_transparent_65%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(to_bottom,_rgba(2,6,23,0.92),_rgba(15,23,42,0.6),_transparent_65%)]" />
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
                  Privacy Policy
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base">
                  This policy explains what information we collect, how we use it,
                  and the choices you have when using the ATS Resume Checker
                  platform.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-background/70 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Quick facts
                </p>
                <ul className="mt-4 space-y-3 text-sm text-foreground">
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    We collect account, resume, and usage data to power analysis.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    We do not sell personal information.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    You can request access or deletion where applicable.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <section className="mb-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Service data",
                text: "Resume files, job descriptions, and account details used to generate analysis.",
              },
              {
                title: "Usage signals",
                text: "Feature interactions, device information, and diagnostic logs that help us improve performance.",
              },
              {
                title: "Your controls",
                text: "Account settings, deletion requests, and browser controls that let you manage your data.",
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
                Changes to This Policy
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the date below and, if the changes are material,
                take additional steps to notify you when appropriate.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
                  Last updated: May 23, 2026
                </span>
                <Link
                  href="/"
                  className="rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Back to home
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

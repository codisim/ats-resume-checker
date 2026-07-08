"use client";

import { useState } from "react";
import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileText,
  FlaskConical,
  Handshake,
  LifeBuoy,
  Layers,
  Megaphone,
  PenTool,
  Server,
  Settings,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SectionShell } from "./section-shell";

interface JobDescriptionTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Layers,
  FlaskConical,
  Code2,
  Server,
  BriefcaseBusiness,
  BarChart3,
  Brain,
  PenTool,
  Settings,
  Megaphone,
  Handshake,
  Users,
  LifeBuoy,
};

const sampleJobDescriptions: JobDescriptionTemplate[] = [
  {
    id: "developer-productivity-engineer",
    title: "Developer Productivity Engineer",
    description:
      "Join a team dedicated to helping fellow engineers ship code faster and with fewer headaches at a well-known open-source browser maker. Day to day, you would streamline how developers build, test, and debug their work, cutting down wasted time on flaky tests and slow feedback loops, while pushing for deeper automation and integration across the toolchain. The role involves partnering with engineers scattered across many time zones, reviewing code and offering technical guidance to peers, mentoring newer team members while also learning from senior ones, and digging into workflow data to spot patterns and build dashboards that reveal where the development process is slowing down. A strong candidate brings solid Python experience building real services, comfort with JavaScript on the front end, familiarity with frameworks like FastAPI, Flask, or Django, exposure to a major cloud provider, a good grasp of SQL and databases, hands-on use of CI/CD tools such as GitHub Actions or CircleCI, and ease moving between at least two operating systems. Bonus experience includes deep version-control knowledge, containerization with Docker, and running CI at large scale. This is a remote position with a generous benefits package including bonuses, strong health coverage, immediate retirement vesting, wellness days, and professional development funding.",
    icon: "Wrench",
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description:
      "A permanent, full-time role at a leading Irish private healthcare network, aimed at a developer who wants to grow their full-stack abilities inside a complex, regulated setting. You would help design, build, and maintain secure, scalable digital applications used across clinical systems and by patients directly, working alongside senior engineers, product managers, and UX designers to deliver polished, user-focused software. It's a good fit for someone with a couple of years of professional experience under their belt who is looking to level up rather than someone starting from scratch. Core requirements include a degree in computer science or a related field (or equivalent experience), two to four years of hands-on development work, practical skill with a modern frontend framework such as React, Angular, or Vue plus modern JavaScript or TypeScript, backend experience in something like Node.js, Java with Spring Boot, .NET, or Python, comfort building RESTful APIs, familiarity with relational or document databases such as PostgreSQL, MySQL, SQL Server, or MongoDB, and everyday use of Git in a team setting. Nice-to-haves include exposure to a cloud platform, Docker or similar container tooling, prior work in a regulated or enterprise environment, and some awareness of how healthcare systems and clinical workflows fit together. The advertised salary range is fifty to sixty thousand euros depending on experience.",
    icon: "Layers",
  },
  {
    id: "data-science-intern",
    title: "Data Science Intern",
    description:
      "A remote internship, aligned with EU working hours, for someone eager to apply data science to genuine business challenges as part of a collaborative, solutions-focused team. The internship typically runs three to six months with room to extend based on performance, and offers a competitive stipend. Responsibilities center on helping design data-driven solutions, cleaning and preparing both structured and unstructured datasets, building and evaluating machine learning models under the guidance of more senior data scientists, running exploratory analysis and turning it into clear, actionable takeaways, working closely with engineering, product, and business colleagues, contributing to pipelines, dashboards, and reporting tools, and writing up methods and findings so others can follow the work. Candidates should be currently studying or have recently finished a degree in data science, computer science, statistics, mathematics, or something related, with a solid base in Python libraries like Pandas, NumPy, and Scikit-learn, an understanding of core machine learning ideas such as regression, classification, and clustering, some experience with visualization tools like Matplotlib or Seaborn, familiarity with SQL, and the ability to work comfortably across EU time zones. It's a plus to have touched deep learning frameworks like TensorFlow or PyTorch, worked with a cloud platform, explored applications such as recommendation systems, NLP, or forecasting, done a prior internship or project in the field, or used Git. Beyond the technical checklist, the team is looking for genuine curiosity, a solutions-oriented mindset that turns analysis into real impact, and a strong sense of ownership over assigned work.",
    icon: "FlaskConical",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    description:
      "Build accessible, responsive React interfaces, collaborate with product and design teams, optimize web performance, and maintain reusable component systems using TypeScript.",
    icon: "Code2",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    description:
      "Design and maintain scalable APIs and microservices, own database schema and query performance, implement authentication and authorization, and ensure system reliability through monitoring and testing.",
    icon: "Server",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description:
      "Own product discovery, define roadmaps, translate customer insights into requirements, partner with engineering, and measure launches through adoption and retention metrics.",
    icon: "BriefcaseBusiness",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description:
      "Analyze business performance, build dashboards, write SQL queries, communicate insights to stakeholders, and recommend experiments based on customer and revenue data.",
    icon: "BarChart3",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Develop predictive models and machine learning pipelines, run statistical analyses, partner with product teams to define KPIs, and translate complex data into actionable business recommendations.",
    icon: "Brain",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description:
      "Conduct user research and usability testing, create wireframes and high-fidelity prototypes, collaborate with product and engineering on design systems, and advocate for accessible, user-centered design.",
    icon: "PenTool",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Build and maintain CI/CD pipelines, manage cloud infrastructure as code, improve deployment reliability and observability, and support engineering teams with scalable, secure infrastructure practices.",
    icon: "Settings",
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    description:
      "Develop and execute multichannel marketing campaigns, manage brand positioning and messaging, analyze campaign performance metrics, and collaborate with sales to drive qualified pipeline growth.",
    icon: "Megaphone",
  },
  {
    id: "sales-account-executive",
    title: "Sales Account Executive",
    description:
      "Manage the full sales cycle from prospecting to close, build relationships with key stakeholders, deliver product demos and proposals, and consistently meet or exceed quarterly revenue targets.",
    icon: "Handshake",
  },
  {
    id: "hr-business-partner",
    title: "HR Business Partner",
    description:
      "Partner with leadership on talent strategy, manage employee relations and performance processes, support organizational design initiatives, and champion a positive, inclusive workplace culture.",
    icon: "Users",
  },
  {
    id: "customer-success-manager",
    title: "Customer Success Manager",
    description:
      "Onboard and support enterprise customers, drive product adoption and retention, identify expansion opportunities, and act as the primary point of contact for account health and satisfaction.",
    icon: "LifeBuoy",
  },
];

type JobDescriptionPanelProps = {
  hasResume: boolean;
  resumeFileName?: string;
  isAnalyzing?: boolean;
  onAnalyze: (jobDescription: string) => Promise<void> | void;
};

export function JobDescriptionPanel({
  hasResume,
  resumeFileName,
  isAnalyzing = false,
  onAnalyze,
}: JobDescriptionPanelProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const characterCount = jobDescription.length;

  const handleSelectJob = (job: JobDescriptionTemplate) => {
    setSelectedJob(job.id);
    setJobDescription(job.description);
  };

  const handleAnalyze = () => {
    if (!hasResume || !jobDescription.trim()) {
      return;
    }

    onAnalyze(jobDescription);
  };

  return (
    <SectionShell
      badge="2"
      title="Job Description Selection"
      action={
        <span className="text-sm text-muted-foreground">
          {characterCount} / 5000
        </span>
      }
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full border border-border/60 bg-primary/10 text-primary">
              <CheckCircle2 className="size-4" />
            </span>
            <span className="text-sm text-muted-foreground">
              {hasResume
                ? "Resume ready" + (resumeFileName ? `: ${resumeFileName}` : "")
                : "Upload your resume first"}
            </span>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button type="button" variant="outline" className="w-full justify-center sm:w-auto">
                <FileText className="size-4 mr-2" />
                Sample Descriptions
              </Button>
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-xl">
              <DrawerHeader>
                <DrawerTitle className="text-xl font-semibold">Sample Job Descriptions</DrawerTitle>
                <DrawerDescription>Pick a sample to fill the job description field.</DrawerDescription>
              </DrawerHeader>

              <div className="flex flex-col gap-3 py-4 overflow-y-auto max-h-[60vh]">
                {sampleJobDescriptions.map((job) => {
                  const Icon = iconMap[job.icon] || FileText;
                  const isSelected = selectedJob === job.id;

                  return (
                    <div
                      key={job.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        isSelected
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/70 bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-foreground">{job.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      <DrawerClose asChild>
                        <Button
                          type="button"
                          variant={isSelected ? "secondary" : "outline"}
                          size="sm"
                          className="mt-4 w-full"
                          onClick={() => handleSelectJob(job)}
                        >
                          Use this
                        </Button>
                      </DrawerClose>
                    </div>
                  );
                })}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex-1">
          <textarea
            value={jobDescription}
            onChange={(event) => {
              setSelectedJob(null);
              setJobDescription(event.target.value);
            }}
            className="min-h-40 w-full rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground transition-all duration-200"
            placeholder="Paste job description or select from samples"
          />

          <div className="mt-3 text-xs text-muted-foreground">
            {characterCount} / 5000 characters
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <Button
            type="button"
            onClick={handleAnalyze}
            disabled={!hasResume || isAnalyzing || !jobDescription.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-95"
          >
            <Sparkles className="size-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze My Resume"}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

export default JobDescriptionPanel;

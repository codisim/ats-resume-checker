"use client";

import { useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionShell } from "./section-shell";

const jobDescriptionTemplates = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    description:
      "Build accessible, responsive React interfaces, collaborate with product and design teams, optimize web performance, and maintain reusable component systems using TypeScript.",
    icon: Code2,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description:
      "Own product discovery, define roadmaps, translate customer insights into requirements, partner with engineering, and measure launches through adoption and retention metrics.",
    icon: BriefcaseBusiness,
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description:
      "Analyze business performance, build dashboards, write SQL queries, communicate insights to stakeholders, and recommend experiments based on customer and revenue data.",
    icon: BarChart3,
  },
] as const;

type JobDescriptionTemplate = (typeof jobDescriptionTemplates)[number];

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
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Job Description Selection
          </span>
          <span className="text-xs text-muted-foreground">
            {characterCount} / 5000
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {jobDescriptionTemplates.map((job) => {
            const Icon = job.icon;
            const isSelected = selectedJob === job.id;

            return (
              <button
                key={job.id}
                type="button"
                onClick={() => handleSelectJob(job)}
                className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                  isSelected
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-primary">
                    {job.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {job.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

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

        <div className="flex-1">
          <p className="mb-2 text-sm text-muted-foreground">
            {hasResume
              ? "Paste a job description or select a template above."
              : "Upload your resume first, then select a job description."}
          </p>

          <textarea
            value={jobDescription}
            onChange={(event) => {
              setSelectedJob(null);
              setJobDescription(event.target.value);
            }}
            className="min-h-40 w-full rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground transition-all duration-200"
            placeholder="Paste job description or select from above"
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

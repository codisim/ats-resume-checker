"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "./section-shell";
import { JobDescriptions } from "./job-description-panel";
import { LucideIcon } from "lucide-react";

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
  const [selectedJob, setSelectedJob] = useState<JobDescriptions | null>(null);
  const characterCount = jobDescription.length;

  // Load job descriptions when component mounts
  useEffect(() => {
    // In a real application, this would fetch job descriptions from an API
    // For now, we assume they are available through the JobDescriptions import
  }, []);

  const handleSelectJob = (job: JobDescriptions) => {
    setSelectedJob(job);
    setJobDescription(job.description);
  };

  const handleAnalyze = () => {
    if (!hasResume) {
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: resumeFileName ? resumeFileName : "current-resume",
          resumeText: "resume-text-placeholder", // This would be the actual resume text
          jobDescription,
        }),
      };

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to analyze resume.");
      }

      setAnalysis(payload as AiAnalysisResult);
    } catch (analyzeError) {
      setError(
        analyzeError instanceof Error
          ? analyzeError.message
          : "Something went wrong during analysis."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SectionShell
      badge="2"
      title="Job Description Selection"
      action={<span className="text-sm text-muted-foreground">{characterCount} / 5000</span>}
    >
      <div className="flex h-full flex-col">
        {/* Job Description Selection Area */}
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Job Description Selection</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {characterCount} / 5000
            </span>
          </div>

          {/* Job Description Selection Grid */}
          <div className="flex flex-col gap-3">
            {JobDescriptions.map((job) => (
              <Link
                key={job.id}
                href="#"
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/30 hover:text-primary-600 transition-all"
              >
                <div className="flex items-center gap-2">
                  <LucideIcon name={job.iconKey} className="size-5 text-primary-foreground" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-primary">{job.title}</h3>
                    <p className="text-xs text-muted-foreground">{job.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Resume Status */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary-50 border border-border/60 p-1">
                {hasResume ? '✓' : '⚪'}
              </span>
              <span className="text-sm text-muted-foreground">
                {hasResume ? `Resume ready${resumeFileName ? `: ${resumeFileName}` : ""} : "Upload your resume first"}
              </span>
            </div>

            {/* Job Description Text Area */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                {hasResume
                  ? `Resume ready${resumeFileName ? `: ${resumeFileName}` : ""}.`
                  : "Upload your resume first, then select a job description."}
              </p>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground transition-all duration-200"
                placeholder="Paste job description or select from above"
              />

              <div className="mt-3 text-xs text-muted-foreground">
                {characterCount} / 5000 characters
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  onClick={() => handleAnalyze()}
                  disabled={!hasResume || isAnalyzing || !jobDescription.trim()}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-95 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="size-4" />
                    {isAnalyzing ? "Analyzing..." : "Analyze My Resume"}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

type JobDescriptionPanelProps = {
  hasResume: boolean;
  resumeFileName?: string;
  isAnalyzing?: boolean;
  onAnalyze: (jobDescription: string) => Promise<void> | void;
};

export default JobDescriptionPanel;
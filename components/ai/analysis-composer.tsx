import { JobDescriptionPanel } from "./job-description-panel"
import { UploadResumePanel } from "./upload-resume-panel"

export function AnalysisComposer() {
  return (
    <>
      <UploadResumePanel />
      <JobDescriptionPanel />
    </>
  )
}

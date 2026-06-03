"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PencilLine, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type ResumeOption = {
  id: string
  fileName: string
}

type SavedJobFormState = {
  company: string
  role: string
  status: "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED"
  appliedDate: string
  salary: string
  url: string
  notes: string
  resumeId: string
}

function createEmptyFormState(): SavedJobFormState {
  return {
    company: "",
    role: "",
    status: "APPLIED",
    appliedDate: new Date().toISOString().slice(0, 10),
    salary: "",
    url: "",
    notes: "",
    resumeId: "",
  }
}

function toFormState(
  application?: Partial<SavedJobFormState> | null
): SavedJobFormState {
  return {
    company: application?.company ?? "",
    role: application?.role ?? "",
    status: application?.status ?? "APPLIED",
    appliedDate: application?.appliedDate ?? new Date().toISOString().slice(0, 10),
    salary: application?.salary ?? "",
    url: application?.url ?? "",
    notes: application?.notes ?? "",
    resumeId: application?.resumeId ?? "",
  }
}

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null
  return payload?.error ?? "Something went wrong."
}

function JobFormFields({
  value,
  onChange,
  resumeOptions,
}: {
  value: SavedJobFormState
  onChange: (next: SavedJobFormState) => void
  resumeOptions: ResumeOption[]
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={value.company}
            onChange={(event) => onChange({ ...value, company: event.target.value })}
            placeholder="Acme Inc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={value.role}
            onChange={(event) => onChange({ ...value, role: event.target.value })}
            placeholder="Frontend Engineer"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={value.status}
            onChange={(event) =>
              onChange({
                ...value,
                status: event.target.value as SavedJobFormState["status"],
              })
            }
            className="border-input dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
          >
            {["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED"].map(
              (status) => (
                <option key={status} value={status}>
                  {status.toLowerCase()}
                </option>
              )
            )}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appliedDate">Applied date</Label>
          <Input
            id="appliedDate"
            type="date"
            value={value.appliedDate}
            onChange={(event) =>
              onChange({ ...value, appliedDate: event.target.value })
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            value={value.salary}
            onChange={(event) => onChange({ ...value, salary: event.target.value })}
            placeholder="USD 120k"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resumeId">Linked resume</Label>
          <select
            id="resumeId"
            value={value.resumeId}
            onChange={(event) =>
              onChange({ ...value, resumeId: event.target.value })
            }
            className="border-input dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
          >
            <option value="">No resume linked</option>
            {resumeOptions.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.fileName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Job link</Label>
        <Input
          id="url"
          value={value.url}
          onChange={(event) => onChange({ ...value, url: event.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={value.notes}
          onChange={(event) => onChange({ ...value, notes: event.target.value })}
          placeholder="Interview notes, salary notes, reminders..."
          className="min-h-[140px]"
        />
      </div>
    </div>
  )
}

export function SavedJobCreateAction({
  resumeOptions,
}: {
  resumeOptions: ResumeOption[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<SavedJobFormState>(() => createEmptyFormState())
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.")
      return
    }

    setError(null)
    setIsPending(true)
    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      setOpen(false)
      setForm(createEmptyFormState())
      router.refresh()
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create the job entry."
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setForm(createEmptyFormState())
          setOpen(true)
        }}
        className="w-fit"
      >
        <Plus className="size-4" />
        Add job
      </Button>

      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setForm(createEmptyFormState())
            setError(null)
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader className="px-0 pt-4">
            <SheetTitle className="text-2xl font-semibold text-foreground">
              Add Job
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Save a job application so you can track progress and link a resume.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            <JobFormFields value={form} onChange={setForm} resumeOptions={resumeOptions} />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setForm(createEmptyFormState())
                  setOpen(false)
                }}
                className="w-fit"
              >
                Cancel
              </Button>
              <Button type="button" onClick={submit} disabled={isPending} className="w-fit">
                {isPending ? "Saving..." : "Create job"}
              </Button>
            </div>

            {error && (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export function SavedJobEditAction({
  applicationId,
  initialValue,
  resumeOptions,
}: {
  applicationId: string
  initialValue: SavedJobFormState
  resumeOptions: ResumeOption[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<SavedJobFormState>(initialValue)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.")
      return
    }

    setError(null)
    setIsPending(true)
    try {
      const response = await fetch(`/api/job-applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      setOpen(false)
      router.refresh()
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update the job entry."
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          setForm(initialValue)
          setOpen(true)
        }}
        className="w-fit"
      >
        <PencilLine className="size-4" />
        Edit
      </Button>

      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setForm(initialValue)
            setError(null)
          }
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader className="px-0 pt-4">
            <SheetTitle className="text-2xl font-semibold text-foreground">
              Edit Job
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Update the details of this saved application.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            <JobFormFields value={form} onChange={setForm} resumeOptions={resumeOptions} />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setForm(initialValue)
                  setOpen(false)
                }}
                className="w-fit"
              >
                Cancel
              </Button>
              <Button type="button" onClick={submit} disabled={isPending} className="w-fit">
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>

            {error && (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export { createEmptyFormState, toFormState }

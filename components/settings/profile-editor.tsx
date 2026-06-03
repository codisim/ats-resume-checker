"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ProfileEditorProps = {
  fullName: string
  email: string
  country: string
  role: string
  planName: string
  weeklyLimit: number
}

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null
  return payload?.error ?? "Something went wrong."
}

export function ProfileEditor({
  fullName,
  email,
  country,
  role,
  planName,
  weeklyLimit,
}: ProfileEditorProps) {
  const router = useRouter()
  const [nameValue, setNameValue] = useState(fullName)
  const [countryValue, setCountryValue] = useState(country)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submit = async () => {
    if (!nameValue.trim()) {
      setError("Your full name is required.")
      return
    }

    setError(null)
    setSuccess(null)
    setIsPending(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: nameValue,
          country: countryValue,
        }),
      })

      if (!response.ok) {
        throw new Error(await readApiError(response))
      }

      setSuccess("Profile updated successfully.")
      router.refresh()
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update your profile."
      )
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="overflow-hidden border-border/70 bg-background/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      <CardHeader className="border-b border-border/70 bg-card/40 pb-4">
        <CardTitle className="text-xl text-foreground">Profile editor</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update the profile details your dashboard uses across the app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Full name</Label>
            <Input
              id="profile-name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" value={email} readOnly />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-country">Country</Label>
            <Input
              id="profile-country"
              value={countryValue}
              onChange={(event) => setCountryValue(event.target.value)}
              placeholder="Bangladesh"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-role">Role</Label>
            <Input id="profile-role" value={role} readOnly />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
            <p className="text-sm font-medium text-foreground">Current plan</p>
            <p className="mt-1 text-sm text-muted-foreground">{planName}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
            <p className="text-sm font-medium text-foreground">Weekly limit</p>
            <p className="mt-1 text-sm text-muted-foreground">{weeklyLimit} scans</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={submit} disabled={isPending}>
            {isPending ? "Saving..." : "Save profile"}
          </Button>
          <Badge variant="outline" className="border-border/70 bg-card/80">
            Changes apply to the dashboard immediately
          </Badge>
        </div>

        {error && (
          <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
            {success}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

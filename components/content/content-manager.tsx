"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  ArrowRight,
  CalendarDays,
  Copy,
  Eye,
  Plus,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  contentKindLabels,
  contentKindValues,
  normalizeSlug,
  type ContentKind,
} from "@/lib/content"
import { cn } from "@/lib/utils"
import { RichTextEditor } from "./rich-text-editor"

export type ContentListItem = {
  id: string
  kind: ContentKind
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

type DraftContent = {
  id: string | null
  kind: ContentKind
  title: string
  slug: string
  excerpt: string
  coverImage: string
  content: string
  published: boolean
}

function createEmptyDraft(kind: ContentKind = "BLOG"): DraftContent {
  return {
    id: null,
    kind,
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    content: "",
    published: false,
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export function ContentManager({
  initialItems,
}: {
  initialItems: ContentListItem[]
}) {
  const [items, setItems] = React.useState(initialItems)
  const [draft, setDraft] = React.useState<DraftContent>(() => createEmptyDraft())
  const [slugTouched, setSlugTouched] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const hasInitializedSelection = React.useRef(false)

  const activeItem = items.find((item) => item.id === draft.id) ?? null

  const syncDraft = React.useCallback((nextDraft: DraftContent) => {
    setDraft(nextDraft)
    setSlugTouched(false)
  }, [])

  const startNew = React.useCallback((kind: ContentKind = "BLOG") => {
    syncDraft(createEmptyDraft(kind))
  }, [syncDraft])

  React.useEffect(() => {
    if (!hasInitializedSelection.current && items.length > 0) {
      const firstItem = items[0]
      syncDraft({
        id: firstItem.id,
        kind: firstItem.kind,
        title: firstItem.title,
        slug: firstItem.slug,
        excerpt: firstItem.excerpt ?? "",
        coverImage: firstItem.coverImage ?? "",
        content: firstItem.content,
        published: firstItem.published,
      })
      hasInitializedSelection.current = true
    }
  }, [items, syncDraft])

  const handleSelectItem = (item: ContentListItem) => {
    syncDraft({
      id: item.id,
      kind: item.kind,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt ?? "",
      coverImage: item.coverImage ?? "",
      content: item.content,
      published: item.published,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      const payload = {
        kind: draft.kind,
        title: draft.title,
        slug: normalizeSlug(draft.slug || draft.title),
        excerpt: draft.excerpt,
        coverImage: draft.coverImage,
        content: draft.content,
        published: draft.published,
      }

      const response = await fetch(
        draft.id ? `/api/content/${draft.id}` : "/api/content",
        {
          method: draft.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      const data = (await response.json().catch(() => null)) as
        | { item?: ContentListItem; error?: string }
        | null

      if (!response.ok) {
        throw new Error(data?.error || "Failed to save content.")
      }

      const savedItem = data?.item
      if (!savedItem) {
        throw new Error("The server did not return the saved item.")
      }

      setItems((current) => {
        const withoutSaved = current.filter((item) => item.id !== savedItem.id)
        return [savedItem, ...withoutSaved].sort(
          (left, right) =>
            new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
        )
      })
      syncDraft({
        id: savedItem.id,
        kind: savedItem.kind,
        title: savedItem.title,
        slug: savedItem.slug,
        excerpt: savedItem.excerpt ?? "",
        coverImage: savedItem.coverImage ?? "",
        content: savedItem.content,
        published: savedItem.published,
      })
      toast.success(draft.id ? "Content updated." : "Content created.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save content.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!draft.id) {
      return
    }

    const confirmed = window.confirm(
      `Delete "${draft.title || "this item"}"? This cannot be undone.`
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/content/${draft.id}`, {
        method: "DELETE",
      })

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete content.")
      }

      setItems((current) => current.filter((item) => item.id !== draft.id))
      startNew(draft.kind)
      toast.success("Content deleted.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete content.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-4">
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Content library</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage blog posts and case studies from one reusable editor.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => startNew("BLOG")}
              >
                <Plus className="size-4" />
                Blog
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => startNew("CASE_STUDY")}
              >
                <Plus className="size-4" />
                Case study
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
                No content yet. Start with a blog post or case study.
              </div>
            ) : (
              items.map((item) => {
                const isActive = item.id === activeItem?.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition",
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-background hover:bg-secondary/50"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={item.kind === "BLOG" ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {contentKindLabels[item.kind]}
                          </Badge>
                          <Badge
                            variant={item.published ? "default" : "outline"}
                            className="rounded-full"
                          >
                            {item.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {item.excerpt || "No excerpt yet."}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span className="truncate">/{item.slug}</span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </button>
                )
              })
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl">
                  {draft.id ? "Edit content" : "Create content"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  One form handles both add and update flows.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-muted-foreground"
                  onClick={() => {
                    if (draft.id) {
                      const liveUrl =
                        draft.kind === "BLOG"
                          ? `/blog/${draft.slug}`
                          : `/case-studies/${draft.slug}`
                      window.open(liveUrl, "_blank", "noopener,noreferrer")
                    }
                  }}
                  disabled={!draft.id || !draft.published}
                >
                  <Eye className="size-4" />
                  Preview
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    if (draft.slug) {
                      navigator.clipboard.writeText(draft.slug)
                      toast.success("Slug copied.")
                    }
                  }}
                >
                  <Copy className="size-4" />
                  Slug
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="kind">Content type</Label>
                  <Select
                    value={draft.kind}
                    onValueChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        kind: value as ContentKind,
                      }))
                    }
                  >
                    <SelectTrigger id="kind" className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentKindValues.map((kind) => (
                        <SelectItem key={kind} value={kind}>
                          {contentKindLabels[kind]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="published" className="flex items-center gap-2">
                    <Checkbox
                      id="published"
                      checked={draft.published}
                      onCheckedChange={(checked) =>
                        setDraft((current) => ({
                          ...current,
                          published: checked === true,
                        }))
                      }
                    />
                    Publish now
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Published content is visible to everyone on the public site.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={draft.title}
                    onChange={(event) => {
                      const nextTitle = event.target.value
                      setDraft((current) => ({
                        ...current,
                        title: nextTitle,
                        slug: slugTouched ? current.slug : normalizeSlug(nextTitle),
                      }))
                    }}
                    placeholder="A practical guide to ATS-friendly resumes"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={draft.slug}
                    onChange={(event) => {
                      setSlugTouched(true)
                      setDraft((current) => ({
                        ...current,
                        slug: normalizeSlug(event.target.value),
                      }))
                    }}
                    placeholder="ats-friendly-resume-guide"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={draft.excerpt}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      excerpt: event.target.value,
                    }))
                  }
                  placeholder="Short summary for cards, shares, and previews."
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover image URL</Label>
                <Input
                  id="coverImage"
                  value={draft.coverImage}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      coverImage: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>Rich content</Label>
                <RichTextEditor
                  value={draft.content}
                  onChange={(value) =>
                    setDraft((current) => ({
                      ...current,
                      content: value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  <span>
                    {activeItem
                      ? `Updated ${formatDate(activeItem.updatedAt)}`
                      : "Create and publish when ready"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {draft.id ? (
                    <Button
                      type="button"
                      variant="destructive"
                      className="rounded-full"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="size-4" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => startNew(draft.kind)}
                  >
                    New {contentKindLabels[draft.kind]}
                  </Button>
                  <Button type="submit" className="rounded-full" disabled={isSaving}>
                    {isSaving ? "Saving..." : draft.id ? "Update content" : "Add content"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Live preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant={draft.kind === "BLOG" ? "default" : "secondary"}
                className="rounded-full"
              >
                {contentKindLabels[draft.kind]}
              </Badge>
              <Badge variant={draft.published ? "default" : "outline"} className="rounded-full">
                {draft.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">{draft.title || "Untitled content"}</h3>
              <p className="text-sm text-muted-foreground">
                /{draft.slug || "draft-slug"}
              </p>
              <p className="text-sm text-muted-foreground">
                {draft.excerpt || "Your excerpt will appear here."}
              </p>
            </div>
            <div
              className="content-body rounded-2xl border border-border bg-background px-4 py-5 text-sm leading-7"
              dangerouslySetInnerHTML={{
                __html:
                  draft.content ||
                  '<p class="text-muted-foreground">Start writing to preview the article body here.</p>',
              }}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

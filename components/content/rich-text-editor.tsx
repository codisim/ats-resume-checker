"use client"

import * as React from "react"
import {
  Bold,
  Code2,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Undo2,
  Underline,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

type CommandAction = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  command: string
  value?: string
}

const actions: CommandAction[] = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "Heading", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
  { label: "Bullet list", icon: List, command: "insertUnorderedList" },
  { label: "Numbered list", icon: ListOrdered, command: "insertOrderedList" },
  { label: "Code", icon: Code2, command: "formatBlock", value: "pre" },
]

function execCommand(command: string, value?: string) {
  if (typeof document === "undefined") {
    return
  }

  document.execCommand(command, false, value)
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content...",
  className,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const editor = editorRef.current

    if (!editor || editor.innerHTML === value) {
      return
    }

    editor.innerHTML = value
  }, [value])

  const handleInput = () => {
    const editor = editorRef.current

    onChange(editor?.innerHTML ?? "")
  }

  const handleAction = (command: CommandAction) => {
    editorRef.current?.focus()

    if (command.command === "createLink") {
      const nextUrl = window.prompt("Enter a link URL")
      if (!nextUrl) {
        return
      }
      execCommand(command.command, nextUrl)
      handleInput()
      return
    }

    execCommand(command.command, command.value)
    handleInput()
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-secondary/40 p-2">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Button
              key={action.label}
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
              title={action.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleAction(action)}
            >
              <Icon className="size-4" />
            </Button>
          )
        })}
        <div className="mx-1 h-6 w-px self-center bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
          title="Insert link"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => handleAction({ label: "Link", icon: Link2, command: "createLink" })}
        >
          <Link2 className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
          title="Undo"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            execCommand("undo")
            handleInput()
          }}
        >
          <Undo2 className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
          title="Redo"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            execCommand("redo")
            handleInput()
          }}
        >
          <Redo2 className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
          title="Clear formatting"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            execCommand("removeFormat")
            execCommand("unlink")
            handleInput()
          }}
        >
          <RemoveFormatting className="size-4" />
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
        className={cn(
          "min-h-[20rem] rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 shadow-xs outline-none",
          "content-body",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
          className
        )}
        data-placeholder={placeholder}
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  )
}

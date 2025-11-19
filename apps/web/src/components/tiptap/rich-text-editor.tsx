import "./tiptap.css";
import { useMutation } from "@tanstack/react-query";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { ImageExtension } from "@/components/tiptap/extensions/image";
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder";
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { TipTapFloatingMenu } from "./extensions/floating-menu";
import { FloatingToolbar } from "./extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          // never show the placeholder when editing code
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];

export function RichTextEditorDemo({
  className,
  content,
  lectureId,
}: {
  className?: string;
  content: string;
  lectureId: string;
}) {
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveNotes = useMutation(trpc.note.create.mutationOptions());

  const editorr = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      saveTimeout.current = setTimeout(async () => {
        const html = editor.getHTML();
        console.log(html);

        try {
          await saveNotes.mutateAsync({ content: html, lectureId });
        } catch (error) {
          console.error("Failed to save notes:", error);
        }

        // call your API here
        // saveToDb(html)
      }, 500); // debounce delay (ms)
    },
  });

  if (!editorr) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-64px)] min-w-full overflow-hidden overflow-y-scroll bg-card pb-[60px] sm:pb-0",
        className
      )}
    >
      {saveNotes.isPending && (
        <div className="absolute top-3 right-4 z-100">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      <EditorToolbar editor={editorr} />
      <FloatingToolbar editor={editorr} />
      <TipTapFloatingMenu editor={editorr} />
      <EditorContent
        className="min-h-[600px] w-full min-w-full cursor-text sm:p-6"
        editor={editorr}
      />
    </div>
  );
}

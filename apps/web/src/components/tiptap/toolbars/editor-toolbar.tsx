import type { Editor } from "@tiptap/core";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BlockquoteToolbar } from "./blockquote";
import { BoldToolbar } from "./bold";
import { CodeToolbar } from "./code";
import { CodeBlockToolbar } from "./code-block";
import { HeadingsToolbar } from "./headings";
import { ItalicToolbar } from "./italic";
import { RedoToolbar } from "./redo";
import { StrikeThroughToolbar } from "./strikethrough";
import { ToolbarProvider } from "./toolbar-provider";
import { UnderlineToolbar } from "./underline";
import { UndoToolbar } from "./undo";

export const EditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="sticky top-0 z-20 hidden w-full border-b bg-background sm:block">
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
          <ScrollArea className="h-fit py-0.5">
            <div>
              <div className="flex items-center gap-1 px-2">
                {/* History Group */}
                <UndoToolbar />
                <RedoToolbar />
                <Separator className="mx-1 h-7" orientation="vertical" />
                {/* Text Structure Group */}
                <HeadingsToolbar />
                <BlockquoteToolbar />
                <CodeToolbar />
                <CodeBlockToolbar />
                <Separator className="mx-1 h-7" orientation="vertical" />

                {/* Basic Formatting Group */}
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                {/*<LinkToolbar />*/}
                <Separator className="mx-1 h-7" orientation="vertical" />

                {/* Lists & Structure Group */}
                {/*<BulletListToolbar />*/}
                {/*<OrderedListToolbar />*/}
                {/*<HorizontalRuleToolbar />*/}
                {/*<Separator className="mx-1 h-7" orientation="vertical" />*/}

                {/* Alignment Group */}
                {/*<AlignmentTooolbar />*/}
                {/*<Separator className="mx-1 h-7" orientation="vertical" />*/}

                {/* Media & Styling Group */}
                {/*<ImagePlaceholderToolbar />*/}
                {/*<ColorHighlightToolbar />*/}
                {/*<Separator className="mx-1 h-7" orientation="vertical" />*/}

                <div className="flex-1" />

                {/* Utility Group */}
                {/*<SearchAndReplaceToolbar />*/}
              </div>
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
          </ScrollArea>
        </TooltipProvider>
      </ToolbarProvider>
    </div>
  );
};

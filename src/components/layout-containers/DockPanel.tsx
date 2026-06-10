/**
 * DockPanel
 * Hosts dockable panels and sidebars (such as explorer, search, and extensions),
 * and manages their layout and visibility.
 */
"use client";
import { useWorkspaceStore, type PanelKind } from "@/stores/workspace-store";
import { ProjectPanel } from "@/components/file-management/ProjectPanel";
import { GitPanel } from "@/components/sidebar-panels/GitPanel";
import { SearchPanel } from "@/components/sidebar-panels/SearchPanel";
import { TerminalPanel } from "@/components/terminal-console/TerminalPanel";
import { BrowserPanel } from "@/components/documentation-browser/BrowserPanel";
import { AIPanel } from "@/components/artificial-intelligence/AIPanel";
import { ExtensionsPanel } from "@/components/marketplace-extensions/ExtensionsPanel";
import { MarketplacePanel } from "@/components/marketplace-extensions/MarketplacePanel";
import { cn } from '@/lib/shared-utilities/cn';
import { ErrorBoundary } from "@/components/user-interface/ErrorBoundary";

function PanelContent({ panel }: { panel: PanelKind }) {
  let content;
  switch (panel) {
    case "project":
      content = <ProjectPanel />;
      break;
    case "git":
      content = <GitPanel />;
      break;
    case "search":
      content = <SearchPanel />;
      break;
    case "terminal":
      content = <TerminalPanel />;
      break;
    case "browser":
      content = <BrowserPanel />;
      break;
    case "ai":
      content = <AIPanel />;
      break;
    case "extensions":
      content = <ExtensionsPanel />;
      break;
    case "marketplace":
      content = <MarketplacePanel />;
      break;
    default:
      return null;
  }
  return <ErrorBoundary>{content}</ErrorBoundary>;
}

interface DockPanelProps {
  position: "left" | "right" | "bottom";
  panels: PanelKind[];
}

export function DockPanel({ position, panels }: DockPanelProps) {
  const dock = useWorkspaceStore((s) =>
    position === "left" ? s.leftDock : position === "right" ? s.rightDock : s.bottomDock
  );

  const hasBrowser = panels.includes("browser");

  return (
    <div className="flex h-full bg-bg0">
      <div className="flex-1 min-w-0 min-h-0 overflow-hidden relative">
        {/* Keep BrowserPanel always mounted to preserve iframe state */}
        {hasBrowser && (
          <div className={cn("w-full h-full", dock.activePanel !== "browser" && "hidden")}>
            <BrowserPanel />
          </div>
        )}
        {dock.activePanel !== "browser" && (
          <PanelContent panel={dock.activePanel} />
        )}
      </div>
    </div>
  );
}

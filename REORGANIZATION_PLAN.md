# Folder Reorganization Plan - Descriptive Naming

## New Structure Overview

```
src/
├── components/
│   ├── artificial-intelligence/     # AI-related components
│   ├── command-palette/              # Command palette & quick actions
│   ├── developer-tools/              # Dev tools & debugging
│   ├── documentation-browser/        # Browser & web viewing
│   ├── editor-workspace/             # Core editor components
│   ├── file-management/              # File tree & project navigation
│   ├── layout-containers/            # Layout & dock panels
│   ├── marketplace-extensions/       # Extension & marketplace UI
│   ├── modal-dialogs/                # All modal windows
│   ├── settings-configuration/       # Settings & keymap editors
│   ├── sidebar-panels/               # Side panels (git, search, etc.)
│   ├── terminal-console/             # Terminal components
│   ├── user-interface/               # Base UI components
│   └── window-chrome/                # Title bar, status bar, tabs
│
└── lib/
    ├── artificial-intelligence/      # AI SDK & integrations
    ├── command-palette/              # Palette history & logic
    ├── data-persistence/             # Database & snapshots
    ├── editor-core/                  # Editor logic & keybinds
    ├── extension-system/             # Extension host, loader, types
    ├── keyboard-input/               # Keybind dispatcher
    ├── marketplace-api/              # Marketplace integration
    ├── mock-testing/                 # Mock data for testing
    ├── shared-utilities/             # Utils, helpers, cn
    ├── sharing-collaboration/        # Share functionality
    └── theme-management/             # Themes, converter, registry
```

---

## Detailed Migration Plan

### 📁 `/src/lib/` Files → New Structure

#### **artificial-intelligence/** (AI SDK & integrations)
- `ai-sdk.ts` → `/src/lib/artificial-intelligence/ai-sdk.ts`

#### **command-palette/** (Palette history & logic)
- `palette-history.ts` → `/src/lib/command-palette/palette-history.ts`

#### **data-persistence/** (Database & snapshots)
- `snapshot-db.ts` → `/src/lib/data-persistence/snapshot-db.ts`

#### **editor-core/** (Editor logic from subdirectory)
- `editor/keybind-dispatcher.ts` → `/src/lib/editor-core/keybind-dispatcher.ts`
- `editor/mock-data.ts` → `/src/lib/editor-core/mock-data.ts`
- `keybind-dispatcher.ts` (root) → `/src/lib/editor-core/keybind-dispatcher-main.ts`

#### **extension-system/** (Extension host, loader, types)
- `extension-host.ts` → `/src/lib/extension-system/extension-host.ts`
- `extension-loader.ts` → `/src/lib/extension-system/extension-loader.ts`
- `extension-types.ts` → `/src/lib/extension-system/extension-types.ts`
- `builtin-extensions.ts` → `/src/lib/extension-system/builtin-extensions.ts`
- `extensions/*` → `/src/lib/extension-system/extensions/*`

#### **keyboard-input/** (Keybind dispatcher - if keeping separate from editor)
- Alternative location for `keybind-dispatcher.ts` if not editor-specific

#### **marketplace-api/** (Marketplace integration)
- `zed-marketplace.ts` → `/src/lib/marketplace-api/zed-marketplace.ts`
- `marketplace/*` → `/src/lib/marketplace-api/*`

#### **mock-testing/** (Mock data for testing)
- `mock-data.ts` → `/src/lib/mock-testing/mock-data.ts`

#### **shared-utilities/** (Utils, helpers, cn)
- `cn.ts` → `/src/lib/shared-utilities/cn.ts`
- `utils/*` → `/src/lib/shared-utilities/*`

#### **sharing-collaboration/** (Share functionality)
- `share.ts` → `/src/lib/sharing-collaboration/share.ts`

#### **theme-management/** (Themes, converter, registry)
- `themes.ts` → `/src/lib/theme-management/themes.ts`
- `theme-converter.ts` → `/src/lib/theme-management/theme-converter.ts`
- `theme-registry.ts` → `/src/lib/theme-management/theme-registry.ts`
- `theme/*` → `/src/lib/theme-management/*`

---

### 📦 `/src/components/` Files → New Structure

#### **artificial-intelligence/** (AI-related components)
- `AIPanel.tsx` → `/src/components/artificial-intelligence/AIPanel.tsx`

#### **command-palette/** (Command palette & quick actions)
- `CommandPalette.tsx` → `/src/components/command-palette/CommandPalette.tsx`
- `CtrlKMenu.tsx` → `/src/components/command-palette/CtrlKMenu.tsx`
- `palette/*` → `/src/components/command-palette/*`

#### **developer-tools/** (Dev tools & debugging)
- `PerfMonitor.tsx` → `/src/components/developer-tools/PerfMonitor.tsx`
- `RequestSender.tsx` → `/src/components/developer-tools/RequestSender.tsx`
- `tools/*` → `/src/components/developer-tools/*`

#### **documentation-browser/** (Browser & web viewing)
- `BrowserPanel.tsx` → `/src/components/documentation-browser/BrowserPanel.tsx`

#### **editor-workspace/** (Core editor components)
- `CodeEditor.tsx` → `/src/components/editor-workspace/CodeEditor.tsx`
- `EditorPane.tsx` → `/src/components/editor-workspace/EditorPane.tsx`
- `editor/*` → `/src/components/editor-workspace/*`

#### **file-management/** (File tree & project navigation)
- `FileTree.tsx` → `/src/components/file-management/FileTree.tsx`
- `ProjectPanel.tsx` → `/src/components/file-management/ProjectPanel.tsx`
- `HomeScreen.tsx` → `/src/components/file-management/HomeScreen.tsx`

#### **layout-containers/** (Layout & dock panels)
- `DockPanel.tsx` → `/src/components/layout-containers/DockPanel.tsx`
- `layout/*` → `/src/components/layout-containers/*`

#### **marketplace-extensions/** (Extension & marketplace UI)
- `ExtensionsPanel.tsx` → `/src/components/marketplace-extensions/ExtensionsPanel.tsx`
- `MarketplacePanel.tsx` → `/src/components/marketplace-extensions/MarketplacePanel.tsx`

#### **modal-dialogs/** (All modal windows)
- `BugReportModal.tsx` → `/src/components/modal-dialogs/BugReportModal.tsx`
- `ErrorReportModal.tsx` → `/src/components/modal-dialogs/ErrorReportModal.tsx`
- `SettingsModal.tsx` → `/src/components/modal-dialogs/SettingsModal.tsx`
- `modals/*` → `/src/components/modal-dialogs/*`

#### **settings-configuration/** (Settings & keymap editors)
- `KeymapEditor.tsx` → `/src/components/settings-configuration/KeymapEditor.tsx`

#### **sidebar-panels/** (Side panels: git, search, etc.)
- `GitPanel.tsx` → `/src/components/sidebar-panels/GitPanel.tsx`
- `SearchPanel.tsx` → `/src/components/sidebar-panels/SearchPanel.tsx`
- `panels/*` → `/src/components/sidebar-panels/*`

#### **terminal-console/** (Terminal components)
- `TerminalPanel.tsx` → `/src/components/terminal-console/TerminalPanel.tsx`

#### **user-interface/** (Base UI components)
- `ui/*` → `/src/components/user-interface/*`

#### **window-chrome/** (Title bar, status bar, tabs)
- `TitleBar.tsx` → `/src/components/window-chrome/TitleBar.tsx`
- `StatusBar.tsx` → `/src/components/window-chrome/StatusBar.tsx`
- `TabBar.tsx` → `/src/components/window-chrome/TabBar.tsx`

---

## Benefits of This Structure

1. **Self-Documenting**: Folder names clearly describe their purpose
2. **Scalable**: Easy to add new files to the right category
3. **Searchable**: Natural language names match developer mental models
4. **Domain-Driven**: Organized by feature/domain, not file type
5. **Maintainable**: Clear boundaries between different subsystems
6. **Onboarding-Friendly**: New developers can navigate intuitively

---

## Implementation Steps

1. Create all new directories
2. Move files to new locations
3. Update all import statements across the codebase
4. Update any configuration files (tsconfig paths, etc.)
5. Test the application
6. Remove empty old directories
7. Update documentation

---

## Alternative Shorter Names (if preferred)

If full descriptive names feel too long, here are balanced alternatives:

- `artificial-intelligence/` → `ai-features/`
- `command-palette/` → `command-ui/`
- `developer-tools/` → `dev-tools/`
- `documentation-browser/` → `doc-browser/`
- `editor-workspace/` → `editor-core/`
- `file-management/` → `file-nav/`
- `layout-containers/` → `layout/`
- `marketplace-extensions/` → `marketplace/`
- `modal-dialogs/` → `modals/`
- `settings-configuration/` → `config-ui/`
- `sidebar-panels/` → `side-panels/`
- `terminal-console/` → `terminal/`
- `user-interface/` → `ui-base/`
- `window-chrome/` → `window-ui/`
- `data-persistence/` → `persistence/`
- `extension-system/` → `extensions/`
- `keyboard-input/` → `keybindings/`
- `marketplace-api/` → `marketplace/`
- `mock-testing/` → `test-mocks/`
- `shared-utilities/` → `utils/`
- `sharing-collaboration/` → `sharing/`
- `theme-management/` → `theming/`

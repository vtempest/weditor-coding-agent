#!/bin/bash

# Update imports script for reorganization

cd /home/admin/Wedit

# Function to update imports in all files
update_imports() {
  find src -type f \( -name "*.ts" -o -name "*.tsx" \) ! -path "*/node_modules/*" -exec sed -i \
    -e "s|from ['\"]@/lib/ai-sdk|from '@/lib/artificial-intelligence/ai-sdk|g" \
    -e "s|from ['\"]@/lib/palette-history|from '@/lib/command-palette/palette-history|g" \
    -e "s|from ['\"]@/lib/snapshot-db|from '@/lib/data-persistence/snapshot-db|g" \
    -e "s|from ['\"]@/lib/keybind-dispatcher|from '@/lib/keyboard-input/keybind-dispatcher|g" \
    -e "s|from ['\"]@/lib/mock-data|from '@/lib/mock-testing/mock-data|g" \
    -e "s|from ['\"]@/lib/cn|from '@/lib/shared-utilities/cn|g" \
    -e "s|from ['\"]@/lib/share|from '@/lib/sharing-collaboration/share|g" \
    -e "s|from ['\"]@/lib/extension-host|from '@/lib/extension-system/extension-host|g" \
    -e "s|from ['\"]@/lib/extension-loader|from '@/lib/extension-system/extension-loader|g" \
    -e "s|from ['\"]@/lib/extension-types|from '@/lib/extension-system/extension-types|g" \
    -e "s|from ['\"]@/lib/builtin-extensions|from '@/lib/extension-system/builtin-extensions|g" \
    -e "s|from ['\"]@/lib/zed-marketplace|from '@/lib/marketplace-api/zed-marketplace|g" \
    -e "s|from ['\"]@/lib/themes|from '@/lib/theme-management/themes|g" \
    -e "s|from ['\"]@/lib/theme-converter|from '@/lib/theme-management/theme-converter|g" \
    -e "s|from ['\"]@/lib/theme-registry|from '@/lib/theme-management/theme-registry|g" \
    -e "s|from ['\"]@/components/AIPanel|from '@/components/artificial-intelligence/AIPanel|g" \
    -e "s|from ['\"]@/components/CommandPalette|from '@/components/command-palette/CommandPalette|g" \
    -e "s|from ['\"]@/components/CtrlKMenu|from '@/components/command-palette/CtrlKMenu|g" \
    -e "s|from ['\"]@/components/PerfMonitor|from '@/components/developer-tools/PerfMonitor|g" \
    -e "s|from ['\"]@/components/RequestSender|from '@/components/developer-tools/RequestSender|g" \
    -e "s|from ['\"]@/components/BrowserPanel|from '@/components/documentation-browser/BrowserPanel|g" \
    -e "s|from ['\"]@/components/CodeEditor|from '@/components/editor-workspace/CodeEditor|g" \
    -e "s|from ['\"]@/components/EditorPane|from '@/components/editor-workspace/EditorPane|g" \
    -e "s|from ['\"]@/components/FileTree|from '@/components/file-management/FileTree|g" \
    -e "s|from ['\"]@/components/ProjectPanel|from '@/components/file-management/ProjectPanel|g" \
    -e "s|from ['\"]@/components/HomeScreen|from '@/components/file-management/HomeScreen|g" \
    -e "s|from ['\"]@/components/DockPanel|from '@/components/layout-containers/DockPanel|g" \
    -e "s|from ['\"]@/components/ExtensionsPanel|from '@/components/marketplace-extensions/ExtensionsPanel|g" \
    -e "s|from ['\"]@/components/MarketplacePanel|from '@/components/marketplace-extensions/MarketplacePanel|g" \
    -e "s|from ['\"]@/components/BugReportModal|from '@/components/modal-dialogs/BugReportModal|g" \
    -e "s|from ['\"]@/components/ErrorReportModal|from '@/components/modal-dialogs/ErrorReportModal|g" \
    -e "s|from ['\"]@/components/SettingsModal|from '@/components/modal-dialogs/SettingsModal|g" \
    -e "s|from ['\"]@/components/KeymapEditor|from '@/components/settings-configuration/KeymapEditor|g" \
    -e "s|from ['\"]@/components/GitPanel|from '@/components/sidebar-panels/GitPanel|g" \
    -e "s|from ['\"]@/components/SearchPanel|from '@/components/sidebar-panels/SearchPanel|g" \
    -e "s|from ['\"]@/components/TerminalPanel|from '@/components/terminal-console/TerminalPanel|g" \
    -e "s|from ['\"]@/components/TitleBar|from '@/components/window-chrome/TitleBar|g" \
    -e "s|from ['\"]@/components/StatusBar|from '@/components/window-chrome/StatusBar|g" \
    -e "s|from ['\"]@/components/TabBar|from '@/components/window-chrome/TabBar|g" \
    {} \;
}

echo "Updating imports in all TypeScript files..."
update_imports

echo "Import updates complete!"

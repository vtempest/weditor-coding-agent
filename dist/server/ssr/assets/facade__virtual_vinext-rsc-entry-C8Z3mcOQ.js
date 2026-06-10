import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React__default, { createElement, forwardRef, useState, useCallback, useRef, useEffect, useContext, createContext, memo, useMemo, useImperativeHandle, Component, Suspense, lazy } from "react";
import { u as usePathname, g as getLayoutSegmentContext } from "../index.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";
let ErrorBoundary$1 = class ErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    if (error && typeof error === "object" && "digest" in error) {
      const digest = String(error.digest);
      if (digest === "NEXT_NOT_FOUND" || // legacy compat
      digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;") || digest.startsWith("NEXT_REDIRECT;")) {
        throw error;
      }
    }
    return { error };
  }
  reset = () => {
    this.setState({ error: null });
  };
  render() {
    if (this.state.error) {
      const FallbackComponent = this.props.fallback;
      return jsx(FallbackComponent, { error: this.state.error, reset: this.reset });
    }
    return this.props.children;
  }
};
class NotFoundBoundaryInner extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = { notFound: false, previousPathname: props.pathname };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pathname !== state.previousPathname && state.notFound) {
      return { notFound: false, previousPathname: props.pathname };
    }
    return { notFound: state.notFound, previousPathname: props.pathname };
  }
  static getDerivedStateFromError(error) {
    if (error && typeof error === "object" && "digest" in error) {
      const digest = String(error.digest);
      if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")) {
        return { notFound: true };
      }
    }
    throw error;
  }
  render() {
    if (this.state.notFound) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
function NotFoundBoundary({ fallback, children }) {
  const pathname = usePathname();
  return jsx(NotFoundBoundaryInner, { pathname, fallback, children });
}
function LayoutSegmentProvider({ depth, children }) {
  const ctx = getLayoutSegmentContext();
  if (!ctx) {
    return children;
  }
  return createElement(ctx.Provider, { value: depth }, children);
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React__default.useSyncExternalStore(
    api.subscribe,
    React__default.useCallback(() => selector(api.getState()), [api, selector]),
    React__default.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React__default.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
function detectLanguage(name) {
  const ext = name.split(".").pop()?.toLowerCase();
  const lower = name.toLowerCase();
  if (lower === "dockerfile" || lower.startsWith("dockerfile.")) return "dockerfile";
  if (lower === ".gitignore" || lower === ".npmignore" || lower === ".env" || lower.startsWith(".env.")) return "plaintext";
  const map = {
    js: "javascript",
    mjs: "javascript",
    cjs: "javascript",
    ts: "typescript",
    tsx: "typescriptreact",
    jsx: "javascriptreact",
    json: "json",
    jsonc: "json",
    md: "markdown",
    mdx: "markdown",
    css: "css",
    scss: "scss",
    less: "less",
    html: "html",
    htm: "html",
    xml: "xml",
    svg: "xml",
    py: "python",
    rs: "rust",
    toml: "toml",
    yaml: "yaml",
    yml: "yaml",
    sh: "shell",
    bash: "shell",
    zsh: "shell",
    txt: "plaintext",
    log: "plaintext",
    svelte: "svelte",
    vue: "vue",
    graphql: "graphql",
    gql: "graphql",
    sql: "sql",
    go: "go",
    java: "java",
    kt: "kotlin",
    rb: "ruby",
    php: "php",
    c: "c",
    h: "c",
    cpp: "cpp",
    hpp: "cpp",
    cs: "csharp",
    swift: "swift",
    r: "r",
    lua: "lua",
    perl: "perl",
    pl: "perl",
    ini: "ini",
    conf: "ini",
    cfg: "ini",
    lock: "plaintext"
  };
  return map[ext ?? ""] ?? "plaintext";
}
const DEFAULT_SETTINGS = {
  redact_private: false,
  telemetry: false,
  theme: "One Dark Pro",
  icon_theme: "Zed Icons",
  ui_font_size: 14,
  ui_font_family: "Zed Plex Sans",
  buffer_font_size: 14,
  buffer_font_family: "Zed Plex Mono",
  base_keymap: "VSCode",
  line_numbers: "on",
  minimap: false,
  word_wrap: "off",
  indent_guides: true,
  tab_size: 4,
  format_on_save: true,
  trim_whitespace: true,
  final_newline: true,
  cursor_blink: "smooth",
  cursor_shape: "bar",
  inlay_hints: false,
  auto_save: "afterDelay",
  terminal_font_size: 13,
  terminal_font_family: "Zed Plex Mono",
  terminal_cursor: "block",
  terminal_blinking: true,
  inline_completions: true,
  ai_provider: "Zed AI",
  openrouter_api_key: "",
  openrouter_model: "anthropic/claude-sonnet-4",
  github_token: ""
};
const STORAGE_KEY$1 = "weditor-settings";
function loadFromStorage() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY$1);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
function flushSettings() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY$1, JSON.stringify(useSettingsStore.getState().settings));
  } catch {
  }
}
const useSettingsStore = create((set) => ({
  settings: { ...DEFAULT_SETTINGS, ...loadFromStorage() },
  set: (key, value) => set((s) => {
    const next = { ...s.settings, [key]: value };
    return { settings: next };
  }),
  reset: () => set(() => {
    return { settings: { ...DEFAULT_SETTINGS } };
  })
}));
const DEFAULT_KEYBINDINGS = [
  // file
  { id: "kb-1", action: "file: open", keys: "Ctrl-P", context: "Global", source: "Default" },
  { id: "kb-2", action: "file: save", keys: "Ctrl-S", context: "Editor", source: "Default" },
  { id: "kb-3", action: "file: save all", keys: "Ctrl-Shift-S", context: "Global", source: "Default" },
  { id: "kb-4", action: "file: new file", keys: "Ctrl-N", context: "Global", source: "Default" },
  // edit
  { id: "kb-5", action: "edit: undo", keys: "Ctrl-Z", context: "Editor", source: "Default" },
  { id: "kb-6", action: "edit: redo", keys: "Ctrl-Shift-Z", context: "Editor", source: "Default" },
  { id: "kb-7", action: "edit: find in file", keys: "Ctrl-F", context: "Editor", source: "Default" },
  { id: "kb-8", action: "edit: find and replace", keys: "Ctrl-H", context: "Editor", source: "Default" },
  { id: "kb-50", action: "edit: select all", keys: "Ctrl-A", context: "Editor", source: "Default" },
  { id: "kb-51", action: "edit: cut", keys: "Ctrl-X", context: "Editor", source: "Default" },
  { id: "kb-52", action: "edit: copy", keys: "Ctrl-C", context: "Editor", source: "Default" },
  { id: "kb-53", action: "edit: paste", keys: "Ctrl-V", context: "Editor", source: "Default" },
  // search
  { id: "kb-9", action: "search: project search", keys: "Ctrl-Shift-F", context: "Global", source: "Default" },
  { id: "kb-10", action: "search: go to symbol", keys: "Ctrl-T", context: "Global", source: "Default" },
  // panes + tabs
  { id: "kb-11", action: "editor: split right", keys: "Ctrl-K Ctrl-Right", context: "Editor", source: "Default" },
  { id: "kb-12", action: "editor: split down", keys: "Ctrl-K Ctrl-Down", context: "Editor", source: "Default" },
  { id: "kb-28", action: "editor: close tab", keys: "Ctrl-W", context: "Editor", source: "Default" },
  { id: "kb-29", action: "editor: next tab", keys: "Ctrl-Tab", context: "Editor", source: "Default" },
  { id: "kb-30", action: "editor: previous tab", keys: "Ctrl-Shift-Tab", context: "Editor", source: "Default" },
  { id: "kb-54", action: "editor: close all tabs", keys: "Ctrl-K Ctrl-W", context: "Editor", source: "Default" },
  { id: "kb-55", action: "editor: close other tabs", keys: "", context: "Editor", source: "Default" },
  { id: "kb-56", action: "editor: close pane", keys: "", context: "Editor", source: "Default" },
  { id: "kb-57", action: "editor: maximize pane", keys: "Ctrl-Shift-M", context: "Editor", source: "Default" },
  { id: "kb-70", action: "editor: go to tab 1", keys: "Ctrl-1", context: "Editor", source: "Default" },
  { id: "kb-71", action: "editor: go to tab 2", keys: "Ctrl-2", context: "Editor", source: "Default" },
  { id: "kb-72", action: "editor: go to tab 3", keys: "Ctrl-3", context: "Editor", source: "Default" },
  { id: "kb-73", action: "editor: go to tab 4", keys: "Ctrl-4", context: "Editor", source: "Default" },
  { id: "kb-74", action: "editor: go to tab 5", keys: "Ctrl-5", context: "Editor", source: "Default" },
  { id: "kb-75", action: "editor: go to tab 6", keys: "Ctrl-6", context: "Editor", source: "Default" },
  { id: "kb-76", action: "editor: go to tab 7", keys: "Ctrl-7", context: "Editor", source: "Default" },
  { id: "kb-77", action: "editor: go to tab 8", keys: "Ctrl-8", context: "Editor", source: "Default" },
  { id: "kb-78", action: "editor: go to last tab", keys: "Ctrl-9", context: "Editor", source: "Default" },
  // text editing
  { id: "kb-33", action: "editor: toggle comment", keys: "Ctrl-/", context: "Editor", source: "Default" },
  { id: "kb-34", action: "editor: indent line", keys: "Tab", context: "Editor", source: "Default" },
  { id: "kb-35", action: "editor: outdent line", keys: "Shift-Tab", context: "Editor", source: "Default" },
  { id: "kb-36", action: "editor: move line up", keys: "Alt-Up", context: "Editor", source: "Default" },
  { id: "kb-37", action: "editor: move line down", keys: "Alt-Down", context: "Editor", source: "Default" },
  { id: "kb-38", action: "editor: duplicate line", keys: "Shift-Alt-Down", context: "Editor", source: "Default" },
  { id: "kb-39", action: "editor: delete line", keys: "Ctrl-Shift-K", context: "Editor", source: "Default" },
  { id: "kb-40", action: "editor: select all occurrences", keys: "Ctrl-Shift-L", context: "Editor", source: "Default" },
  { id: "kb-41", action: "editor: add cursor above", keys: "Ctrl-Alt-Up", context: "Editor", source: "Default" },
  { id: "kb-42", action: "editor: add cursor below", keys: "Ctrl-Alt-Down", context: "Editor", source: "Default" },
  // view
  { id: "kb-13", action: "view: toggle terminal", keys: "Ctrl-`", context: "Global", source: "Default" },
  { id: "kb-14", action: "view: toggle sidebar", keys: "Ctrl-B", context: "Global", source: "Default" },
  { id: "kb-15", action: "view: command palette", keys: "Ctrl-Shift-P", context: "Global", source: "Default" },
  { id: "kb-16", action: "view: toggle minimap", keys: "", context: "Editor", source: "Default" },
  { id: "kb-17", action: "view: zoom in", keys: "Ctrl-=", context: "Global", source: "Default" },
  { id: "kb-18", action: "view: zoom out", keys: "Ctrl--", context: "Global", source: "Default" },
  { id: "kb-58", action: "view: reset zoom", keys: "Ctrl-0", context: "Global", source: "Default" },
  { id: "kb-31", action: "view: toggle right panel", keys: "Ctrl-Shift-B", context: "Global", source: "Default" },
  { id: "kb-32", action: "view: toggle bottom panel", keys: "Ctrl-J", context: "Global", source: "Default" },
  { id: "kb-59", action: "view: maximize panel", keys: "", context: "Global", source: "Default" },
  { id: "kb-60", action: "view: focus editor", keys: "", context: "Global", source: "Default" },
  { id: "kb-61", action: "view: focus terminal", keys: "", context: "Global", source: "Default" },
  // navigation
  { id: "kb-19", action: "go: definition", keys: "F12", context: "Editor", source: "Default" },
  { id: "kb-20", action: "go: references", keys: "Shift-F12", context: "Editor", source: "Default" },
  { id: "kb-21", action: "go: line", keys: "Ctrl-G", context: "Editor", source: "Default" },
  { id: "kb-62", action: "go: back", keys: "Alt-Left", context: "Editor", source: "Default" },
  { id: "kb-63", action: "go: forward", keys: "Alt-Right", context: "Editor", source: "Default" },
  { id: "kb-64", action: "go: home", keys: "", context: "Global", source: "Default" },
  // terminal
  { id: "kb-22", action: "terminal: new terminal", keys: "Ctrl-Shift-`", context: "Terminal", source: "Default" },
  // git
  { id: "kb-23", action: "git: commit", keys: "", context: "Global", source: "Default" },
  { id: "kb-24", action: "git: push", keys: "", context: "Global", source: "Default" },
  { id: "kb-25", action: "git: pull", keys: "", context: "Global", source: "Default" },
  { id: "kb-65", action: "git: focus", keys: "Ctrl-Shift-G", context: "Global", source: "Default" },
  // browser
  { id: "kb-79", action: "view: open browser tab", keys: "Ctrl-Shift-I", context: "Global", source: "Default" },
  // theme / settings
  { id: "kb-26", action: "theme: select theme", keys: "Ctrl-K Ctrl-T", context: "Global", source: "Default" },
  { id: "kb-27", action: "settings: open", keys: "Ctrl-,", context: "Global", source: "Default" },
  { id: "kb-66", action: "settings: open keymap", keys: "Ctrl-K Ctrl-S", context: "Global", source: "Default" },
  // project panel
  { id: "kb-67", action: "project: collapse all", keys: "", context: "Global", source: "Default" },
  { id: "kb-68", action: "project: reveal active file", keys: "Ctrl-Shift-.", context: "Global", source: "Default" },
  { id: "kb-69", action: "project: focus", keys: "Ctrl-Shift-E", context: "Global", source: "Default" }
];
const STORAGE_KEY = "weditor-keybindings";
function loadUserKeybindings() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function flushKeybindings() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(useKeymapStore.getState().userBindings));
  } catch {
  }
}
function mergeBindings(defaults, userBindings) {
  const result = defaults.map((d) => {
    const override = userBindings.find((u) => u.action === d.action && u.context === d.context);
    if (override) return { ...d, keys: override.keys, source: "User" };
    return d;
  });
  for (const u of userBindings) {
    if (!defaults.some((d) => d.action === u.action && d.context === u.context)) {
      result.push(u);
    }
  }
  return result;
}
function initNextId(bindings) {
  let max = 1e3;
  for (const b of bindings) {
    const m = b.id.match(/^kb-user-(\d+)$/);
    if (m) max = Math.max(max, Number(m[1]) + 1);
  }
  return max;
}
const useKeymapStore = create((set, get) => {
  const userBindings = loadUserKeybindings();
  let _nextUserBindingId = initNextId(userBindings);
  return {
    bindings: mergeBindings(DEFAULT_KEYBINDINGS, userBindings),
    userBindings,
    updateBinding: (id, keys) => {
      const s = get();
      const binding = s.bindings.find((b) => b.id === id);
      if (!binding) return;
      const newUserBindings = [...s.userBindings];
      const existingIdx = newUserBindings.findIndex((u) => u.action === binding.action && u.context === binding.context);
      if (existingIdx >= 0) {
        newUserBindings[existingIdx] = { ...newUserBindings[existingIdx], keys };
      } else {
        newUserBindings.push({ ...binding, keys, source: "User" });
      }
      set({
        userBindings: newUserBindings,
        bindings: mergeBindings(DEFAULT_KEYBINDINGS, newUserBindings)
      });
    },
    addBinding: (action, keys, context) => {
      const id = `kb-user-${_nextUserBindingId++}`;
      const newBinding = { id, action, keys, context, source: "User" };
      const newUserBindings = [...get().userBindings, newBinding];
      set({
        userBindings: newUserBindings,
        bindings: mergeBindings(DEFAULT_KEYBINDINGS, newUserBindings)
      });
    },
    removeUserBinding: (id) => {
      const s = get();
      const newUserBindings = s.userBindings.filter((u) => u.id !== id);
      set({
        userBindings: newUserBindings,
        bindings: mergeBindings(DEFAULT_KEYBINDINGS, newUserBindings)
      });
    },
    resetBinding: (id) => {
      const s = get();
      const binding = s.bindings.find((b) => b.id === id);
      if (!binding) return;
      const newUserBindings = s.userBindings.filter((u) => !(u.action === binding.action && u.context === binding.context));
      set({
        userBindings: newUserBindings,
        bindings: mergeBindings(DEFAULT_KEYBINDINGS, newUserBindings)
      });
    },
    getJSON: () => {
      return JSON.stringify(get().userBindings, null, 2);
    }
  };
});
const SPECIAL_TAB_PREFIX = "tab:";
function getTabType(tabId) {
  if (tabId.startsWith(SPECIAL_TAB_PREFIX)) {
    const type = tabId.slice(SPECIAL_TAB_PREFIX.length);
    if (type === "keymap" || type === "browser" || type === "ai") return type;
  }
  return "file";
}
function getTabLabel(tabId) {
  switch (tabId) {
    case "tab:keymap":
      return "Keymap";
    case "tab:browser":
      return "Browser";
    case "tab:ai":
      return "AI Assistant";
    default:
      return tabId.split("/").pop() || tabId;
  }
}
function isSpecialTab(tabId) {
  return tabId.startsWith(SPECIAL_TAB_PREFIX);
}
const PROJECTS_KEY = "weditor-projects";
const PROJECT_LAYOUT_PREFIX = "weditor-layout-";
function loadProjects() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveProjects(projects) {
  if (typeof window === "undefined") return;
  setTimeout(() => {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch {
    }
  }, 0);
}
function loadProjectLayout(projectId) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROJECT_LAYOUT_PREFIX + projectId);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveProjectLayout(projectId, layout) {
  if (typeof window === "undefined") return;
  setTimeout(() => {
    try {
      localStorage.setItem(PROJECT_LAYOUT_PREFIX + projectId, JSON.stringify(layout));
    } catch {
    }
  }, 0);
}
function saveProjectLayoutSync(projectId, layout) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECT_LAYOUT_PREFIX + projectId, JSON.stringify(layout));
  } catch {
  }
}
let _nextId = Date.now();
function uid() {
  return `n${_nextId++}`;
}
function puid() {
  return `pane-${_nextId++}`;
}
let _bootGeneration = 0;
function findLeafByPaneId(node, paneId) {
  if (node.type === "leaf" && node.paneId === paneId) return node;
  if (node.children) {
    for (const c of node.children) {
      const found = findLeafByPaneId(c, paneId);
      if (found) return found;
    }
  }
  return null;
}
function collectPaneIds(node) {
  if (node.type === "leaf" && node.paneId) return [node.paneId];
  if (node.children) return node.children.flatMap(collectPaneIds);
  return [];
}
function cleanupTree(node) {
  if (node.type === "leaf") return node;
  if (!node.children || node.children.length === 0) return node;
  let children = node.children.map(cleanupTree);
  let sizes = node.sizes ? [...node.sizes] : children.map(() => 1e3);
  const flatChildren = [];
  const flatSizes = [];
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    if (c.type === node.type && c.children && c.children.length > 0) {
      const childTotal = (c.sizes || c.children.map(() => 1e3)).reduce((a, b) => a + b, 0);
      const parentSize = sizes[i];
      for (let j = 0; j < c.children.length; j++) {
        flatChildren.push(c.children[j]);
        flatSizes.push((c.sizes?.[j] ?? 1e3) / childTotal * parentSize);
      }
    } else {
      flatChildren.push(c);
      flatSizes.push(sizes[i]);
    }
  }
  if (flatChildren.length === 0) return { id: node.id, type: "leaf" };
  if (flatChildren.length === 1) return flatChildren[0];
  return { ...node, children: flatChildren, sizes: flatSizes };
}
function removeLeaf(root, paneId) {
  if (root.type === "leaf") {
    if (root.paneId === paneId) return { id: root.id, type: "leaf" };
    return root;
  }
  if (!root.children) return root;
  const newChildren = [];
  const newSizes = [];
  for (let i = 0; i < root.children.length; i++) {
    const c = root.children[i];
    if (c.type === "leaf" && c.paneId === paneId) continue;
    newChildren.push(removeLeaf(c, paneId));
    newSizes.push(root.sizes?.[i] ?? 1e3);
  }
  return cleanupTree({ ...root, children: newChildren, sizes: newSizes });
}
function insertAtLeaf(root, targetNodeId, newPaneId, zone) {
  if (root.id === targetNodeId && root.type === "leaf") {
    if (zone === "center") return root;
    const dir = zone === "left" || zone === "right" ? "row" : "column";
    const newLeaf = { id: uid(), type: "leaf", paneId: newPaneId };
    const first = zone === "left" || zone === "top";
    return {
      id: uid(),
      type: dir,
      children: first ? [newLeaf, root] : [root, newLeaf],
      sizes: [1e3, 1e3]
    };
  }
  if (!root.children) return root;
  return cleanupTree({
    ...root,
    children: root.children.map((c) => insertAtLeaf(c, targetNodeId, newPaneId, zone)),
    sizes: root.sizes
  });
}
function findNodeByPath(tree, path) {
  for (const node of tree) {
    if (node.path === path) return node;
    if (node.children) {
      const found = findNodeByPath(node.children, path);
      if (found) return found;
    }
  }
  return null;
}
function collectFilePaths(node) {
  const result = [];
  if (node.type === "file" && node.path) result.push(node.path);
  if (node.children) {
    for (const c of node.children) result.push(...collectFilePaths(c));
  }
  return result;
}
let _nodepodStoreCache = null;
async function getNodepod() {
  if (!_nodepodStoreCache) _nodepodStoreCache = await Promise.resolve().then(() => nodepodStore);
  return _nodepodStoreCache.useNodepodStore.getState().instance;
}
async function saveCurrentSnapshot() {
  if (!_nodepodStoreCache) _nodepodStoreCache = await Promise.resolve().then(() => nodepodStore);
  await _nodepodStoreCache.useNodepodStore.getState().saveSnapshot();
}
function pushHistory(pane, filePath) {
  if (pane.tabHistory[pane.historyIndex] === filePath) return pane;
  const tabHistory = [...pane.tabHistory.slice(0, pane.historyIndex + 1), filePath];
  return { tabHistory, historyIndex: tabHistory.length - 1 };
}
const mainPaneId = "pane-1";
function uniqueProjectName(baseName, existing) {
  const names = new Set(existing.map((p) => p.name));
  if (!names.has(baseName)) return baseName;
  let i = 2;
  while (names.has(`${baseName} #${i}`)) i++;
  return `${baseName} #${i}`;
}
const INITIAL_PROJECTS = [];
const INITIAL_TEMPLATES = [
  { id: "blank", name: "Empty Project", description: "Start from scratch" },
  { id: "react", name: "React", description: "Vite + React starter", startupCommand: "npm install && npx vite" },
  { id: "node", name: "Node.js", description: "Node.js server", startupCommand: "node index.js" },
  { id: "vite", name: "Vite", description: "Vanilla JS with Vite", startupCommand: "npm install && npx vite" }
];
const useWorkspaceStore = create((set, get) => ({
  currentProject: null,
  projects: INITIAL_PROJECTS,
  templates: INITIAL_TEMPLATES,
  showHomeScreen: true,
  homeSearch: "",
  pendingTemplateId: null,
  leftDock: { visible: true, width: 260, activePanel: "project" },
  rightDock: { visible: false, width: 500, activePanel: "ai" },
  bottomDock: { visible: true, height: 240, activePanel: "terminal" },
  panes: {
    [mainPaneId]: { id: mainPaneId, tabs: [], activeTab: "", tabHistory: [], historyIndex: 0 }
  },
  activePaneId: mainPaneId,
  splitLayout: { id: "root", type: "leaf", paneId: mainPaneId },
  openFiles: {},
  projectFiles: [],
  paletteOpen: false,
  paletteInitialPrefix: "",
  themePickerOpen: false,
  settingsOpen: false,
  userMenuOpen: false,
  ctrlKMenuOpen: false,
  bugReportOpen: false,
  maximizedPaneId: null,
  bottomDockMaximized: false,
  collapseCounter: 0,
  dragState: null,
  openProject: (projectId) => {
    const s = get();
    const hadProject = s.currentProject && !s.showHomeScreen;
    if (hadProject) {
      const pane = s.panes[s.activePaneId];
      saveProjectLayout(s.currentProject.id, {
        leftDock: s.leftDock,
        rightDock: s.rightDock,
        bottomDock: s.bottomDock,
        openTabPaths: pane?.tabs || [],
        activeTabPath: pane?.activeTab || ""
      });
    }
    const project = s.projects.find((p) => p.id === projectId);
    if (!project) return;
    const updatedProjects = s.projects.map(
      (p) => p.id === projectId ? { ...p, lastOpened: Date.now() } : p
    );
    saveProjects(updatedProjects);
    get().resetEditorState();
    const layout = loadProjectLayout(projectId);
    const updates = {
      currentProject: { ...project, lastOpened: Date.now() },
      projects: updatedProjects,
      showHomeScreen: false,
      pendingTemplateId: project.templateId || "blank"
    };
    if (layout) {
      const VALID_PANELS = /* @__PURE__ */ new Set(["project", "git", "search", "terminal", "browser", "ai"]);
      if (layout.leftDock && typeof layout.leftDock.visible === "boolean" && VALID_PANELS.has(layout.leftDock.activePanel)) {
        updates.leftDock = layout.leftDock;
      }
      if (layout.rightDock && typeof layout.rightDock.visible === "boolean" && VALID_PANELS.has(layout.rightDock.activePanel)) {
        updates.rightDock = layout.rightDock;
      }
      if (layout.bottomDock && typeof layout.bottomDock.visible === "boolean" && VALID_PANELS.has(layout.bottomDock.activePanel)) {
        updates.bottomDock = layout.bottomDock;
      }
    }
    set(updates);
    const gen = ++_bootGeneration;
    (async () => {
      try {
        if (hadProject) await saveCurrentSnapshot();
        const { useNodepodStore: useNodepodStore2 } = await Promise.resolve().then(() => nodepodStore);
        useNodepodStore2.getState().teardown();
        if (gen !== _bootGeneration) return;
        await useNodepodStore2.getState().boot(project.templateId || "blank");
        if (layout?.openTabPaths?.length) {
          for (const tab of layout.openTabPaths) {
            get().openTab(tab);
          }
          if (layout.activeTabPath) {
            get().openTab(layout.activeTabPath);
          }
        }
      } catch (e) {
        console.error("Failed to reboot nodepod:", e);
      }
    })();
  },
  openTemplate: (templateId) => {
    const s = get();
    const hadProject = s.currentProject && !s.showHomeScreen;
    if (hadProject) {
      const pane = s.panes[s.activePaneId];
      saveProjectLayout(s.currentProject.id, {
        leftDock: s.leftDock,
        rightDock: s.rightDock,
        bottomDock: s.bottomDock,
        openTabPaths: pane?.tabs || [],
        activeTabPath: pane?.activeTab || ""
      });
    }
    const template = s.templates.find((t) => t.id === templateId);
    if (!template) return;
    const now = Date.now();
    const baseName = template.name === "Empty Project" ? "Untitled" : `${template.name} Project`;
    const newProject = {
      id: `${template.id}-${now}`,
      name: uniqueProjectName(baseName, s.projects),
      lastOpened: now,
      createdAt: now,
      templateId: template.id
    };
    const updatedProjects = [newProject, ...s.projects];
    saveProjects(updatedProjects);
    get().resetEditorState();
    set({
      currentProject: newProject,
      projects: updatedProjects,
      showHomeScreen: false,
      pendingTemplateId: templateId
    });
    if (template.startupCommand) {
      get().openTab("tab:browser");
    }
    const gen = ++_bootGeneration;
    (async () => {
      try {
        if (hadProject) await saveCurrentSnapshot();
        const { useNodepodStore: useNodepodStore2 } = await Promise.resolve().then(() => nodepodStore);
        useNodepodStore2.getState().teardown();
        if (gen !== _bootGeneration) return;
        await useNodepodStore2.getState().boot(templateId);
      } catch (e) {
        console.error("Failed to boot nodepod:", e);
      }
    })();
  },
  goHome: () => {
    const s = get();
    if (s.currentProject && !s.showHomeScreen) {
      const pane = s.panes[s.activePaneId];
      saveProjectLayout(s.currentProject.id, {
        leftDock: s.leftDock,
        rightDock: s.rightDock,
        bottomDock: s.bottomDock,
        openTabPaths: pane?.tabs || [],
        activeTabPath: pane?.activeTab || ""
      });
      saveCurrentSnapshot();
    }
    set({ showHomeScreen: true, homeSearch: "" });
  },
  setHomeSearch: (q) => set({ homeSearch: q }),
  toggleLeftDock: () => set((s) => ({ leftDock: { ...s.leftDock, visible: !s.leftDock.visible } })),
  toggleRightDock: () => set((s) => ({ rightDock: { ...s.rightDock, visible: !s.rightDock.visible } })),
  toggleBottomDock: () => set((s) => ({ bottomDock: { ...s.bottomDock, visible: !s.bottomDock.visible } })),
  resizeLeftDock: (delta) => set((s) => ({ leftDock: { ...s.leftDock, width: Math.max(180, Math.min(s.leftDock.width + delta, 600)) } })),
  resizeRightDock: (delta) => set((s) => ({ rightDock: { ...s.rightDock, width: Math.max(300, Math.min(s.rightDock.width - delta, 1200)) } })),
  resizeBottomDock: (delta) => set((s) => ({ bottomDock: { ...s.bottomDock, height: Math.max(100, Math.min(s.bottomDock.height - delta, 600)) } })),
  setLeftPanel: (p) => set((s) => ({ leftDock: { ...s.leftDock, activePanel: p, visible: true } })),
  setRightPanel: (p) => set((s) => ({ rightDock: { ...s.rightDock, activePanel: p, visible: true } })),
  setBottomPanel: (p) => set((s) => ({ bottomDock: { ...s.bottomDock, activePanel: p, visible: true } })),
  openTab: (filePath, paneId) => {
    const s = get();
    const targetId = paneId || s.activePaneId;
    const pane = s.panes[targetId];
    if (!pane) return;
    const hist = pushHistory(pane, filePath);
    if (pane.tabs.includes(filePath)) {
      set({ panes: { ...s.panes, [pane.id]: { ...pane, activeTab: filePath, ...hist } }, activePaneId: targetId });
    } else {
      set({ panes: { ...s.panes, [pane.id]: { ...pane, tabs: [...pane.tabs, filePath], activeTab: filePath, ...hist } }, activePaneId: targetId });
    }
    if (!isSpecialTab(filePath) && !s.openFiles[filePath]) {
      (async () => {
        try {
          const { useNodepodStore: useNodepodStore2 } = await Promise.resolve().then(() => nodepodStore);
          const nodepod = useNodepodStore2.getState().instance;
          if (!nodepod) return;
          const content = await nodepod.fs.readFile(filePath, "utf-8");
          const name = filePath.split("/").pop() || filePath;
          const language = detectLanguage(name);
          set((prev) => ({
            openFiles: { ...prev.openFiles, [filePath]: { id: filePath, name, path: filePath, language, content: typeof content === "string" ? content : "" } }
          }));
        } catch (e) {
          console.error("Failed to load file from VFS:", filePath, e);
        }
      })();
    }
  },
  closeTab: (paneId, filePath) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const newTabs = pane.tabs.filter((t) => t !== filePath);
    if (newTabs.length === 0) {
      const allPaneIds = collectPaneIds(s.splitLayout);
      if (allPaneIds.length <= 1) return { panes: { ...s.panes, [paneId]: { ...pane, tabs: [], activeTab: "" } } };
      const newLayout = cleanupTree(removeLeaf(s.splitLayout, paneId));
      const remaining = collectPaneIds(newLayout);
      const { [paneId]: _, ...restPanes } = s.panes;
      return { panes: restPanes, splitLayout: newLayout, activePaneId: remaining.includes(s.activePaneId) ? s.activePaneId : remaining[0] || mainPaneId };
    }
    const idx = pane.tabs.indexOf(filePath);
    const newActive = pane.activeTab === filePath ? newTabs[Math.min(idx, newTabs.length - 1)] || "" : pane.activeTab;
    return { panes: { ...s.panes, [paneId]: { ...pane, tabs: newTabs, activeTab: newActive } } };
  }),
  setActiveTab: (paneId, filePath) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const hist = pushHistory(pane, filePath);
    return { panes: { ...s.panes, [paneId]: { ...pane, activeTab: filePath, ...hist } }, activePaneId: paneId };
  }),
  setActivePaneId: (id) => set({ activePaneId: id }),
  reorderTab: (paneId, from, to) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const tabs = [...pane.tabs];
    const [moved] = tabs.splice(from, 1);
    tabs.splice(to, 0, moved);
    return { panes: { ...s.panes, [paneId]: { ...pane, tabs } } };
  }),
  moveTabToPane: (filePath, fromPaneId, toPaneId) => {
    if (fromPaneId === toPaneId) return;
    const s = get();
    const fromPane = s.panes[fromPaneId];
    const toPane = s.panes[toPaneId];
    if (!fromPane || !toPane) return;
    const newFromTabs = fromPane.tabs.filter((t) => t !== filePath);
    const newFromActive = fromPane.activeTab === filePath ? newFromTabs[Math.min(fromPane.tabs.indexOf(filePath), newFromTabs.length - 1)] || "" : fromPane.activeTab;
    const newToTabs = toPane.tabs.includes(filePath) ? toPane.tabs : [...toPane.tabs, filePath];
    const toHist = pushHistory(toPane, filePath);
    const newPanes = {
      ...s.panes,
      [fromPaneId]: { ...fromPane, tabs: newFromTabs, activeTab: newFromActive },
      [toPaneId]: { ...toPane, tabs: newToTabs, activeTab: filePath, ...toHist }
    };
    let newLayout = s.splitLayout;
    if (newFromTabs.length === 0) {
      const allPaneIds = collectPaneIds(s.splitLayout);
      if (allPaneIds.length > 1) {
        newLayout = cleanupTree(removeLeaf(s.splitLayout, fromPaneId));
        delete newPanes[fromPaneId];
      }
    }
    set({ panes: newPanes, splitLayout: newLayout, activePaneId: toPaneId });
  },
  splitPaneWith: (targetPaneId, zone, filePath, sourcePaneId) => {
    const s = get();
    if (zone === "center") {
      get().moveTabToPane(filePath, sourcePaneId, targetPaneId);
      return;
    }
    const targetLeaf = findLeafByPaneId(s.splitLayout, targetPaneId);
    if (!targetLeaf) return;
    const newId = puid();
    const newPane = { id: newId, tabs: [filePath], activeTab: filePath, tabHistory: [filePath], historyIndex: 0 };
    const newPanes = { ...s.panes, [newId]: newPane };
    if (sourcePaneId !== targetPaneId) {
      const fromPane = s.panes[sourcePaneId];
      if (fromPane) {
        const newFromTabs = fromPane.tabs.filter((t) => t !== filePath);
        const newFromActive = fromPane.activeTab === filePath ? newFromTabs[Math.min(fromPane.tabs.indexOf(filePath), newFromTabs.length - 1)] || "" : fromPane.activeTab;
        newPanes[sourcePaneId] = { ...fromPane, tabs: newFromTabs, activeTab: newFromActive };
      }
    }
    let newLayout = insertAtLeaf(s.splitLayout, targetLeaf.id, newId, zone);
    if (sourcePaneId !== targetPaneId) {
      const fromTabs = newPanes[sourcePaneId]?.tabs || [];
      if (fromTabs.length === 0 && collectPaneIds(newLayout).length > 1) {
        newLayout = cleanupTree(removeLeaf(newLayout, sourcePaneId));
        delete newPanes[sourcePaneId];
      }
    }
    set({ panes: newPanes, splitLayout: cleanupTree(newLayout), activePaneId: newId });
  },
  splitActivePane: (direction) => {
    const s = get();
    const currentPane = s.panes[s.activePaneId];
    if (!currentPane || !currentPane.activeTab) return;
    const targetLeaf = findLeafByPaneId(s.splitLayout, s.activePaneId);
    if (!targetLeaf) return;
    const newId = puid();
    const newPane = { id: newId, tabs: [currentPane.activeTab], activeTab: currentPane.activeTab, tabHistory: [currentPane.activeTab], historyIndex: 0 };
    const zone = direction === "row" ? "right" : "bottom";
    const newLayout = insertAtLeaf(s.splitLayout, targetLeaf.id, newId, zone);
    set({ panes: { ...s.panes, [newId]: newPane }, splitLayout: cleanupTree(newLayout), activePaneId: newId });
  },
  closePane: (paneId) => set((s) => {
    const allPaneIds = collectPaneIds(s.splitLayout);
    if (allPaneIds.length <= 1) return s;
    const newLayout = cleanupTree(removeLeaf(s.splitLayout, paneId));
    const remaining = collectPaneIds(newLayout);
    const { [paneId]: _, ...restPanes } = s.panes;
    return { panes: restPanes, splitLayout: newLayout, activePaneId: remaining.includes(s.activePaneId) ? s.activePaneId : remaining[0] || mainPaneId, maximizedPaneId: s.maximizedPaneId === paneId ? null : s.maximizedPaneId };
  }),
  resizeSplit: (parentNodeId, childIndex, delta) => set((s) => {
    const update = (node) => {
      if (node.id === parentNodeId && node.children && node.sizes) {
        const sizes = [...node.sizes];
        const minSize = 50;
        const a = sizes[childIndex] + delta;
        const b = sizes[childIndex + 1] - delta;
        if (a >= minSize && b >= minSize) {
          sizes[childIndex] = a;
          sizes[childIndex + 1] = b;
        }
        return { ...node, sizes };
      }
      if (!node.children) return node;
      return { ...node, children: node.children.map(update) };
    };
    return { splitLayout: update(s.splitLayout) };
  }),
  startTabDrag: (filePath, paneId) => set({ dragState: { dragging: true, fileName: filePath, sourcePaneId: paneId } }),
  endTabDrag: () => set({ dragState: null }),
  toggleMaximizePane: (paneId) => set((s) => ({ maximizedPaneId: s.maximizedPaneId === paneId ? null : paneId })),
  toggleBottomDockMaximized: () => set((s) => ({ bottomDockMaximized: !s.bottomDockMaximized })),
  openPalette: (prefix = "") => set((s) => s.paletteOpen ? { paletteOpen: false } : { paletteOpen: true, paletteInitialPrefix: prefix, themePickerOpen: false }),
  closePalette: () => set({ paletteOpen: false }),
  toggleThemePicker: () => set((s) => ({ themePickerOpen: !s.themePickerOpen, paletteOpen: false })),
  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen, userMenuOpen: false })),
  toggleKeymapEditor: () => {
    const s = get();
    for (const [pid, pane] of Object.entries(s.panes)) {
      if (pane.tabs.includes("tab:keymap")) {
        get().closeTab(pid, "tab:keymap");
        set({ userMenuOpen: false });
        return;
      }
    }
    get().openTab("tab:keymap");
    set({ userMenuOpen: false });
  },
  toggleUserMenu: () => set((s) => ({ userMenuOpen: !s.userMenuOpen })),
  toggleBugReport: () => set((s) => ({ bugReportOpen: !s.bugReportOpen })),
  navigateBack: (paneId) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane || pane.historyIndex <= 0) return s;
    for (let i = pane.historyIndex - 1; i >= 0; i--) {
      if (pane.tabs.includes(pane.tabHistory[i])) return { panes: { ...s.panes, [paneId]: { ...pane, activeTab: pane.tabHistory[i], historyIndex: i } } };
    }
    return s;
  }),
  navigateForward: (paneId) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane || pane.historyIndex >= pane.tabHistory.length - 1) return s;
    for (let i = pane.historyIndex + 1; i < pane.tabHistory.length; i++) {
      if (pane.tabs.includes(pane.tabHistory[i])) return { panes: { ...s.panes, [paneId]: { ...pane, activeTab: pane.tabHistory[i], historyIndex: i } } };
    }
    return s;
  }),
  closeOtherTabs: (paneId, filePath) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    return { panes: { ...s.panes, [paneId]: { ...pane, tabs: [filePath], activeTab: filePath, tabHistory: [filePath], historyIndex: 0 } } };
  }),
  closeTabsToLeft: (paneId, filePath) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const idx = pane.tabs.indexOf(filePath);
    if (idx <= 0) return s;
    const newTabs = pane.tabs.slice(idx);
    return { panes: { ...s.panes, [paneId]: { ...pane, tabs: newTabs, activeTab: pane.activeTab && newTabs.includes(pane.activeTab) ? pane.activeTab : filePath } } };
  }),
  closeTabsToRight: (paneId, filePath) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const idx = pane.tabs.indexOf(filePath);
    if (idx < 0 || idx >= pane.tabs.length - 1) return s;
    const newTabs = pane.tabs.slice(0, idx + 1);
    return { panes: { ...s.panes, [paneId]: { ...pane, tabs: newTabs, activeTab: pane.activeTab && newTabs.includes(pane.activeTab) ? pane.activeTab : filePath } } };
  }),
  closeAllTabs: (paneId) => set((s) => {
    const pane = s.panes[paneId];
    if (!pane) return s;
    const allPaneIds = collectPaneIds(s.splitLayout);
    if (allPaneIds.length <= 1) return { panes: { ...s.panes, [paneId]: { ...pane, tabs: [], activeTab: "", tabHistory: [], historyIndex: 0 } } };
    const newLayout = cleanupTree(removeLeaf(s.splitLayout, paneId));
    const remaining = collectPaneIds(newLayout);
    const { [paneId]: _, ...restPanes } = s.panes;
    return { panes: restPanes, splitLayout: newLayout, activePaneId: remaining.includes(s.activePaneId) ? s.activePaneId : remaining[0] || mainPaneId };
  }),
  revealInProjectPanel: (_filePath) => set((s) => ({ leftDock: { ...s.leftDock, visible: true, activePanel: "project" } })),
  renameFile: (oldPath, newName) => {
    const s = get();
    if (!newName || !oldPath) return;
    const oldName = oldPath.split("/").pop() || "";
    if (newName === oldName) return;
    const newPath = oldPath.slice(0, oldPath.lastIndexOf("/") + 1) + newName;
    if (s.openFiles[newPath]) return;
    const oldFile = s.openFiles[oldPath];
    const newOpenFiles = { ...s.openFiles };
    if (oldFile) {
      delete newOpenFiles[oldPath];
      newOpenFiles[newPath] = { ...oldFile, name: newName, id: newPath, path: newPath };
    }
    const newPanes = {};
    for (const [pid, pane] of Object.entries(s.panes)) {
      newPanes[pid] = { ...pane, tabs: pane.tabs.map((t) => t === oldPath ? newPath : t), activeTab: pane.activeTab === oldPath ? newPath : pane.activeTab, tabHistory: pane.tabHistory.map((t) => t === oldPath ? newPath : t) };
    }
    function updateChildPaths(nodes, parentPath) {
      return nodes.map((n) => {
        const p = `${parentPath}/${n.name}`;
        const u = { ...n, path: p };
        if (u.children) u.children = updateChildPaths(u.children, p);
        return u;
      });
    }
    function renameInTree(nodes) {
      return nodes.map((n) => {
        if (n.path === oldPath) {
          const u = { ...n, name: newName, path: newPath };
          if (u.children) u.children = updateChildPaths(u.children, newPath);
          return u;
        }
        if (n.children) return { ...n, children: renameInTree(n.children) };
        return n;
      });
    }
    set({ openFiles: newOpenFiles, panes: newPanes, projectFiles: renameInTree(s.projectFiles) });
    (async () => {
      try {
        const nodepod = await getNodepod();
        if (nodepod) await nodepod.fs.rename(oldPath, newPath);
      } catch (e) {
        console.error("Failed to rename in VFS:", e);
      }
    })();
  },
  moveNode: (nodePath, targetFolderPath) => {
    const s = get();
    if (!nodePath) return;
    const nodeName = nodePath.split("/").pop() || "";
    let found = null;
    function extractNode(nodes) {
      const result = [];
      for (const n of nodes) {
        if (n.path === nodePath) {
          found = n;
          continue;
        }
        if (n.children) result.push({ ...n, children: extractNode(n.children) });
        else result.push(n);
      }
      return result;
    }
    let newTree = extractNode(structuredClone(s.projectFiles));
    if (!found) return;
    const movedNode = found;
    if (movedNode.type === "folder" && movedNode.path === targetFolderPath) return;
    const destDir = targetFolderPath ?? "/project";
    const newNodePath = `${destDir}/${nodeName}`;
    if (targetFolderPath === null) {
      if (newTree.some((n) => n.name === nodeName)) return;
    } else {
      const tn = findNodeByPath(newTree, targetFolderPath);
      if (tn?.children?.some((c) => c.name === nodeName)) return;
    }
    function updatePaths(node, newParentPath) {
      const p = `${newParentPath}/${node.name}`;
      const u = { ...node, path: p };
      if (u.children) u.children = u.children.map((c) => updatePaths(c, p));
      return u;
    }
    const updatedMovedNode = updatePaths(movedNode, destDir);
    if (targetFolderPath === null) {
      newTree.push(updatedMovedNode);
    } else {
      let insertIntoFolder = function(nodes) {
        return nodes.map((n) => {
          if (n.path === targetFolderPath && n.type === "folder") return { ...n, children: [...n.children || [], updatedMovedNode] };
          if (n.children) return { ...n, children: insertIntoFolder(n.children) };
          return n;
        });
      };
      newTree = insertIntoFolder(newTree);
    }
    const newOpenFiles = { ...s.openFiles };
    const oldPrefix = nodePath;
    const newPrefix = newNodePath;
    for (const key of Object.keys(newOpenFiles)) {
      if (key === oldPrefix || key.startsWith(oldPrefix + "/")) {
        const entry = newOpenFiles[key];
        const updatedPath = newPrefix + key.slice(oldPrefix.length);
        delete newOpenFiles[key];
        newOpenFiles[updatedPath] = { ...entry, path: updatedPath, id: updatedPath };
      }
    }
    const newPanes = {};
    for (const [pid, pane] of Object.entries(s.panes)) {
      const mapPath = (p) => {
        if (p === oldPrefix) return newPrefix;
        if (p.startsWith(oldPrefix + "/")) return newPrefix + p.slice(oldPrefix.length);
        return p;
      };
      newPanes[pid] = { ...pane, tabs: pane.tabs.map(mapPath), activeTab: mapPath(pane.activeTab), tabHistory: pane.tabHistory.map(mapPath) };
    }
    set({ projectFiles: newTree, openFiles: newOpenFiles, panes: newPanes });
    if (nodePath !== newNodePath) {
      (async () => {
        try {
          const nodepod = await getNodepod();
          if (nodepod) await nodepod.fs.rename(nodePath, newNodePath);
        } catch (e) {
          console.error("Failed to move in VFS:", e);
        }
      })();
    }
  },
  setProjectFiles: (files) => set({ projectFiles: files }),
  updateFileContent: (filePath, content) => set((s) => {
    const file = s.openFiles[filePath];
    if (!file) return s;
    return { openFiles: { ...s.openFiles, [filePath]: { ...file, content, modified: true } } };
  }),
  markFileSaved: (filePath) => set((s) => {
    const file = s.openFiles[filePath];
    if (!file || !file.modified) return s;
    return { openFiles: { ...s.openFiles, [filePath]: { ...file, modified: false } } };
  }),
  createFile: (name, parentPath) => {
    get();
    const dir = parentPath ?? "/project";
    const fullPath = `${dir}/${name}`;
    const newNode = { name, type: "file", path: fullPath };
    function insertNode(nodes) {
      if (parentPath === null) return [...nodes, newNode];
      return nodes.map((n) => {
        if (n.path === parentPath && n.type === "folder") return { ...n, children: [...n.children || [], newNode] };
        if (n.children) return { ...n, children: insertNode(n.children) };
        return n;
      });
    }
    const language = detectLanguage(name);
    set((prev) => ({
      projectFiles: insertNode(prev.projectFiles),
      openFiles: { ...prev.openFiles, [fullPath]: { id: fullPath, name, path: fullPath, language, content: "" } }
    }));
    (async () => {
      try {
        const nodepod = await getNodepod();
        if (!nodepod) return;
        await nodepod.fs.writeFile(fullPath, "");
      } catch (e) {
        console.error("Failed to create file in VFS:", e);
      }
    })();
    get().openTab(fullPath);
  },
  createFolder: (name, parentPath) => {
    const s = get();
    const dir = parentPath ?? "/project";
    const fullPath = `${dir}/${name}`;
    const newNode = { name, type: "folder", path: fullPath, children: [] };
    function insertNode(nodes) {
      if (parentPath === null) return [...nodes, newNode];
      return nodes.map((n) => {
        if (n.path === parentPath && n.type === "folder") return { ...n, children: [...n.children || [], newNode] };
        if (n.children) return { ...n, children: insertNode(n.children) };
        return n;
      });
    }
    set({ projectFiles: insertNode(s.projectFiles) });
    (async () => {
      try {
        const nodepod = await getNodepod();
        if (!nodepod) return;
        await nodepod.fs.mkdir(fullPath);
      } catch (e) {
        console.error("Failed to create folder in VFS:", e);
      }
    })();
  },
  deleteNode: (nodePath) => {
    const s = get();
    if (!nodePath) return;
    const node = findNodeByPath(s.projectFiles, nodePath);
    if (!node) return;
    const filesToClose = collectFilePaths(node);
    function removeFromTree(nodes) {
      return nodes.filter((n) => n.path !== nodePath).map((n) => {
        if (n.children) return { ...n, children: removeFromTree(n.children) };
        return n;
      });
    }
    const newOpenFiles = { ...s.openFiles };
    for (const f of filesToClose) delete newOpenFiles[f];
    const newPanes = {};
    for (const [pid, pane] of Object.entries(s.panes)) {
      const newTabs = pane.tabs.filter((t) => !filesToClose.includes(t));
      const newActive = filesToClose.includes(pane.activeTab) ? newTabs[0] || "" : pane.activeTab;
      newPanes[pid] = { ...pane, tabs: newTabs, activeTab: newActive };
    }
    set({ projectFiles: removeFromTree(s.projectFiles), openFiles: newOpenFiles, panes: newPanes });
    (async () => {
      try {
        const nodepod = await getNodepod();
        if (!nodepod) return;
        const stat = await nodepod.fs.stat(nodePath);
        if (stat.isDirectory) await nodepod.fs.rmdir(nodePath, { recursive: true });
        else await nodepod.fs.unlink(nodePath);
      } catch (e) {
        console.error("Failed to delete from VFS:", e);
      }
    })();
  },
  duplicateFile: (filePath) => {
    const s = get();
    if (!filePath) return;
    const parentDir = filePath.slice(0, filePath.lastIndexOf("/"));
    const fileName = filePath.split("/").pop() || "";
    const dotIdx = fileName.lastIndexOf(".");
    const baseName = dotIdx > 0 ? fileName.slice(0, dotIdx) : fileName;
    const ext = dotIdx > 0 ? fileName.slice(dotIdx) : "";
    let newName = `${baseName} copy${ext}`;
    let counter = 2;
    const parentNode = findNodeByPath(s.projectFiles, parentDir);
    const siblings = parentNode?.children ?? s.projectFiles;
    while (siblings.some((n) => n.name === newName)) {
      newName = `${baseName} copy ${counter}${ext}`;
      counter++;
    }
    const newPath = `${parentDir}/${newName}`;
    const newNode = { name: newName, type: "file", path: newPath };
    function insertAfter(nodes) {
      const result = [];
      for (const n of nodes) {
        result.push(n);
        if (n.path === filePath) result.push(newNode);
        if (n.children) {
          result[result.length - (n.path === filePath ? 2 : 1)] = { ...n, children: insertAfter(n.children) };
        }
      }
      return result;
    }
    const sourceContent = s.openFiles[filePath]?.content ?? "";
    const language = detectLanguage(newName);
    set((prev) => ({
      projectFiles: insertAfter(prev.projectFiles),
      openFiles: { ...prev.openFiles, [newPath]: { id: newPath, name: newName, path: newPath, language, content: sourceContent } }
    }));
    (async () => {
      try {
        const nodepod = await getNodepod();
        if (!nodepod) return;
        const content = await nodepod.fs.readFile(filePath, "utf-8");
        await nodepod.fs.writeFile(newPath, content ?? "");
      } catch (e) {
        console.error("Failed to duplicate file in VFS:", e);
      }
    })();
    get().openTab(newPath);
  },
  collapseAll: () => set((s) => ({ collapseCounter: s.collapseCounter + 1 })),
  resetEditorState: () => {
    set({
      panes: {
        [mainPaneId]: { id: mainPaneId, tabs: [], activeTab: "", tabHistory: [], historyIndex: 0 }
      },
      activePaneId: mainPaneId,
      splitLayout: { id: "root", type: "leaf", paneId: mainPaneId },
      openFiles: {},
      projectFiles: [],
      maximizedPaneId: null,
      bottomDockMaximized: false,
      dragState: null,
      paletteOpen: false,
      paletteInitialPrefix: "",
      themePickerOpen: false,
      settingsOpen: false,
      userMenuOpen: false,
      ctrlKMenuOpen: false,
      bugReportOpen: false
    });
  },
  importFromShare: (name, templateId, snapshot) => {
    const s = get();
    const hadProject = s.currentProject && !s.showHomeScreen;
    if (hadProject) {
      const pane = s.panes[s.activePaneId];
      saveProjectLayout(s.currentProject.id, {
        leftDock: s.leftDock,
        rightDock: s.rightDock,
        bottomDock: s.bottomDock,
        openTabPaths: pane?.tabs || [],
        activeTabPath: pane?.activeTab || ""
      });
    }
    const now = Date.now();
    const newProject = {
      id: `shared-${now}`,
      name: uniqueProjectName(name, s.projects),
      lastOpened: now,
      createdAt: now,
      templateId
    };
    const updatedProjects = [newProject, ...s.projects];
    saveProjects(updatedProjects);
    get().resetEditorState();
    set({
      currentProject: newProject,
      projects: updatedProjects,
      showHomeScreen: false,
      pendingTemplateId: templateId
    });
    const gen = ++_bootGeneration;
    (async () => {
      try {
        if (hadProject) await saveCurrentSnapshot();
        const { useNodepodStore: useNodepodStore2 } = await Promise.resolve().then(() => nodepodStore);
        useNodepodStore2.getState().teardown();
        if (gen !== _bootGeneration) return;
        await useNodepodStore2.getState().boot(templateId);
        const instance = useNodepodStore2.getState().instance;
        if (instance && snapshot) {
          await instance.restore(snapshot);
          await useNodepodStore2.getState().refreshFileTree();
        }
        await useNodepodStore2.getState().saveSnapshot();
      } catch (e) {
        console.error("Failed to import shared project:", e);
      }
    })();
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("share");
      window.history.replaceState({}, "", url.pathname);
    }
  },
  deleteProject: (projectId) => {
    const s = get();
    const updatedProjects = s.projects.filter((p) => p.id !== projectId);
    saveProjects(updatedProjects);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(PROJECT_LAYOUT_PREFIX + projectId);
      } catch {
      }
    }
    (async () => {
      try {
        const { deleteProjectSnapshot: deleteProjectSnapshot2 } = await Promise.resolve().then(() => snapshotDb);
        await deleteProjectSnapshot2(projectId);
      } catch {
      }
    })();
    set({ projects: updatedProjects });
  },
  renameProject: (projectId, newName) => {
    const s = get();
    if (!newName.trim()) return;
    const others = s.projects.filter((p) => p.id !== projectId);
    const finalName = uniqueProjectName(newName.trim(), others);
    const updatedProjects = s.projects.map(
      (p) => p.id === projectId ? { ...p, name: finalName } : p
    );
    saveProjects(updatedProjects);
    const updates = { projects: updatedProjects };
    if (s.currentProject?.id === projectId) {
      updates.currentProject = { ...s.currentProject, name: newName.trim() };
    }
    set(updates);
  },
  hydrateProjects: () => {
    const stored = loadProjects();
    if (stored.length > 0) {
      const migrated = stored.map((p) => ({
        ...p,
        createdAt: p.createdAt || p.lastOpened,
        templateId: p.templateId || "blank"
      }));
      set({ projects: migrated });
    }
  }
}));
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", (e) => {
    const cur = useWorkspaceStore.getState();
    if (cur.currentProject && !cur.showHomeScreen) {
      const pane = cur.panes[cur.activePaneId];
      saveProjectLayoutSync(cur.currentProject.id, {
        leftDock: cur.leftDock,
        rightDock: cur.rightDock,
        bottomDock: cur.bottomDock,
        openTabPaths: pane?.tabs || [],
        activeTabPath: pane?.activeTab || ""
      });
    }
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(cur.projects));
    } catch {
    }
    flushSettings();
    flushKeybindings();
    saveCurrentSnapshot();
    e.preventDefault();
  });
}
const workspaceStore = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTabLabel,
  getTabType,
  isSpecialTab,
  useWorkspaceStore
}, Symbol.toStringTag, { value: "Module" }));
const DB_NAME = "weditor-snapshots";
const DB_VERSION = 1;
const STORE_NAME = "snapshots";
let _dbCache = null;
function openDB() {
  if (_dbCache) return Promise.resolve(_dbCache);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => {
      _dbCache = req.result;
      _dbCache.onclose = () => {
        _dbCache = null;
      };
      resolve(_dbCache);
    };
    req.onerror = () => reject(req.error);
  });
}
async function saveProjectSnapshot(projectId, snapshot) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(snapshot, projectId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function loadProjectSnapshot(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(projectId);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}
async function deleteProjectSnapshot(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(projectId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
const snapshotDb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deleteProjectSnapshot,
  loadProjectSnapshot,
  saveProjectSnapshot
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_STARTER_FILES = {
  "/project/package.json": JSON.stringify(
    { name: "my-project", version: "1.0.0", main: "index.js" },
    null,
    2
  ),
  "/project/index.js": 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/html" });\n  res.end("<h1>Hello from nodepod!</h1>");\n});\n\nserver.listen(3000, () => {\n  console.log("Server running on port 3000");\n});\n',
  "/project/README.md": "# My Project\n\nRun `node index.js` in the terminal to start the server.\n"
};
const TEMPLATE_STARTER_FILES = {
  blank: {
    "/project/package.json": JSON.stringify(
      { name: "my-project", version: "1.0.0" },
      null,
      2
    ),
    "/project/index.js": 'console.log("Hello world!");\n'
  },
  react: {
    "/project/package.json": JSON.stringify(
      {
        name: "react-app",
        version: "1.0.0",
        scripts: { dev: "vite" },
        dependencies: { react: "^19", "react-dom": "^19" },
        devDependencies: { vite: "^7", "@vitejs/plugin-react": "^4" }
      },
      null,
      2
    ),
    "/project/index.html": '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>React App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"><\/script>\n  </body>\n</html>\n',
    "/project/src/main.jsx": 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);\n',
    "/project/src/App.jsx": 'import { useState } from "react";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div style={{ fontFamily: "system-ui", textAlign: "center", padding: "4rem" }}>\n      <h1>Vite + React</h1>\n      <button onClick={() => setCount(c => c + 1)}\n        style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>\n        count: {count}\n      </button>\n    </div>\n  );\n}\n',
    "/project/vite.config.js": 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});\n'
  },
  node: DEFAULT_STARTER_FILES,
  vite: {
    "/project/package.json": JSON.stringify(
      {
        name: "vite-app",
        version: "1.0.0",
        scripts: { dev: "vite" },
        devDependencies: { vite: "^7" }
      },
      null,
      2
    ),
    "/project/index.html": '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <h1>Hello Vite!</h1>\n    <p id="info"></p>\n    <script type="module" src="/main.js"><\/script>\n  </body>\n</html>\n',
    "/project/main.js": 'document.getElementById("info").textContent = "Vite is running!";\nconsole.log("Hello from Vite");\n'
  }
};
let _vfsWatcher = null;
let _refreshTimer = null;
let _snapshotTimer = null;
let _lastTreeHash = "";
function treeFingerprint(nodes) {
  const parts = [];
  function walk(ns) {
    for (const n of ns) {
      parts.push(n.type === "folder" ? `d:${n.path}` : `f:${n.path}`);
      if (n.children) walk(n.children);
    }
  }
  walk(nodes);
  return parts.join("\n");
}
let _nodepodModuleCache = null;
let _vfsDirty = false;
let _cachedSnapshot = null;
function getCurrentProjectId() {
  return useWorkspaceStore.getState().currentProject?.id ?? null;
}
async function vfsToFileNodes(fs, dirPath) {
  let entries;
  try {
    entries = await fs.readdir(dirPath);
  } catch {
    return [];
  }
  const folders = [];
  const files = [];
  for (const name of entries.sort()) {
    if (name === "node_modules" || name === ".cache" || name === ".npm")
      continue;
    const fullPath = dirPath.endsWith("/") ? `${dirPath}${name}` : `${dirPath}/${name}`;
    try {
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory) {
        const children = await vfsToFileNodes(fs, fullPath);
        folders.push({ name, type: "folder", path: fullPath, children });
      } else {
        files.push({ name, type: "file", path: fullPath });
      }
    } catch {
    }
  }
  return [...folders, ...files];
}
const useNodepodStore = create((set, get) => ({
  instance: null,
  booting: false,
  error: null,
  serverPorts: /* @__PURE__ */ new Map(),
  startupCommand: null,
  dirty: false,
  boot: async (templateId) => {
    if (get().booting) return;
    const existing = get().instance;
    if (existing) {
      get().teardown();
    }
    set({
      booting: true,
      error: null,
      instance: null,
      serverPorts: /* @__PURE__ */ new Map(),
      startupCommand: null
    });
    try {
      if (!_nodepodModuleCache)
        _nodepodModuleCache = await import("@scelar/nodepod");
      const Nodepod = _nodepodModuleCache.Nodepod;
      const files = TEMPLATE_STARTER_FILES[templateId ?? "node"] ?? DEFAULT_STARTER_FILES;
      const instance = await Nodepod.boot({
        files,
        workdir: "/project",
        swUrl: "/__sw__.js",
        onServerReady: (port, url) => {
          set((s) => {
            const newPorts = new Map(s.serverPorts);
            newPorts.set(port, url);
            return { serverPorts: newPorts };
          });
          const ws = useWorkspaceStore.getState();
          ws.openTab("tab:browser");
        }
      });
      const wsTemplates = useWorkspaceStore.getState().templates;
      const matchedTemplate = templateId ? wsTemplates.find((t) => t.id === templateId) : null;
      const startupCmd = matchedTemplate?.startupCommand ?? null;
      set({ instance, booting: false, startupCommand: startupCmd });
      const projectId = getCurrentProjectId();
      if (projectId) {
        try {
          const snapshot = await loadProjectSnapshot(projectId);
          if (snapshot) {
            await instance.restore(snapshot);
          }
        } catch (e) {
          console.error("Failed to restore snapshot:", e);
        }
      }
      await get().refreshFileTree();
      if (_vfsWatcher) {
        _vfsWatcher.close();
        _vfsWatcher = null;
      }
      _vfsWatcher = instance.fs.watch("/project", { recursive: true }, () => {
        _vfsDirty = true;
        if (!get().dirty) set({ dirty: true });
        if (_refreshTimer) clearTimeout(_refreshTimer);
        _refreshTimer = setTimeout(() => {
          _refreshTimer = null;
          get().refreshFileTree();
        }, 200);
        if (_snapshotTimer) clearTimeout(_snapshotTimer);
        _snapshotTimer = setTimeout(() => {
          _snapshotTimer = null;
          if (_vfsDirty) get().saveSnapshot();
        }, 3e4);
      });
    } catch (e) {
      set({ error: e?.message || "Failed to boot nodepod", booting: false });
      console.error("Nodepod boot error:", e);
    }
  },
  teardown: () => {
    if (_vfsWatcher) {
      _vfsWatcher.close();
      _vfsWatcher = null;
    }
    if (_snapshotTimer) {
      clearTimeout(_snapshotTimer);
      _snapshotTimer = null;
    }
    if (_refreshTimer) {
      clearTimeout(_refreshTimer);
      _refreshTimer = null;
    }
    const instance = get().instance;
    if (instance) {
      try {
        instance.teardown();
      } catch {
      }
    }
    _vfsDirty = false;
    _cachedSnapshot = null;
    _lastTreeHash = "";
    set({ instance: null, serverPorts: /* @__PURE__ */ new Map(), error: null, dirty: false });
  },
  refreshFileTree: async () => {
    const instance = get().instance;
    if (!instance) return;
    try {
      const tree = await vfsToFileNodes(instance.fs, "/project");
      const hash = treeFingerprint(tree);
      if (hash === _lastTreeHash) return;
      _lastTreeHash = hash;
      useWorkspaceStore.getState().setProjectFiles(tree);
    } catch (e) {
      console.error("Failed to refresh file tree:", e);
    }
  },
  saveSnapshot: async () => {
    const instance = get().instance;
    if (!instance) return;
    const projectId = getCurrentProjectId();
    if (!projectId) return;
    if (!_vfsDirty && _cachedSnapshot) {
      await saveProjectSnapshot(projectId, _cachedSnapshot);
      set({ dirty: false });
      return;
    }
    try {
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
      const snapshot = instance.snapshot();
      _cachedSnapshot = snapshot;
      _vfsDirty = false;
      set({ dirty: false });
      await saveProjectSnapshot(projectId, snapshot);
    } catch (e) {
      console.error("Failed to save snapshot:", e);
    }
  },
  restoreSnapshot: async () => {
    const instance = get().instance;
    if (!instance) return false;
    const projectId = getCurrentProjectId();
    if (!projectId) return false;
    try {
      const snapshot = await loadProjectSnapshot(projectId);
      if (!snapshot) return false;
      await instance.restore(snapshot);
      await get().refreshFileTree();
      return true;
    } catch (e) {
      console.error("Failed to restore snapshot:", e);
      return false;
    }
  },
  getShareUrl: async () => {
    const instance = get().instance;
    if (!instance) return null;
    const ws = useWorkspaceStore.getState();
    if (!ws.currentProject) return null;
    try {
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
      const snapshot = !_vfsDirty && _cachedSnapshot ? _cachedSnapshot : instance.snapshot();
      _cachedSnapshot = snapshot;
      _vfsDirty = false;
      const { createShareUrl } = await import("./share-AjXBiX7F.js");
      return await createShareUrl(
        ws.currentProject.name,
        ws.currentProject.templateId || "blank",
        snapshot
      );
    } catch (e) {
      console.error("Failed to create share URL:", e);
      return { error: "Failed to create share URL" };
    }
  }
}));
const nodepodStore = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useNodepodStore
}, Symbol.toStringTag, { value: "Module" }));
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, void 0)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;
class ExtensionHost {
  constructor() {
    this.extensions = /* @__PURE__ */ new Map();
    this.contexts = /* @__PURE__ */ new Map();
    this.commandHandlers = /* @__PURE__ */ new Map();
    this.activeEditorChangeCallbacks = [];
    this.fileOpenCallbacks = [];
    this.fileSaveCallbacks = [];
    this.fileCloseCallbacks = [];
    this.settingsChangeCallbacks = [];
  }
  /**
   * Initialize the extension host with required dependencies
   */
  initialize(deps) {
    this.monacoRef = deps.monaco;
    this.workspaceStoreRef = deps.workspaceStore;
    this.settingsStoreRef = deps.settingsStore;
    this.nodepodStoreRef = deps.nodepodStore;
  }
  /**
   * Load an extension from a manifest and optional entry point
   */
  async loadExtension(manifest, module, path) {
    if (this.extensions.has(manifest.id)) {
      console.warn(`Extension ${manifest.id} is already loaded`);
      return;
    }
    const extension = {
      id: manifest.id,
      manifest,
      path,
      active: false,
      module
    };
    this.extensions.set(manifest.id, extension);
    await this.activateExtension(manifest.id);
  }
  /**
   * Activate an extension
   */
  async activateExtension(extensionId) {
    const extension = this.extensions.get(extensionId);
    if (!extension) {
      throw new Error(`Extension ${extensionId} not found`);
    }
    if (extension.active) {
      console.warn(`Extension ${extensionId} is already active`);
      return;
    }
    const context = this.createExtensionContext(extension);
    this.contexts.set(extensionId, context);
    try {
      if (extension.module?.activate) {
        await extension.module.activate(context);
      }
      const isThemeExtension = extensionId.toLowerCase().includes("theme") || extension.manifest.name?.toLowerCase().includes("theme") || extensionId.toLowerCase().includes("icons");
      if (isThemeExtension && extension.manifest.repository) {
        console.log(`Loading themes for extension: ${extensionId}`);
        try {
          const { loadExtensionThemes } = await import("./theme-converter-XHtyYChk.js");
          const { registerExtensionThemes: registerExtensionThemes2 } = await Promise.resolve().then(() => themeRegistry);
          const themes2 = await loadExtensionThemes(extension.manifest.repository);
          if (themes2.length > 0) {
            registerExtensionThemes2(themes2);
            console.log(`✓ Registered ${themes2.length} theme(s) from ${extensionId}:`, themes2.map((t) => t.name).join(", "));
          } else {
            console.log(`No themes found in ${extensionId}`);
          }
        } catch (e) {
          console.error(`Failed to load themes from ${extensionId}:`, e);
        }
      }
      extension.active = true;
      console.log(`Activated extension: ${extensionId}`);
    } catch (error) {
      console.error(`Failed to activate extension ${extensionId}:`, error);
      throw error;
    }
  }
  /**
   * Deactivate an extension
   */
  async deactivateExtension(extensionId) {
    const extension = this.extensions.get(extensionId);
    const context = this.contexts.get(extensionId);
    if (!extension || !context) {
      return;
    }
    if (!extension.active) {
      return;
    }
    try {
      context.subscriptions.forEach((sub) => sub.dispose());
      context.subscriptions = [];
      if (extension.module?.deactivate) {
        await extension.module.deactivate();
      }
      extension.active = false;
      this.contexts.delete(extensionId);
      console.log(`Deactivated extension: ${extensionId}`);
    } catch (error) {
      console.error(`Failed to deactivate extension ${extensionId}:`, error);
    }
  }
  /**
   * Create extension context with all APIs
   */
  createExtensionContext(extension) {
    const subscriptions = [];
    const context = {
      extension,
      subscriptions,
      editor: this.createEditorAPI(subscriptions),
      workspace: this.createWorkspaceAPI(subscriptions),
      commands: this.createCommandsAPI(subscriptions),
      languages: this.createLanguagesAPI(subscriptions),
      themes: this.createThemesAPI(subscriptions),
      settings: this.createSettingsAPI(subscriptions)
    };
    return context;
  }
  /**
   * Editor API implementation
   */
  createEditorAPI(subscriptions) {
    return {
      getActiveEditor: () => {
        return window.__activeMonacoEditor;
      },
      onDidChangeActiveEditor: (callback) => {
        this.activeEditorChangeCallbacks.push(callback);
        return {
          dispose: () => {
            const idx = this.activeEditorChangeCallbacks.indexOf(callback);
            if (idx >= 0) this.activeEditorChangeCallbacks.splice(idx, 1);
          }
        };
      },
      registerAction: (action) => {
        const editor = this.getMonaco();
        if (!editor) return { dispose: () => {
        } };
        const actionId = action.id;
        window.__extensionActions = window.__extensionActions || [];
        window.__extensionActions.push(action);
        return {
          dispose: () => {
            const actions = window.__extensionActions || [];
            const idx = actions.findIndex((a) => a.id === actionId);
            if (idx >= 0) actions.splice(idx, 1);
          }
        };
      },
      registerDecorator: (decorator) => {
        window.__extensionDecorators = window.__extensionDecorators || [];
        window.__extensionDecorators.push(decorator);
        return {
          dispose: () => {
            const decorators = window.__extensionDecorators || [];
            const idx = decorators.findIndex((d) => d.id === decorator.id);
            if (idx >= 0) decorators.splice(idx, 1);
          }
        };
      }
    };
  }
  /**
   * Workspace API implementation
   */
  createWorkspaceAPI(subscriptions) {
    return {
      getOpenFiles: () => {
        const store = this.workspaceStoreRef?.getState?.();
        return Object.keys(store?.openFiles || {});
      },
      getFileContent: async (path) => {
        const store = this.workspaceStoreRef?.getState?.();
        const file = store?.openFiles?.[path];
        if (file) return file.content;
        try {
          const nodepod = this.nodepodStoreRef?.getState?.().nodepod;
          if (nodepod) {
            return await nodepod.fs.readFile(path, "utf-8");
          }
        } catch (e) {
          console.error(`Failed to read file ${path}:`, e);
        }
        return void 0;
      },
      saveFile: async (path, content) => {
        const nodepod = this.nodepodStoreRef?.getState?.().nodepod;
        if (nodepod) {
          await nodepod.fs.writeFile(path, content);
          const store = this.workspaceStoreRef?.getState?.();
          if (store?.openFiles?.[path]) {
            this.workspaceStoreRef.setState((s) => ({
              openFiles: {
                ...s.openFiles,
                [path]: { ...s.openFiles[path], content, modified: false }
              }
            }));
          }
        }
      },
      onDidOpenFile: (callback) => {
        this.fileOpenCallbacks.push(callback);
        return {
          dispose: () => {
            const idx = this.fileOpenCallbacks.indexOf(callback);
            if (idx >= 0) this.fileOpenCallbacks.splice(idx, 1);
          }
        };
      },
      onDidSaveFile: (callback) => {
        this.fileSaveCallbacks.push(callback);
        return {
          dispose: () => {
            const idx = this.fileSaveCallbacks.indexOf(callback);
            if (idx >= 0) this.fileSaveCallbacks.splice(idx, 1);
          }
        };
      },
      onDidCloseFile: (callback) => {
        this.fileCloseCallbacks.push(callback);
        return {
          dispose: () => {
            const idx = this.fileCloseCallbacks.indexOf(callback);
            if (idx >= 0) this.fileCloseCallbacks.splice(idx, 1);
          }
        };
      }
    };
  }
  /**
   * Commands API implementation
   */
  createCommandsAPI(subscriptions) {
    return {
      registerCommand: (id, callback) => {
        if (this.commandHandlers.has(id)) {
          console.warn(`Command ${id} is already registered`);
        }
        this.commandHandlers.set(id, callback);
        return {
          dispose: () => {
            this.commandHandlers.delete(id);
          }
        };
      },
      executeCommand: async (id, ...args) => {
        const handler = this.commandHandlers.get(id);
        if (handler) {
          await handler(...args);
        } else {
          console.warn(`Command ${id} not found`);
        }
      }
    };
  }
  /**
   * Languages API implementation
   */
  createLanguagesAPI(subscriptions) {
    return {
      registerLanguage: (config) => {
        const monaco = this.getMonaco();
        if (!monaco) return { dispose: () => {
        } };
        monaco.languages.register({
          id: config.id,
          extensions: config.extensions,
          aliases: config.aliases
        });
        if (config.configuration) {
          monaco.languages.setLanguageConfiguration(config.id, config.configuration);
        }
        if (config.monarchTokensProvider) {
          monaco.languages.setMonarchTokensProvider(config.id, config.monarchTokensProvider);
        }
        return {
          dispose: () => {
            console.warn(`Cannot unregister language ${config.id} - Monaco limitation`);
          }
        };
      },
      registerCompletionProvider: (language, provider) => {
        const monaco = this.getMonaco();
        if (!monaco) return { dispose: () => {
        } };
        const disposable = monaco.languages.registerCompletionItemProvider(language, provider);
        return disposable;
      },
      registerHoverProvider: (language, provider) => {
        const monaco = this.getMonaco();
        if (!monaco) return { dispose: () => {
        } };
        const disposable = monaco.languages.registerHoverProvider(language, provider);
        return disposable;
      },
      registerDefinitionProvider: (language, provider) => {
        const monaco = this.getMonaco();
        if (!monaco) return { dispose: () => {
        } };
        const disposable = monaco.languages.registerDefinitionProvider(language, provider);
        return disposable;
      },
      registerDiagnosticsProvider: (language, provider) => {
        window.__extensionDiagnosticsProviders = window.__extensionDiagnosticsProviders || {};
        window.__extensionDiagnosticsProviders[language] = provider;
        return {
          dispose: () => {
            delete window.__extensionDiagnosticsProviders?.[language];
          }
        };
      }
    };
  }
  /**
   * Themes API implementation
   */
  createThemesAPI(subscriptions) {
    return {
      registerTheme: (theme) => {
        const monaco = this.getMonaco();
        if (!monaco) return { dispose: () => {
        } };
        monaco.editor.defineTheme(theme.id, {
          base: theme.uiTheme,
          inherit: true,
          rules: theme.tokenColors || [],
          colors: theme.colors
        });
        window.__extensionThemes = window.__extensionThemes || [];
        window.__extensionThemes.push(theme);
        return {
          dispose: () => {
            const themes2 = window.__extensionThemes || [];
            const idx = themes2.findIndex((t) => t.id === theme.id);
            if (idx >= 0) themes2.splice(idx, 1);
          }
        };
      },
      getActiveTheme: () => {
        return this.settingsStoreRef?.getState?.().theme || "onedark-pro";
      },
      setTheme: (themeId) => {
        this.settingsStoreRef?.setState?.({ theme: themeId });
      }
    };
  }
  /**
   * Settings API implementation
   */
  createSettingsAPI(subscriptions) {
    return {
      get: (key) => {
        const settings = this.settingsStoreRef?.getState?.();
        return settings?.[key];
      },
      set: async (key, value) => {
        this.settingsStoreRef?.setState?.({ [key]: value });
      },
      onDidChange: (callback) => {
        this.settingsChangeCallbacks.push(callback);
        return {
          dispose: () => {
            const idx = this.settingsChangeCallbacks.indexOf(callback);
            if (idx >= 0) this.settingsChangeCallbacks.splice(idx, 1);
          }
        };
      }
    };
  }
  /**
   * Get monaco reference
   */
  getMonaco() {
    return this.monacoRef;
  }
  /**
   * Event dispatchers (to be called from app code)
   */
  notifyActiveEditorChanged(editor) {
    this.activeEditorChangeCallbacks.forEach((cb) => cb(editor));
  }
  notifyFileOpened(path) {
    this.fileOpenCallbacks.forEach((cb) => cb(path));
  }
  notifyFileSaved(path) {
    this.fileSaveCallbacks.forEach((cb) => cb(path));
  }
  notifyFileClosed(path) {
    this.fileCloseCallbacks.forEach((cb) => cb(path));
  }
  notifySettingChanged(key, value) {
    this.settingsChangeCallbacks.forEach((cb) => cb(key, value));
  }
  /**
   * Get all loaded extensions
   */
  getExtensions() {
    return Array.from(this.extensions.values());
  }
  /**
   * Get extension by ID
   */
  getExtension(id) {
    return this.extensions.get(id);
  }
  /**
   * Execute a command
   */
  async executeCommand(id, ...args) {
    const handler = this.commandHandlers.get(id);
    if (handler) {
      await handler(...args);
    } else {
      console.warn(`Command ${id} not found`);
    }
  }
}
const extensionHost = new ExtensionHost();
const useExtensionStore = create()(
  persist(
    (set, get) => ({
      // Initial state
      extensions: [],
      enabledExtensions: [],
      loading: false,
      error: null,
      // Actions
      setExtensions: (extensions) => set({ extensions }),
      addExtension: (extension) => set((state) => ({
        extensions: [...state.extensions.filter((e) => e.id !== extension.id), extension]
      })),
      removeExtension: (extensionId) => set((state) => ({
        extensions: state.extensions.filter((e) => e.id !== extensionId),
        enabledExtensions: state.enabledExtensions.filter((id) => id !== extensionId)
      })),
      enableExtension: async (extensionId) => {
        try {
          await extensionHost.activateExtension(extensionId);
          set((state) => ({
            enabledExtensions: Array.from(/* @__PURE__ */ new Set([...state.enabledExtensions, extensionId])),
            error: null
          }));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          set({ error: `Failed to enable ${extensionId}: ${message}` });
          throw error;
        }
      },
      disableExtension: async (extensionId) => {
        try {
          await extensionHost.deactivateExtension(extensionId);
          set((state) => ({
            enabledExtensions: state.enabledExtensions.filter((id) => id !== extensionId),
            error: null
          }));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          set({ error: `Failed to disable ${extensionId}: ${message}` });
          throw error;
        }
      },
      toggleExtension: async (extensionId) => {
        const { enabledExtensions } = get();
        if (enabledExtensions.includes(extensionId)) {
          await get().disableExtension(extensionId);
        } else {
          await get().enableExtension(extensionId);
        }
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      refreshExtensions: () => {
        const extensions = extensionHost.getExtensions();
        set({ extensions });
      }
    }),
    {
      name: "weditor-extensions",
      partialize: (state) => ({
        enabledExtensions: state.enabledExtensions
      })
    }
  )
);
const themes = [
  {
    name: "One Dark Pro",
    appearance: "dark",
    colors: {
      bg0: "#0e1116",
      bg1: "#12161b",
      bg2: "#15191e",
      bg3: "#1a1f26",
      bg4: "#1c2028",
      border: "#1f242b",
      hover: "#20252b",
      selection: "#264f78",
      text1: "#e5e7eb",
      text2: "#abb2bf",
      text3: "#9ca3af",
      text4: "#555d6b",
      text5: "#3b4048",
      accent: "#62aeea",
      accentHover: "#5098d4",
      focus: "#3e8eea",
      added: "#98c379",
      modified: "#62aeea",
      deleted: "#e06c75",
      warning: "#e5c07b",
      syntaxComment: "#68707d",
      syntaxKeyword: "#dfa0f0",
      syntaxString: "#a5d6ff",
      syntaxNumber: "#e0a569",
      syntaxType: "#e5c07b",
      syntaxFunction: "#61afef",
      syntaxVariable: "#e06c75",
      syntaxOperator: "#56b6c2",
      syntaxDelimiter: "#abb2bf",
      syntaxAttribute: "#d19a66",
      syntaxTag: "#e06c75",
      syntaxMacro: "#56b6c2",
      syntaxConstant: "#d19a66",
      syntaxNamespace: "#e5c07b",
      gitBranch: "#89ddff",
      purple: "#dfa0f0",
      scrollThumb: "#2a2f37",
      scrollThumbHover: "#3b4048"
    }
  },
  {
    name: "Andromeda",
    appearance: "dark",
    colors: {
      bg0: "#1e2025",
      bg1: "#23252b",
      bg2: "#282a30",
      bg3: "#2d2f36",
      bg4: "#31343b",
      border: "#3b3e47",
      hover: "#363940",
      selection: "#3d4455",
      text1: "#e5e5e5",
      text2: "#d5ced9",
      text3: "#a0a0a8",
      text4: "#6e6e7a",
      text5: "#4a4a55",
      accent: "#00e8c6",
      accentHover: "#00c9ab",
      focus: "#00e8c6",
      added: "#96e072",
      modified: "#00e8c6",
      deleted: "#ee5d43",
      warning: "#ffe66d",
      syntaxComment: "#5c5c6e",
      syntaxKeyword: "#c74ded",
      syntaxString: "#96e072",
      syntaxNumber: "#f39c12",
      syntaxType: "#ffe66d",
      syntaxFunction: "#00e8c6",
      syntaxVariable: "#f92672",
      syntaxOperator: "#ee5d43",
      syntaxDelimiter: "#d5ced9",
      syntaxAttribute: "#f39c12",
      syntaxTag: "#ee5d43",
      syntaxMacro: "#00e8c6",
      syntaxConstant: "#f39c12",
      syntaxNamespace: "#ffe66d",
      gitBranch: "#00e8c6",
      purple: "#c74ded",
      scrollThumb: "#3b3e47",
      scrollThumbHover: "#4a4d57"
    }
  },
  {
    name: "Gruvbox Dark",
    appearance: "dark",
    colors: {
      bg0: "#1d2021",
      bg1: "#282828",
      bg2: "#32302f",
      bg3: "#3c3836",
      bg4: "#3c3836",
      border: "#504945",
      hover: "#45403d",
      selection: "#45403d",
      text1: "#fbf1c7",
      text2: "#ebdbb2",
      text3: "#bdae93",
      text4: "#7c6f64",
      text5: "#504945",
      accent: "#83a598",
      accentHover: "#6d8f82",
      focus: "#83a598",
      added: "#b8bb26",
      modified: "#83a598",
      deleted: "#fb4934",
      warning: "#fabd2f",
      syntaxComment: "#928374",
      syntaxKeyword: "#fb4934",
      syntaxString: "#b8bb26",
      syntaxNumber: "#d3869b",
      syntaxType: "#fabd2f",
      syntaxFunction: "#8ec07c",
      syntaxVariable: "#d3869b",
      syntaxOperator: "#fe8019",
      syntaxDelimiter: "#ebdbb2",
      syntaxAttribute: "#fe8019",
      syntaxTag: "#fb4934",
      syntaxMacro: "#8ec07c",
      syntaxConstant: "#d3869b",
      syntaxNamespace: "#fabd2f",
      gitBranch: "#8ec07c",
      purple: "#d3869b",
      scrollThumb: "#504945",
      scrollThumbHover: "#665c54"
    }
  },
  {
    name: "Solarized Dark",
    appearance: "dark",
    colors: {
      bg0: "#002b36",
      bg1: "#073642",
      bg2: "#073642",
      bg3: "#0a3f4c",
      bg4: "#0d4654",
      border: "#1a5566",
      hover: "#0d4654",
      selection: "#274b56",
      text1: "#fdf6e3",
      text2: "#93a1a1",
      text3: "#839496",
      text4: "#657b83",
      text5: "#586e75",
      accent: "#268bd2",
      accentHover: "#1e7abc",
      focus: "#268bd2",
      added: "#859900",
      modified: "#268bd2",
      deleted: "#dc322f",
      warning: "#b58900",
      syntaxComment: "#586e75",
      syntaxKeyword: "#859900",
      syntaxString: "#2aa198",
      syntaxNumber: "#d33682",
      syntaxType: "#b58900",
      syntaxFunction: "#268bd2",
      syntaxVariable: "#cb4b16",
      syntaxOperator: "#93a1a1",
      syntaxDelimiter: "#839496",
      syntaxAttribute: "#b58900",
      syntaxTag: "#268bd2",
      syntaxMacro: "#d33682",
      syntaxConstant: "#cb4b16",
      syntaxNamespace: "#b58900",
      gitBranch: "#2aa198",
      purple: "#6c71c4",
      scrollThumb: "#1a5566",
      scrollThumbHover: "#2a6577"
    }
  },
  {
    name: "Catppuccin Mocha",
    appearance: "dark",
    colors: {
      bg0: "#1e1e2e",
      bg1: "#232334",
      bg2: "#28283a",
      bg3: "#313244",
      bg4: "#363649",
      border: "#45475a",
      hover: "#3b3b52",
      selection: "#45475a",
      text1: "#cdd6f4",
      text2: "#bac2de",
      text3: "#a6adc8",
      text4: "#6c7086",
      text5: "#585b70",
      accent: "#89b4fa",
      accentHover: "#74a8f7",
      focus: "#89b4fa",
      added: "#a6e3a1",
      modified: "#89b4fa",
      deleted: "#f38ba8",
      warning: "#f9e2af",
      syntaxComment: "#6c7086",
      syntaxKeyword: "#cba6f7",
      syntaxString: "#a6e3a1",
      syntaxNumber: "#fab387",
      syntaxType: "#f9e2af",
      syntaxFunction: "#89b4fa",
      syntaxVariable: "#f38ba8",
      syntaxOperator: "#89dceb",
      syntaxDelimiter: "#bac2de",
      syntaxAttribute: "#fab387",
      syntaxTag: "#f38ba8",
      syntaxMacro: "#94e2d5",
      syntaxConstant: "#fab387",
      syntaxNamespace: "#f9e2af",
      gitBranch: "#94e2d5",
      purple: "#cba6f7",
      scrollThumb: "#45475a",
      scrollThumbHover: "#585b70"
    }
  },
  // ── Additional Dark Themes ──
  {
    name: "Tokyo Night",
    appearance: "dark",
    colors: {
      bg0: "#1a1b26",
      bg1: "#1e1f2b",
      bg2: "#24283b",
      bg3: "#292e42",
      bg4: "#2f334d",
      border: "#3b4261",
      hover: "#33385b",
      selection: "#364a82",
      text1: "#c0caf5",
      text2: "#a9b1d6",
      text3: "#9aa5ce",
      text4: "#565f89",
      text5: "#3b4261",
      accent: "#7aa2f7",
      accentHover: "#6a92e7",
      focus: "#7aa2f7",
      added: "#9ece6a",
      modified: "#7aa2f7",
      deleted: "#f7768e",
      warning: "#e0af68",
      syntaxComment: "#565f89",
      syntaxKeyword: "#bb9af7",
      syntaxString: "#9ece6a",
      syntaxNumber: "#ff9e64",
      syntaxType: "#2ac3de",
      syntaxFunction: "#7aa2f7",
      syntaxVariable: "#c0caf5",
      syntaxOperator: "#89ddff",
      syntaxDelimiter: "#a9b1d6",
      syntaxAttribute: "#ff9e64",
      syntaxTag: "#f7768e",
      syntaxMacro: "#2ac3de",
      syntaxConstant: "#ff9e64",
      syntaxNamespace: "#2ac3de",
      gitBranch: "#73daca",
      purple: "#bb9af7",
      scrollThumb: "#3b4261",
      scrollThumbHover: "#565f89"
    }
  },
  {
    name: "Dracula",
    appearance: "dark",
    colors: {
      bg0: "#21222c",
      bg1: "#262733",
      bg2: "#282a36",
      bg3: "#2e303e",
      bg4: "#343746",
      border: "#44475a",
      hover: "#3c3f58",
      selection: "#44475a",
      text1: "#f8f8f2",
      text2: "#e2e2dc",
      text3: "#bfbfb6",
      text4: "#6272a4",
      text5: "#44475a",
      accent: "#bd93f9",
      accentHover: "#a87de8",
      focus: "#bd93f9",
      added: "#50fa7b",
      modified: "#bd93f9",
      deleted: "#ff5555",
      warning: "#f1fa8c",
      syntaxComment: "#6272a4",
      syntaxKeyword: "#ff79c6",
      syntaxString: "#f1fa8c",
      syntaxNumber: "#bd93f9",
      syntaxType: "#8be9fd",
      syntaxFunction: "#50fa7b",
      syntaxVariable: "#f8f8f2",
      syntaxOperator: "#ff79c6",
      syntaxDelimiter: "#f8f8f2",
      syntaxAttribute: "#50fa7b",
      syntaxTag: "#ff79c6",
      syntaxMacro: "#8be9fd",
      syntaxConstant: "#bd93f9",
      syntaxNamespace: "#8be9fd",
      gitBranch: "#8be9fd",
      purple: "#bd93f9",
      scrollThumb: "#44475a",
      scrollThumbHover: "#6272a4"
    }
  },
  {
    name: "Nord",
    appearance: "dark",
    colors: {
      bg0: "#2e3440",
      bg1: "#333a47",
      bg2: "#3b4252",
      bg3: "#434c5e",
      bg4: "#4c566a",
      border: "#4c566a",
      hover: "#434c5e",
      selection: "#434c5e",
      text1: "#eceff4",
      text2: "#d8dee9",
      text3: "#c8ced9",
      text4: "#7b88a1",
      text5: "#616e88",
      accent: "#88c0d0",
      accentHover: "#7ab0c0",
      focus: "#88c0d0",
      added: "#a3be8c",
      modified: "#88c0d0",
      deleted: "#bf616a",
      warning: "#ebcb8b",
      syntaxComment: "#616e88",
      syntaxKeyword: "#81a1c1",
      syntaxString: "#a3be8c",
      syntaxNumber: "#b48ead",
      syntaxType: "#8fbcbb",
      syntaxFunction: "#88c0d0",
      syntaxVariable: "#d8dee9",
      syntaxOperator: "#81a1c1",
      syntaxDelimiter: "#d8dee9",
      syntaxAttribute: "#8fbcbb",
      syntaxTag: "#81a1c1",
      syntaxMacro: "#88c0d0",
      syntaxConstant: "#b48ead",
      syntaxNamespace: "#8fbcbb",
      gitBranch: "#8fbcbb",
      purple: "#b48ead",
      scrollThumb: "#4c566a",
      scrollThumbHover: "#616e88"
    }
  },
  {
    name: "Rosé Pine",
    appearance: "dark",
    colors: {
      bg0: "#191724",
      bg1: "#1f1d2e",
      bg2: "#26233a",
      bg3: "#2a2740",
      bg4: "#312e48",
      border: "#403d52",
      hover: "#312e48",
      selection: "#403d52",
      text1: "#e0def4",
      text2: "#d4d2e8",
      text3: "#908caa",
      text4: "#6e6a86",
      text5: "#524f67",
      accent: "#c4a7e7",
      accentHover: "#b49ad7",
      focus: "#c4a7e7",
      added: "#9ccfd8",
      modified: "#c4a7e7",
      deleted: "#eb6f92",
      warning: "#f6c177",
      syntaxComment: "#6e6a86",
      syntaxKeyword: "#31748f",
      syntaxString: "#f6c177",
      syntaxNumber: "#ebbcba",
      syntaxType: "#9ccfd8",
      syntaxFunction: "#c4a7e7",
      syntaxVariable: "#e0def4",
      syntaxOperator: "#31748f",
      syntaxDelimiter: "#908caa",
      syntaxAttribute: "#f6c177",
      syntaxTag: "#eb6f92",
      syntaxMacro: "#9ccfd8",
      syntaxConstant: "#ebbcba",
      syntaxNamespace: "#9ccfd8",
      gitBranch: "#9ccfd8",
      purple: "#c4a7e7",
      scrollThumb: "#403d52",
      scrollThumbHover: "#524f67"
    }
  },
  {
    name: "GitHub Dark",
    appearance: "dark",
    colors: {
      bg0: "#0d1117",
      bg1: "#131920",
      bg2: "#161b22",
      bg3: "#1c2128",
      bg4: "#21262d",
      border: "#30363d",
      hover: "#262c34",
      selection: "#264f78",
      text1: "#f0f6fc",
      text2: "#c9d1d9",
      text3: "#8b949e",
      text4: "#6e7681",
      text5: "#484f58",
      accent: "#58a6ff",
      accentHover: "#4896e8",
      focus: "#58a6ff",
      added: "#3fb950",
      modified: "#58a6ff",
      deleted: "#f85149",
      warning: "#d29922",
      syntaxComment: "#8b949e",
      syntaxKeyword: "#ff7b72",
      syntaxString: "#a5d6ff",
      syntaxNumber: "#79c0ff",
      syntaxType: "#ffa657",
      syntaxFunction: "#d2a8ff",
      syntaxVariable: "#ffa657",
      syntaxOperator: "#ff7b72",
      syntaxDelimiter: "#c9d1d9",
      syntaxAttribute: "#79c0ff",
      syntaxTag: "#7ee787",
      syntaxMacro: "#d2a8ff",
      syntaxConstant: "#79c0ff",
      syntaxNamespace: "#ffa657",
      gitBranch: "#58a6ff",
      purple: "#d2a8ff",
      scrollThumb: "#30363d",
      scrollThumbHover: "#484f58"
    }
  },
  {
    name: "Vitesse Dark",
    appearance: "dark",
    colors: {
      bg0: "#121212",
      bg1: "#181818",
      bg2: "#1e1e1e",
      bg3: "#252525",
      bg4: "#2b2b2b",
      border: "#2e2e2e",
      hover: "#2a2a2a",
      selection: "#383838",
      text1: "#dbd7ca",
      text2: "#c8c4b8",
      text3: "#a0a09e",
      text4: "#6b6b6b",
      text5: "#444444",
      accent: "#4d9375",
      accentHover: "#3d8365",
      focus: "#4d9375",
      added: "#4d9375",
      modified: "#6394bf",
      deleted: "#cb7676",
      warning: "#e6cc77",
      syntaxComment: "#6b6b6b",
      syntaxKeyword: "#cb7676",
      syntaxString: "#c98a7d",
      syntaxNumber: "#4c9a91",
      syntaxType: "#5da994",
      syntaxFunction: "#80a665",
      syntaxVariable: "#dbd7ca",
      syntaxOperator: "#cb7676",
      syntaxDelimiter: "#858585",
      syntaxAttribute: "#e6cc77",
      syntaxTag: "#4d9375",
      syntaxMacro: "#5da994",
      syntaxConstant: "#c99076",
      syntaxNamespace: "#5da994",
      gitBranch: "#4d9375",
      purple: "#d4879c",
      scrollThumb: "#333333",
      scrollThumbHover: "#444444"
    }
  },
  // ── Light Themes ──
  {
    name: "GitHub Light",
    appearance: "light",
    colors: {
      bg0: "#ffffff",
      bg1: "#f6f8fa",
      bg2: "#ffffff",
      bg3: "#f0f2f5",
      bg4: "#eaeef2",
      border: "#d0d7de",
      hover: "#eaeef2",
      selection: "#b6d4fe",
      text1: "#1f2328",
      text2: "#32383f",
      text3: "#57606a",
      text4: "#8c959f",
      text5: "#c5ccd3",
      accent: "#0969da",
      accentHover: "#0758b8",
      focus: "#0969da",
      added: "#1a7f37",
      modified: "#0969da",
      deleted: "#cf222e",
      warning: "#9a6700",
      syntaxComment: "#6e7781",
      syntaxKeyword: "#cf222e",
      syntaxString: "#0a3069",
      syntaxNumber: "#0550ae",
      syntaxType: "#953800",
      syntaxFunction: "#8250df",
      syntaxVariable: "#953800",
      syntaxOperator: "#cf222e",
      syntaxDelimiter: "#32383f",
      syntaxAttribute: "#0550ae",
      syntaxTag: "#116329",
      syntaxMacro: "#8250df",
      syntaxConstant: "#0550ae",
      syntaxNamespace: "#953800",
      gitBranch: "#0969da",
      purple: "#8250df",
      scrollThumb: "#c5ccd3",
      scrollThumbHover: "#8c959f"
    }
  },
  {
    name: "Catppuccin Latte",
    appearance: "light",
    colors: {
      bg0: "#eff1f5",
      bg1: "#e6e9ef",
      bg2: "#eff1f5",
      bg3: "#dce0e8",
      bg4: "#d5d9e2",
      border: "#ccd0da",
      hover: "#dce0e8",
      selection: "#bcc4d4",
      text1: "#4c4f69",
      text2: "#5c5f77",
      text3: "#6c6f85",
      text4: "#9ca0b0",
      text5: "#bcc0cc",
      accent: "#1e66f5",
      accentHover: "#1558d8",
      focus: "#1e66f5",
      added: "#40a02b",
      modified: "#1e66f5",
      deleted: "#d20f39",
      warning: "#df8e1d",
      syntaxComment: "#9ca0b0",
      syntaxKeyword: "#8839ef",
      syntaxString: "#40a02b",
      syntaxNumber: "#fe640b",
      syntaxType: "#df8e1d",
      syntaxFunction: "#1e66f5",
      syntaxVariable: "#d20f39",
      syntaxOperator: "#04a5e5",
      syntaxDelimiter: "#5c5f77",
      syntaxAttribute: "#fe640b",
      syntaxTag: "#d20f39",
      syntaxMacro: "#179299",
      syntaxConstant: "#fe640b",
      syntaxNamespace: "#df8e1d",
      gitBranch: "#179299",
      purple: "#8839ef",
      scrollThumb: "#bcc0cc",
      scrollThumbHover: "#9ca0b0"
    }
  },
  {
    name: "Solarized Light",
    appearance: "light",
    colors: {
      bg0: "#fdf6e3",
      bg1: "#eee8d5",
      bg2: "#fdf6e3",
      bg3: "#eee8d5",
      bg4: "#e8e2cf",
      border: "#d3cbb7",
      hover: "#eee8d5",
      selection: "#d5cdb8",
      text1: "#073642",
      text2: "#586e75",
      text3: "#657b83",
      text4: "#93a1a1",
      text5: "#c5c8b8",
      accent: "#268bd2",
      accentHover: "#1e7abc",
      focus: "#268bd2",
      added: "#859900",
      modified: "#268bd2",
      deleted: "#dc322f",
      warning: "#b58900",
      syntaxComment: "#93a1a1",
      syntaxKeyword: "#859900",
      syntaxString: "#2aa198",
      syntaxNumber: "#d33682",
      syntaxType: "#b58900",
      syntaxFunction: "#268bd2",
      syntaxVariable: "#cb4b16",
      syntaxOperator: "#657b83",
      syntaxDelimiter: "#586e75",
      syntaxAttribute: "#b58900",
      syntaxTag: "#268bd2",
      syntaxMacro: "#d33682",
      syntaxConstant: "#cb4b16",
      syntaxNamespace: "#b58900",
      gitBranch: "#2aa198",
      purple: "#6c71c4",
      scrollThumb: "#d3cbb7",
      scrollThumbHover: "#93a1a1"
    }
  },
  {
    name: "Rosé Pine Dawn",
    appearance: "light",
    colors: {
      bg0: "#faf4ed",
      bg1: "#f2e9e1",
      bg2: "#faf4ed",
      bg3: "#f2e9e1",
      bg4: "#ebe5df",
      border: "#dfdad9",
      hover: "#f2e9e1",
      selection: "#dfdad9",
      text1: "#575279",
      text2: "#6e6a86",
      text3: "#797593",
      text4: "#9893a5",
      text5: "#cecacd",
      accent: "#907aa9",
      accentHover: "#806a99",
      focus: "#907aa9",
      added: "#56949f",
      modified: "#907aa9",
      deleted: "#b4637a",
      warning: "#ea9d34",
      syntaxComment: "#9893a5",
      syntaxKeyword: "#286983",
      syntaxString: "#ea9d34",
      syntaxNumber: "#d7827e",
      syntaxType: "#56949f",
      syntaxFunction: "#907aa9",
      syntaxVariable: "#575279",
      syntaxOperator: "#286983",
      syntaxDelimiter: "#797593",
      syntaxAttribute: "#ea9d34",
      syntaxTag: "#b4637a",
      syntaxMacro: "#56949f",
      syntaxConstant: "#d7827e",
      syntaxNamespace: "#56949f",
      gitBranch: "#56949f",
      purple: "#907aa9",
      scrollThumb: "#dfdad9",
      scrollThumbHover: "#9893a5"
    }
  },
  {
    name: "Vitesse Light",
    appearance: "light",
    colors: {
      bg0: "#ffffff",
      bg1: "#f7f7f7",
      bg2: "#ffffff",
      bg3: "#f1f1f1",
      bg4: "#ebebeb",
      border: "#e2e2e2",
      hover: "#f1f1f1",
      selection: "#d8d8d8",
      text1: "#393a34",
      text2: "#4c4e48",
      text3: "#6b6e68",
      text4: "#999999",
      text5: "#cccccc",
      accent: "#1e754f",
      accentHover: "#166440",
      focus: "#1e754f",
      added: "#1e754f",
      modified: "#2e6fa0",
      deleted: "#ab5959",
      warning: "#b5911c",
      syntaxComment: "#a0ada0",
      syntaxKeyword: "#ab5959",
      syntaxString: "#b56959",
      syntaxNumber: "#2f798a",
      syntaxType: "#2e8f82",
      syntaxFunction: "#59873a",
      syntaxVariable: "#393a34",
      syntaxOperator: "#ab5959",
      syntaxDelimiter: "#999999",
      syntaxAttribute: "#b5911c",
      syntaxTag: "#1e754f",
      syntaxMacro: "#2e8f82",
      syntaxConstant: "#a65e2b",
      syntaxNamespace: "#2e8f82",
      gitBranch: "#1e754f",
      purple: "#a65e8c",
      scrollThumb: "#d6d6d6",
      scrollThumbHover: "#999999"
    }
  },
  {
    name: "One Light",
    appearance: "light",
    colors: {
      bg0: "#fafafa",
      bg1: "#f0f0f0",
      bg2: "#fafafa",
      bg3: "#e8e8e8",
      bg4: "#e2e2e2",
      border: "#dbdbdb",
      hover: "#e8e8e8",
      selection: "#c4d9f5",
      text1: "#383a42",
      text2: "#4a4d56",
      text3: "#696c77",
      text4: "#a0a1a7",
      text5: "#d0d1d4",
      accent: "#4078f2",
      accentHover: "#3068e2",
      focus: "#4078f2",
      added: "#50a14f",
      modified: "#4078f2",
      deleted: "#e45649",
      warning: "#c18401",
      syntaxComment: "#a0a1a7",
      syntaxKeyword: "#a626a4",
      syntaxString: "#50a14f",
      syntaxNumber: "#986801",
      syntaxType: "#c18401",
      syntaxFunction: "#4078f2",
      syntaxVariable: "#e45649",
      syntaxOperator: "#0184bc",
      syntaxDelimiter: "#4a4d56",
      syntaxAttribute: "#986801",
      syntaxTag: "#e45649",
      syntaxMacro: "#0184bc",
      syntaxConstant: "#986801",
      syntaxNamespace: "#c18401",
      gitBranch: "#0184bc",
      purple: "#a626a4",
      scrollThumb: "#d0d1d4",
      scrollThumbHover: "#a0a1a7"
    }
  },
  {
    name: "Gruvbox Light",
    appearance: "light",
    colors: {
      bg0: "#fbf1c7",
      bg1: "#f2e5bc",
      bg2: "#fbf1c7",
      bg3: "#ebdbb2",
      bg4: "#e4d5a8",
      border: "#d5c4a1",
      hover: "#ebdbb2",
      selection: "#d5c4a1",
      text1: "#3c3836",
      text2: "#504945",
      text3: "#665c54",
      text4: "#928374",
      text5: "#bdae93",
      accent: "#076678",
      accentHover: "#065568",
      focus: "#076678",
      added: "#79740e",
      modified: "#076678",
      deleted: "#9d0006",
      warning: "#b57614",
      syntaxComment: "#928374",
      syntaxKeyword: "#9d0006",
      syntaxString: "#79740e",
      syntaxNumber: "#8f3f71",
      syntaxType: "#b57614",
      syntaxFunction: "#427b58",
      syntaxVariable: "#8f3f71",
      syntaxOperator: "#af3a03",
      syntaxDelimiter: "#504945",
      syntaxAttribute: "#af3a03",
      syntaxTag: "#9d0006",
      syntaxMacro: "#427b58",
      syntaxConstant: "#8f3f71",
      syntaxNamespace: "#b57614",
      gitBranch: "#427b58",
      purple: "#8f3f71",
      scrollThumb: "#d5c4a1",
      scrollThumbHover: "#928374"
    }
  }
];
function getTheme(name) {
  return themes.find((t) => t.name === name) || themes[0];
}
let extensionThemes = [];
let themeChangeListeners = [];
function getAllThemes() {
  return [...themes, ...extensionThemes];
}
function getThemeByName(name) {
  return getAllThemes().find((t) => t.name === name);
}
function registerExtensionThemes(themes2) {
  const newThemes = themes2.filter(
    (theme) => !extensionThemes.some((t) => t.name === theme.name)
  );
  extensionThemes.push(...newThemes);
  notifyThemeChange();
}
function unregisterExtensionThemes(themeNames) {
  extensionThemes = extensionThemes.filter(
    (theme) => !themeNames.includes(theme.name)
  );
  notifyThemeChange();
}
function getExtensionThemes() {
  return extensionThemes;
}
function clearExtensionThemes() {
  extensionThemes = [];
  notifyThemeChange();
}
function onThemeRegistryChange(callback) {
  themeChangeListeners.push(callback);
  return () => {
    const index = themeChangeListeners.indexOf(callback);
    if (index >= 0) {
      themeChangeListeners.splice(index, 1);
    }
  };
}
function notifyThemeChange() {
  themeChangeListeners.forEach((listener) => listener());
}
function getThemesByAppearance() {
  const allThemes = getAllThemes();
  return {
    dark: allThemes.filter((t) => t.appearance === "dark"),
    light: allThemes.filter((t) => t.appearance === "light")
  };
}
const themeRegistry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearExtensionThemes,
  getAllThemes,
  getExtensionThemes,
  getThemeByName,
  getThemesByAppearance,
  onThemeRegistryChange,
  registerExtensionThemes,
  unregisterExtensionThemes
}, Symbol.toStringTag, { value: "Module" }));
function eventToKeyString$1(e) {
  if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return null;
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  let key = e.key;
  if (key === " ") key = "Space";
  else if (key === "ArrowUp") key = "Up";
  else if (key === "ArrowDown") key = "Down";
  else if (key === "ArrowLeft") key = "Left";
  else if (key === "ArrowRight") key = "Right";
  else if (key === "Escape") key = "Escape";
  else if (key === "Enter") key = "Enter";
  else if (key === "Backspace") key = "Backspace";
  else if (key === "Delete") key = "Delete";
  else if (key === "Tab") key = "Tab";
  else if (key === "`") key = "`";
  else if (key === ",") key = ",";
  else if (key === ".") key = ".";
  else if (key === "/") key = "/";
  else if (key === "[") key = "[";
  else if (key === "]") key = "]";
  else if (key === "\\") key = "\\";
  else if (key === "-") key = "-";
  else if (key === "=") key = "=";
  else if (key === "+") key = "+";
  else if (key.length === 1) key = key.toUpperCase();
  parts.push(key);
  return parts.join("-");
}
let pendingChord = null;
let chordTimer = null;
function clearChord() {
  pendingChord = null;
  if (chordTimer) {
    clearTimeout(chordTimer);
    chordTimer = null;
  }
  if (useWorkspaceStore.getState().ctrlKMenuOpen) {
    useWorkspaceStore.setState({ ctrlKMenuOpen: false });
  }
}
function matchBinding(keyStr) {
  const bindings = useKeymapStore.getState().bindings;
  if (pendingChord) {
    const fullChord = `${pendingChord} ${keyStr}`;
    clearChord();
    const match = bindings.find((b) => b.keys === fullChord);
    if (match) return match;
  }
  const exactMatch = bindings.find((b) => b.keys === keyStr && !b.keys.includes(" "));
  if (exactMatch) return exactMatch;
  const isChordStart = bindings.some((b) => b.keys.startsWith(keyStr + " "));
  if (isChordStart) {
    pendingChord = keyStr;
    chordTimer = setTimeout(clearChord, 1500);
    return null;
  }
  return null;
}
function executeAction(action) {
  const ws = useWorkspaceStore.getState();
  const ss = useSettingsStore.getState();
  switch (action) {
    case "file: open":
      ws.openPalette("");
      return true;
    case "file: save": {
      const pane = ws.panes[ws.activePaneId];
      if (pane?.activeTab) ws.markFileSaved(pane.activeTab);
      return true;
    }
    case "file: save all":
      for (const path of Object.keys(ws.openFiles)) {
        ws.markFileSaved(path);
      }
      return true;
    case "file: new file":
      ws.createFile("untitled", null);
      return true;
    case "view: command palette":
      ws.openPalette(">");
      return true;
    case "view: toggle sidebar":
      ws.toggleLeftDock();
      return true;
    case "view: toggle terminal":
    case "view: toggle bottom panel":
      ws.toggleBottomDock();
      return true;
    case "view: toggle right panel":
      ws.toggleRightDock();
      return true;
    case "view: toggle minimap":
      ss.set("minimap", !ss.settings.minimap);
      return true;
    case "view: zoom in":
      ss.set("ui_font_size", Math.min(ss.settings.ui_font_size + 1, 24));
      return true;
    case "view: zoom out":
      ss.set("ui_font_size", Math.max(ss.settings.ui_font_size - 1, 8));
      return true;
    case "view: reset zoom":
      ss.set("ui_font_size", 14);
      return true;
    case "view: maximize panel":
      ws.toggleBottomDockMaximized();
      return true;
    case "view: focus editor":
      return true;
    case "view: focus terminal":
      if (!ws.bottomDock.visible) ws.toggleBottomDock();
      return true;
    case "editor: close tab": {
      const pane = ws.panes[ws.activePaneId];
      if (pane?.activeTab) ws.closeTab(ws.activePaneId, pane.activeTab);
      return true;
    }
    case "editor: close all tabs":
      ws.closeAllTabs(ws.activePaneId);
      return true;
    case "editor: close other tabs": {
      const p = ws.panes[ws.activePaneId];
      if (p?.activeTab) ws.closeOtherTabs(ws.activePaneId, p.activeTab);
      return true;
    }
    case "editor: next tab": {
      const pane = ws.panes[ws.activePaneId];
      if (pane && pane.tabs.length > 1) {
        const idx = pane.tabs.indexOf(pane.activeTab);
        const nextIdx = (idx + 1) % pane.tabs.length;
        ws.setActiveTab(ws.activePaneId, pane.tabs[nextIdx]);
      }
      return true;
    }
    case "editor: previous tab": {
      const pane = ws.panes[ws.activePaneId];
      if (pane && pane.tabs.length > 1) {
        const idx = pane.tabs.indexOf(pane.activeTab);
        const prevIdx = (idx - 1 + pane.tabs.length) % pane.tabs.length;
        ws.setActiveTab(ws.activePaneId, pane.tabs[prevIdx]);
      }
      return true;
    }
    case "editor: split right":
      ws.splitActivePane("row");
      return true;
    case "editor: split down":
      ws.splitActivePane("column");
      return true;
    case "editor: close pane":
      ws.closePane(ws.activePaneId);
      return true;
    case "editor: maximize pane":
      ws.toggleMaximizePane(ws.activePaneId);
      return true;
    case "editor: go to tab 1":
    case "editor: go to tab 2":
    case "editor: go to tab 3":
    case "editor: go to tab 4":
    case "editor: go to tab 5":
    case "editor: go to tab 6":
    case "editor: go to tab 7":
    case "editor: go to tab 8": {
      const tabNum = parseInt(action.slice(-1)) - 1;
      const pane = ws.panes[ws.activePaneId];
      if (pane && tabNum < pane.tabs.length) {
        ws.setActiveTab(ws.activePaneId, pane.tabs[tabNum]);
      }
      return true;
    }
    case "editor: go to last tab": {
      const pane = ws.panes[ws.activePaneId];
      if (pane && pane.tabs.length > 0) {
        ws.setActiveTab(ws.activePaneId, pane.tabs[pane.tabs.length - 1]);
      }
      return true;
    }
    case "go: back": {
      ws.navigateBack(ws.activePaneId);
      return true;
    }
    case "go: forward": {
      ws.navigateForward(ws.activePaneId);
      return true;
    }
    case "go: line":
      return false;
    case "search: project search":
      ws.setLeftPanel("search");
      if (!ws.leftDock.visible) ws.toggleLeftDock();
      return true;
    case "theme: select theme":
      ws.toggleThemePicker();
      return true;
    case "settings: open":
      ws.toggleSettings();
      return true;
    case "settings: open keymap":
      ws.toggleKeymapEditor();
      return true;
    case "project: collapse all":
      ws.collapseAll();
      return true;
    case "project: reveal active file": {
      const pane = ws.panes[ws.activePaneId];
      if (pane?.activeTab) ws.revealInProjectPanel(pane.activeTab);
      return true;
    }
    case "project: focus":
      ws.setLeftPanel("project");
      if (!ws.leftDock.visible) ws.toggleLeftDock();
      return true;
    case "terminal: new terminal":
      if (!ws.bottomDock.visible) ws.toggleBottomDock();
      ws.setBottomPanel("terminal");
      return true;
    case "git: focus":
    case "git: commit":
    case "git: push":
    case "git: pull":
      ws.setLeftPanel("git");
      if (!ws.leftDock.visible) ws.toggleLeftDock();
      return true;
    case "view: open browser tab":
      ws.openTab("tab:browser");
      return true;
    case "view: open ai panel":
      ws.toggleRightDock();
      return true;
    case "go: home":
      ws.goHome();
      return true;
    // pass through to editor
    case "edit: undo":
    case "edit: redo":
    case "edit: find in file":
    case "edit: find and replace":
    case "edit: select all":
    case "edit: cut":
    case "edit: copy":
    case "edit: paste":
    case "editor: toggle comment":
    case "editor: indent line":
    case "editor: outdent line":
    case "editor: move line up":
    case "editor: move line down":
    case "editor: duplicate line":
    case "editor: delete line":
    case "editor: select all occurrences":
    case "editor: add cursor above":
    case "editor: add cursor below":
    case "search: go to symbol":
    case "go: definition":
    case "go: references":
      return false;
    default:
      return false;
  }
}
function isChordPending() {
  return pendingChord !== null;
}
function handleKeybinding(e) {
  const target = e.target;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable) {
    if (e.key !== "Escape" && !(e.ctrlKey || e.metaKey)) {
      return false;
    }
  }
  if (e.key === "Escape") {
    const ws = useWorkspaceStore.getState();
    if (ws.settingsOpen) {
      ws.toggleSettings();
      return true;
    }
    if (ws.themePickerOpen) {
      ws.toggleThemePicker();
      return true;
    }
    if (ws.userMenuOpen) {
      ws.toggleUserMenu();
      return true;
    }
    if (ws.ctrlKMenuOpen) {
      useWorkspaceStore.setState({ ctrlKMenuOpen: false });
      clearChord();
      return true;
    }
    if (ws.paletteOpen) {
      ws.closePalette();
      return true;
    }
    if (ws.maximizedPaneId) {
      ws.toggleMaximizePane(ws.maximizedPaneId);
      return true;
    }
    if (ws.bottomDockMaximized) {
      ws.toggleBottomDockMaximized();
      return true;
    }
    return false;
  }
  const keyStr = eventToKeyString$1(e);
  if (!keyStr) return false;
  const binding = matchBinding(keyStr);
  if (!binding && isChordPending()) {
    if (pendingChord === "Ctrl-K") {
      if (chordTimer) {
        clearTimeout(chordTimer);
        chordTimer = null;
      }
      useWorkspaceStore.setState({ ctrlKMenuOpen: true });
    }
    return true;
  }
  if (!binding) return false;
  const handled = executeAction(binding.action);
  return handled;
}
function parseExtensionToml(toml) {
  const lines = toml.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  const manifest = {};
  let currentSection = manifest;
  for (const line of lines) {
    if (line.startsWith("[") && line.endsWith("]")) {
      const section = line.slice(1, -1);
      const parts = section.split(".");
      currentSection = manifest;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!currentSection[part]) {
          currentSection[part] = {};
        }
        if (i === parts.length - 1) {
          currentSection = currentSection[part];
        } else {
          currentSection = currentSection[part];
        }
      }
      continue;
    }
    const eqIndex = line.indexOf("=");
    if (eqIndex > 0) {
      const key = line.slice(0, eqIndex).trim();
      let value = line.slice(eqIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("[") && value.endsWith("]")) {
        const inner = value.slice(1, -1);
        value = inner.split(",").map((v) => {
          v = v.trim();
          if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1);
          if (!isNaN(Number(v))) return Number(v);
          if (v === "true") return true;
          if (v === "false") return false;
          return v;
        });
      } else if (!isNaN(Number(value))) {
        value = Number(value);
      } else if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
      currentSection[key] = value;
    }
  }
  if (manifest.extension) {
    return { ...manifest, ...manifest.extension };
  }
  return manifest;
}
function isManifestOnlyExtension(manifest) {
  const id = manifest.id?.toLowerCase() || "";
  const name = manifest.name?.toLowerCase() || "";
  if (id.includes("theme") || name.includes("theme")) {
    return true;
  }
  if (manifest.themes && Object.keys(manifest.themes).length > 0) {
    return true;
  }
  if (manifest.language_servers && Object.keys(manifest.language_servers).length > 0) {
    return true;
  }
  const hasCode = manifest.commands && Object.keys(manifest.commands).length > 0;
  const hasOnlyDeclarative = (manifest.languages || manifest.grammars) && !hasCode;
  return hasOnlyDeclarative || false;
}
async function loadExtensionFromPath(nodepod, extensionPath) {
  let manifestText;
  try {
    manifestText = await nodepod.fs.readFile(`${extensionPath}/extension.toml`, "utf-8");
  } catch (e) {
    throw new Error(`extension.toml not found in ${extensionPath}`);
  }
  const manifest = parseExtensionToml(manifestText);
  if (isManifestOnlyExtension(manifest)) {
    return { manifest, module: void 0 };
  }
  let moduleCode;
  const entryPoints = ["index.js", "main.js", "extension.js"];
  for (const entry of entryPoints) {
    try {
      moduleCode = await nodepod.fs.readFile(`${extensionPath}/${entry}`, "utf-8");
      break;
    } catch (e) {
    }
  }
  if (!moduleCode) {
    console.log(`No JavaScript entry point found for ${manifest.id}, treating as manifest-only extension`);
    return { manifest, module: void 0 };
  }
  const module = await loadModuleFromCode(moduleCode, extensionPath);
  return { manifest, module };
}
async function loadModuleFromCode(code, path) {
  const moduleExports = {};
  const moduleObject = { exports: moduleExports };
  const moduleFunction = new Function(
    "module",
    "exports",
    "require",
    "console",
    "extensionHost",
    code
  );
  const requireFn = (moduleName) => {
    if (moduleName === "extension-host") {
      return { extensionHost };
    }
    throw new Error(`Module ${moduleName} not available in extension sandbox`);
  };
  try {
    moduleFunction(
      moduleObject,
      moduleExports,
      requireFn,
      console,
      extensionHost
    );
  } catch (e) {
    console.error(`Error loading extension module from ${path}:`, e);
    throw e;
  }
  const exports = moduleObject.exports.default || moduleObject.exports;
  if (!exports.activate) {
    throw new Error(`Extension module must export an 'activate' function`);
  }
  return exports;
}
async function loadExtensionFromUrl(url) {
  const manifestUrl = url.endsWith("/") ? `${url}extension.toml` : `${url}/extension.toml`;
  const manifestResponse = await fetch(manifestUrl);
  if (!manifestResponse.ok) {
    throw new Error(`Failed to fetch extension manifest from ${manifestUrl}`);
  }
  const manifestText = await manifestResponse.text();
  const manifest = parseExtensionToml(manifestText);
  if (isManifestOnlyExtension(manifest)) {
    return { manifest, module: void 0 };
  }
  const entryPoints = ["index.js", "main.js", "extension.js"];
  let moduleCode;
  for (const entry of entryPoints) {
    const entryUrl = url.endsWith("/") ? `${url}${entry}` : `${url}/${entry}`;
    try {
      const response = await fetch(entryUrl);
      if (response.ok) {
        moduleCode = await response.text();
        break;
      }
    } catch (e) {
    }
  }
  if (!moduleCode) {
    console.log(`No JavaScript entry point found for ${manifest.id}, treating as manifest-only extension`);
    return { manifest, module: void 0 };
  }
  const module = await loadModuleFromCode(moduleCode, url);
  return { manifest, module };
}
function registerBuiltInExtension(manifest, activateFn, deactivateFn) {
  const module = {
    activate: activateFn,
    deactivate: deactivateFn
  };
  return extensionHost.loadExtension(manifest, module, "<built-in>");
}
async function autoLoadExtensions(nodepod) {
  const extensionsDir = "/project/.weditor/extensions";
  try {
    const entries = await nodepod.fs.readdir(extensionsDir);
    for (const entry of entries) {
      const fullPath = `${extensionsDir}/${entry}`;
      try {
        const stat = await nodepod.fs.stat(fullPath);
        if (stat.isDirectory) {
          console.log(`Loading extension from ${fullPath}...`);
          const { manifest, module } = await loadExtensionFromPath(nodepod, fullPath);
          await extensionHost.loadExtension(manifest, module, fullPath);
        }
      } catch (e) {
        console.error(`Failed to load extension from ${fullPath}:`, e);
      }
    }
  } catch (e) {
    console.log("No extensions directory found");
  }
}
const extensionLoader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autoLoadExtensions,
  loadExtensionFromPath,
  loadExtensionFromUrl,
  parseExtensionToml,
  registerBuiltInExtension
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component2 = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component2.displayName = toPascalCase(iconName);
  return Component2;
};
const __iconNode$$ = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$$);
const __iconNode$_ = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$_);
const __iconNode$Z = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$Z);
const __iconNode$Y = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
];
const Brain = createLucideIcon("brain", __iconNode$Y);
const __iconNode$X = [
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z", key: "uouzyp" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 21a4 4 0 0 0-3.81-4", key: "1b0z45" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
];
const Bug = createLucideIcon("bug", __iconNode$X);
const __iconNode$W = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$W);
const __iconNode$V = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$V);
const __iconNode$U = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$U);
const __iconNode$T = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$T);
const __iconNode$S = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$S);
const __iconNode$R = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$R);
const __iconNode$Q = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$Q);
const __iconNode$P = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$P);
const __iconNode$O = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$O);
const __iconNode$N = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
];
const Code = createLucideIcon("code", __iconNode$N);
const __iconNode$M = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode$M);
const __iconNode$L = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$L);
const __iconNode$K = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$K);
const __iconNode$J = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$J);
const __iconNode$I = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
];
const FileCode = createLucideIcon("file-code", __iconNode$I);
const __iconNode$H = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$H);
const __iconNode$G = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
];
const FileUp = createLucideIcon("file-up", __iconNode$G);
const __iconNode$F = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
];
const File = createLucideIcon("file", __iconNode$F);
const __iconNode$E = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "m9 13 3-3 3 3", key: "1pxg3c" }]
];
const FolderUp = createLucideIcon("folder-up", __iconNode$E);
const __iconNode$D = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
];
const FolderTree = createLucideIcon("folder-tree", __iconNode$D);
const __iconNode$C = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const Folder = createLucideIcon("folder", __iconNode$C);
const __iconNode$B = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3", key: "1cii5b" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }]
];
const GitBranch = createLucideIcon("git-branch", __iconNode$B);
const __iconNode$A = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$A);
const __iconNode$z = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$z);
const __iconNode$y = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$y);
const __iconNode$x = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$x);
const __iconNode$w = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
const Keyboard = createLucideIcon("keyboard", __iconNode$w);
const __iconNode$v = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$v);
const __iconNode$u = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
];
const ListTodo = createLucideIcon("list-todo", __iconNode$u);
const __iconNode$t = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$t);
const __iconNode$s = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$s);
const __iconNode$r = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$r);
const __iconNode$q = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
];
const Minimize2 = createLucideIcon("minimize-2", __iconNode$q);
const __iconNode$p = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$p);
const __iconNode$o = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$o);
const __iconNode$n = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
];
const PanelBottom = createLucideIcon("panel-bottom", __iconNode$n);
const __iconNode$m = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
];
const PanelLeft = createLucideIcon("panel-left", __iconNode$m);
const __iconNode$l = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const PanelRight = createLucideIcon("panel-right", __iconNode$l);
const __iconNode$k = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode$k);
const __iconNode$j = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$j);
const __iconNode$i = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$i);
const __iconNode$h = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$h);
const __iconNode$g = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$g);
const __iconNode$f = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
];
const RotateCw = createLucideIcon("rotate-cw", __iconNode$f);
const __iconNode$e = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$e);
const __iconNode$d = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$d);
const __iconNode$c = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$c);
const __iconNode$b = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$a);
const __iconNode$9 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$8);
const __iconNode$7 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$6);
const __iconNode$5 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function BugReportModal({ onClose }) {
  return null;
}
const DropdownMenuContext = createContext(null);
function useDropdownMenu() {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu compound components must be used inside <DropdownMenu>");
  return ctx;
}
function DropdownMenu({ children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = useCallback(
    (v) => {
      if (!isControlled) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      const target = e.target;
      const inContent = contentRef.current?.contains(target);
      const inTrigger = triggerRef.current?.contains(target);
      if (!inContent && !inTrigger) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [open, setOpen]);
  return /* @__PURE__ */ jsx(DropdownMenuContext.Provider, { value: { open, setOpen, triggerRef, contentRef }, children });
}
function DropdownMenuTrigger({ children, className, style, asChild }) {
  const { open, setOpen, triggerRef } = useDropdownMenu();
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };
  if (asChild) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: triggerRef,
      type: "button",
      className,
      style,
      onClick: () => setOpen(!open),
      onKeyDown: handleKeyDown,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      children
    }
  );
}
function DropdownMenuContent({
  children,
  className,
  align = "end",
  side = "bottom",
  sideOffset = 4,
  fixed,
  style
}) {
  const { open, setOpen, triggerRef, contentRef } = useDropdownMenu();
  const focusableRef = useRef([]);
  const [pos, setPos] = useState(null);
  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    if (fixed) return;
    const compute = () => {
      const trigger = triggerRef.current;
      const content2 = contentRef.current;
      if (!trigger) return;
      const tr = trigger.getBoundingClientRect();
      const cw = content2?.offsetWidth ?? 0;
      const ch = content2?.offsetHeight ?? 0;
      let top;
      if (side === "bottom") {
        top = tr.bottom + sideOffset;
        if (top + ch > window.innerHeight && tr.top - sideOffset - ch > 0) {
          top = tr.top - sideOffset - ch;
        }
      } else {
        top = tr.top - sideOffset - ch;
        if (top < 0 && tr.bottom + sideOffset + ch <= window.innerHeight) {
          top = tr.bottom + sideOffset;
        }
      }
      let left;
      if (align === "end") {
        left = tr.right - cw;
      } else if (align === "start") {
        left = tr.left;
      } else {
        left = tr.left + tr.width / 2 - cw / 2;
      }
      if (left + cw > window.innerWidth) left = window.innerWidth - cw - 8;
      if (left < 8) left = 8;
      if (top + ch > window.innerHeight) top = window.innerHeight - ch - 8;
      if (top < 8) top = 8;
      setPos({ top, left });
    };
    compute();
    requestAnimationFrame(compute);
  }, [open, fixed, side, align, sideOffset, triggerRef, contentRef]);
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      focusableRef.current = Array.from(
        el.querySelectorAll('[role="menuitem"]:not([disabled])')
      );
      focusableRef.current[0]?.focus();
    });
  }, [open, contentRef]);
  const handleKeyDown = (e) => {
    const items = focusableRef.current;
    if (!items.length) return;
    const active = document.activeElement;
    const idx = items.indexOf(active);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = idx < items.length - 1 ? idx + 1 : 0;
      items[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = idx > 0 ? idx - 1 : items.length - 1;
      items[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };
  if (!open) return null;
  const computedStyle = fixed ? { position: "fixed", ...style } : { position: "fixed", ...pos ?? {}, ...style };
  const content = /* @__PURE__ */ jsx(
    "div",
    {
      ref: (el) => {
        contentRef.current = el;
      },
      role: "menu",
      "aria-orientation": "vertical",
      onKeyDown: handleKeyDown,
      className: cn(
        "z-[200] min-w-[180px] bg-bg3 border border-scroll-thumb rounded-lg shadow-xl shadow-black/50 p-1 text-[12px]",
        className
      ),
      style: computedStyle,
      children
    }
  );
  return createPortal(content, document.body);
}
function DropdownMenuItem({ children, className, disabled, onSelect, shortcut }) {
  const { setOpen } = useDropdownMenu();
  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      role: "menuitem",
      type: "button",
      tabIndex: disabled ? -1 : 0,
      disabled,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      "aria-disabled": disabled || void 0,
      className: cn(
        "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md outline-none",
        disabled ? "text-t5 cursor-default" : "text-t3 hover:bg-selection hover:text-t1 focus-visible:bg-selection focus-visible:text-t1 cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2 min-w-0", children }),
        shortcut && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-t5 font-mono ml-6 shrink-0", children: shortcut })
      ]
    }
  );
}
function DropdownMenuSeparator({ className }) {
  return /* @__PURE__ */ jsx("div", { role: "separator", className: cn("h-px bg-scroll-thumb mx-2 my-1", className) });
}
function DropdownMenuLabel({ children, className }) {
  return /* @__PURE__ */ jsx("div", { role: "none", className: cn("px-2.5 py-1.5 text-[11px] text-t4 font-medium select-none", className), children });
}
const DropdownMenuSubContext = createContext(null);
function DropdownMenuSub({ children }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsx(DropdownMenuSubContext.Provider, { value: { open, setOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", onMouseLeave: () => setOpen(false), children }) });
}
function DropdownMenuSubTrigger({ children, className }) {
  const ctx = useContext(DropdownMenuSubContext);
  if (!ctx) return null;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      role: "menuitem",
      type: "button",
      tabIndex: 0,
      "aria-haspopup": "menu",
      "aria-expanded": ctx.open,
      onMouseEnter: () => ctx.setOpen(true),
      onClick: () => ctx.setOpen(true),
      onFocus: () => ctx.setOpen(true),
      onKeyDown: (e) => {
        if (e.key === "ArrowRight" || e.key === "Enter") {
          e.preventDefault();
          ctx.setOpen(true);
        }
      },
      className: cn(
        "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md outline-none text-t3 hover:bg-selection hover:text-t1 focus-visible:bg-selection focus-visible:text-t1 cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2 min-w-0", children }),
        /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", className: "text-t5 shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M3.5 2L7 5L3.5 8", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      ]
    }
  );
}
function DropdownMenuSubContent({ children, className }) {
  const ctx = useContext(DropdownMenuSubContext);
  if (!ctx?.open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "menu",
      "aria-orientation": "vertical",
      className: cn(
        "absolute left-full top-0 ml-1 z-[201] min-w-[180px] bg-bg3 border border-scroll-thumb rounded-lg shadow-xl shadow-black/50 p-1 text-[12px]",
        className
      ),
      children
    }
  );
}
function TitleBar() {
  const leftDockVisible = useWorkspaceStore((s) => s.leftDock.visible);
  const rightDockVisible = useWorkspaceStore((s) => s.rightDock.visible);
  const bottomDockVisible = useWorkspaceStore((s) => s.bottomDock.visible);
  const toggleLeftDock = useWorkspaceStore((s) => s.toggleLeftDock);
  const toggleRightDock = useWorkspaceStore((s) => s.toggleRightDock);
  const toggleBottomDock = useWorkspaceStore((s) => s.toggleBottomDock);
  const showHomeScreen = useWorkspaceStore((s) => s.showHomeScreen);
  const homeSearch = useWorkspaceStore((s) => s.homeSearch);
  const setHomeSearch = useWorkspaceStore((s) => s.setHomeSearch);
  const currentProject = useWorkspaceStore((s) => s.currentProject);
  const goHome = useWorkspaceStore((s) => s.goHome);
  const activeFileName = useWorkspaceStore((s) => {
    const pane = s.panes[s.activePaneId];
    const tab = pane?.activeTab;
    return tab ? s.openFiles[tab]?.name ?? null : null;
  });
  const userMenuOpen = useWorkspaceStore((s) => s.userMenuOpen);
  const toggleUserMenu = useWorkspaceStore((s) => s.toggleUserMenu);
  const toggleSettings = useWorkspaceStore((s) => s.toggleSettings);
  const toggleKeymapEditor = useWorkspaceStore((s) => s.toggleKeymapEditor);
  useWorkspaceStore((s) => s.toggleThemePicker);
  const activeTheme = useSettingsStore((s) => s.settings.theme);
  const setTheme = useSettingsStore((s) => s.set);
  const bugReportOpen = useWorkspaceStore((s) => s.bugReportOpen);
  const toggleBugReport = useWorkspaceStore((s) => s.toggleBugReport);
  const saveSnapshot = useNodepodStore((s) => s.saveSnapshot);
  const dirty = useNodepodStore((s) => s.dirty);
  const getShareUrl = useNodepodStore((s) => s.getShareUrl);
  const [saving, setSaving] = useState(false);
  const handleSave = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    try {
      await saveSnapshot();
    } finally {
      setSaving(false);
    }
  }, [saving, saveSnapshot]);
  const [shareState, setShareState] = useState("idle");
  const [shareError, setShareError] = useState("");
  const shareTimer = useRef(null);
  useEffect(() => {
    return () => {
      if (shareTimer.current) clearTimeout(shareTimer.current);
    };
  }, []);
  const handleShare = useCallback(async () => {
    if (shareState === "loading") return;
    setShareState("loading");
    try {
      const result = await getShareUrl();
      if (!result) {
        setShareState("error");
        setShareError("No project open");
        if (shareTimer.current) clearTimeout(shareTimer.current);
        shareTimer.current = setTimeout(() => setShareState("idle"), 3e3);
        return;
      }
      if ("error" in result) {
        setShareState("error");
        setShareError(result.error);
        if (shareTimer.current) clearTimeout(shareTimer.current);
        shareTimer.current = setTimeout(() => setShareState("idle"), 3e3);
        return;
      }
      await navigator.clipboard.writeText(result.url);
      setShareState("copied");
      if (shareTimer.current) clearTimeout(shareTimer.current);
      shareTimer.current = setTimeout(() => setShareState("idle"), 2e3);
    } catch {
      setShareState("error");
      setShareError("Failed to copy");
      if (shareTimer.current) clearTimeout(shareTimer.current);
      shareTimer.current = setTimeout(() => setShareState("idle"), 2e3);
    }
  }, [shareState, getShareUrl]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-[38px] flex items-center justify-between px-3 select-none shrink-0",
        "bg-bg0 border-b border-border",
        "app-drag-region"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-t1 font-medium ml-2", children: "wZed" }),
          !showHomeScreen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goHome,
                className: "p-1 rounded hover:bg-hover transition-colors text-t4 hover:text-t2 ml-1",
                title: "Home",
                children: /* @__PURE__ */ jsx(House, { size: 13 })
              }
            ),
            currentProject && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(ChevronRight, { size: 11, className: "text-t5" }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-t3 truncate max-w-[140px]", children: currentProject.name })
            ] })
          ] })
        ] }),
        showHomeScreen ? /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { size: 13, className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-t5" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: homeSearch,
              onChange: (e) => setHomeSearch(e.target.value),
              placeholder: "Search projects...",
              className: "w-[280px] text-[12px] bg-bg1 border border-border rounded-md pl-8 pr-3 py-1 text-t2 placeholder:text-t5 outline-none focus:border-accent transition-colors"
            }
          )
        ] }) }) : /* @__PURE__ */ jsx("div", { className: "text-[11px] text-t4 font-medium absolute left-1/2 -translate-x-1/2 pointer-events-none", children: activeFileName ? `${activeFileName} — wZed` : "wZed" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          !showHomeScreen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleLeftDock,
                className: cn(
                  "p-1.5 rounded hover:bg-hover transition-colors",
                  leftDockVisible ? "text-accent" : "text-t4"
                ),
                title: "Toggle Left Panel",
                children: /* @__PURE__ */ jsx(PanelLeft, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleBottomDock,
                className: cn(
                  "p-1.5 rounded hover:bg-hover transition-colors",
                  bottomDockVisible ? "text-accent" : "text-t4"
                ),
                title: "Toggle Bottom Panel",
                children: /* @__PURE__ */ jsx(PanelBottom, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleRightDock,
                className: cn(
                  "p-1.5 rounded hover:bg-hover transition-colors",
                  rightDockVisible ? "text-accent" : "text-t4"
                ),
                title: "Toggle AI Panel",
                children: /* @__PURE__ */ jsx(PanelRight, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleBugReport,
                className: "p-1.5 rounded hover:bg-hover transition-colors text-t4 hover:text-warning",
                title: "Report a Bug",
                children: /* @__PURE__ */ jsx(Bug, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-border mx-1" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleSave,
                disabled: saving || !dirty,
                className: cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors",
                  saving ? "bg-accent/20 text-accent animate-pulse cursor-default" : !dirty ? "bg-bg2 text-t5 cursor-default" : "bg-accent/10 text-accent hover:bg-accent/20"
                ),
                title: "Save project (Ctrl+S)",
                children: [
                  /* @__PURE__ */ jsx(Save, { size: 13 }),
                  saving ? "Saving..." : "Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleShare,
                disabled: shareState === "loading",
                className: cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors max-w-[200px]",
                  shareState === "copied" ? "bg-added/20 text-added" : shareState === "error" ? "bg-deleted/20 text-deleted" : shareState === "loading" ? "bg-bg2 text-t4 animate-pulse cursor-default" : "bg-bg2 text-t3 hover:bg-hover"
                ),
                title: shareState === "error" ? shareError : "Copy share link to clipboard",
                children: [
                  shareState === "copied" ? /* @__PURE__ */ jsx(Check, { size: 13 }) : /* @__PURE__ */ jsx(Share2, { size: 13 }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: shareState === "copied" ? "Copied!" : shareState === "error" ? "Too large" : "Share" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-border mx-1" }),
          /* @__PURE__ */ jsxs(DropdownMenu, { open: userMenuOpen, onOpenChange: (v) => {
            if (v !== userMenuOpen) toggleUserMenu();
          }, children: [
            /* @__PURE__ */ jsx(
              DropdownMenuTrigger,
              {
                className: "w-6 h-6 rounded-full ml-1 flex items-center justify-center text-[10px] font-bold text-white hover:ring-1 hover:ring-accent/50",
                style: {
                  background: "radial-gradient(at 25% 25%, var(--accent), var(--purple) 75%)"
                },
                children: "Z"
              }
            ),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-[220px]", children: [
              /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-t1 font-medium", children: "User" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-t4 bg-bg0 px-1.5 py-0.5 rounded", children: "Free" })
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: toggleSettings, shortcut: "Ctrl-,", children: [
                /* @__PURE__ */ jsx(Settings, { size: 13, className: "text-t4" }),
                "Settings"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: toggleKeymapEditor, children: [
                /* @__PURE__ */ jsx(Keyboard, { size: 13, className: "text-t4" }),
                "Key Bindings"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
                /* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [
                  /* @__PURE__ */ jsx(Palette, { size: 13, className: "text-t4" }),
                  "Themes"
                ] }),
                /* @__PURE__ */ jsx(DropdownMenuSubContent, { className: "max-h-[360px] overflow-y-auto", children: ["dark", "light"].map((appearance, i) => /* @__PURE__ */ jsxs("div", { children: [
                  i > 0 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "uppercase tracking-wider text-[10px]", children: appearance }),
                  themes.filter((t) => t.appearance === appearance).map((t) => /* @__PURE__ */ jsxs(
                    DropdownMenuItem,
                    {
                      onSelect: () => setTheme("theme", t.name),
                      children: [
                        activeTheme === t.name ? /* @__PURE__ */ jsx(Check, { size: 13, className: "text-accent" }) : /* @__PURE__ */ jsx("span", { className: "w-[13px]" }),
                        t.name
                      ]
                    },
                    t.name
                  ))
                ] }, appearance)) })
              ] })
            ] })
          ] })
        ] }),
        bugReportOpen && /* @__PURE__ */ jsx(BugReportModal, { onClose: toggleBugReport })
      ]
    }
  );
}
const EXT_COLORS = {
  rs: "#dea584",
  ts: "#3178c6",
  tsx: "#3178c6",
  js: "#f7df1e",
  jsx: "#f7df1e",
  mjs: "#f7df1e",
  cjs: "#f7df1e",
  json: "#cbcb41",
  toml: "#9c4221",
  md: "#519aba",
  mdx: "#519aba",
  css: "#563d7c",
  scss: "#cd6799",
  less: "#1d365d",
  html: "#e34c26",
  htm: "#e34c26",
  xml: "#e37933",
  svg: "#ffb13b",
  py: "#3572a5",
  svelte: "#ff3e00",
  vue: "#41b883",
  yaml: "#cb171e",
  yml: "#cb171e",
  sh: "#89e051",
  bash: "#89e051",
  go: "#00add8",
  java: "#b07219",
  kt: "#a97bff",
  rb: "#cc342d",
  php: "#4f5d95",
  c: "#555555",
  h: "#555555",
  cpp: "#f34b7d",
  hpp: "#f34b7d",
  cs: "#178600",
  swift: "#f05138",
  sql: "#e38c00",
  graphql: "#e10098",
  gql: "#e10098",
  lock: "#555d6b",
  gitignore: "#f64d27",
  env: "#ecd53f"
};
const DEFAULT_COLOR = "#9ca3af";
const FOLDER_COLOR = "#e5c07b";
const FOLDER_OPEN_COLOR = "#e0a569";
function FileIcon({ name, size = 14 }) {
  const ext = name.includes(".") ? name.split(".").pop() || "" : "";
  const color = EXT_COLORS[ext] || DEFAULT_COLOR;
  if (ext === "rs") {
    return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z",
          fill: "none",
          stroke: color,
          strokeWidth: "1.2"
        }
      ),
      /* @__PURE__ */ jsx("text", { x: "4.5", y: "11", fontSize: "8", fill: color, fontWeight: "bold", fontFamily: "monospace", children: "R" })
    ] });
  }
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M3 1.5h6.5L13 5v9.5H3z",
        fill: "none",
        stroke: color,
        strokeWidth: "1",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx("path", { d: "M9.5 1.5V5H13", fill: "none", stroke: color, strokeWidth: "1", strokeLinejoin: "round" }),
    ext && /* @__PURE__ */ jsx("text", { x: "4", y: "12", fontSize: "5", fill: color, fontFamily: "monospace", children: ext.slice(0, 3) })
  ] });
}
function FolderIcon({
  open = false,
  size = 14
}) {
  const color = open ? FOLDER_OPEN_COLOR : FOLDER_COLOR;
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", children: open ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M1.5 3h4l1.5 1.5H14v1H2.5L1 12.5V3z", fill: color, opacity: "0.3" }),
    /* @__PURE__ */ jsx("path", { d: "M2 5.5h12l-2 7H1.5z", fill: color, opacity: "0.6" })
  ] }) : /* @__PURE__ */ jsx("path", { d: "M1.5 2.5h4l1.5 1.5h7v9h-13z", fill: color, opacity: "0.5" }) });
}
function ContextMenu({ x, y, sections, onClose }) {
  return /* @__PURE__ */ jsx(DropdownMenu, { open: true, onOpenChange: (v) => {
    if (!v) onClose();
  }, children: /* @__PURE__ */ jsx(
    DropdownMenuContent,
    {
      fixed: true,
      style: { left: x, top: y },
      className: "min-w-[220px]",
      children: sections.map((section, si) => /* @__PURE__ */ jsxs("div", { children: [
        si > 0 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        section.items.map((item, ii) => /* @__PURE__ */ jsx(
          DropdownMenuItem,
          {
            disabled: item.disabled,
            onSelect: item.onClick,
            shortcut: item.shortcut,
            children: item.label
          },
          ii
        ))
      ] }, si))
    }
  ) });
}
function copyToClipboard$1(text) {
  navigator.clipboard.writeText(text).catch(() => {
  });
}
function getFileContextMenu(node, actions, parentPath) {
  const nodePath = node.path;
  return [
    { items: [{ label: "Open", onClick: () => actions.openTab(nodePath) }] },
    { items: [
      { label: "New File...", onClick: () => actions.createFile(parentPath) },
      { label: "New Folder...", onClick: () => actions.createFolder(parentPath) }
    ] },
    { items: [
      { label: "Duplicate", onClick: () => actions.duplicateFile(nodePath) },
      { label: "Rename", shortcut: "F2", onClick: () => actions.startRename(nodePath) }
    ] },
    { items: [
      { label: "Copy Name", onClick: () => copyToClipboard$1(node.name) },
      { label: "Copy Path", shortcut: "Alt-Shift-C", onClick: () => copyToClipboard$1(nodePath) }
    ] },
    { items: [
      { label: "Find in Folder", shortcut: "Alt-Shift-F", onClick: actions.openSearch },
      { label: "Open in Terminal", onClick: actions.openTerminal }
    ] },
    { items: [{ label: "Delete", shortcut: "Del", onClick: () => actions.deleteNode(nodePath) }] }
  ];
}
function getFolderContextMenu(node, actions) {
  const nodePath = node.path;
  return [
    { items: [
      { label: "New File...", onClick: () => actions.createFile(nodePath) },
      { label: "New Folder...", onClick: () => actions.createFolder(nodePath) }
    ] },
    { items: [{ label: "Rename", shortcut: "F2", onClick: () => actions.startRename(nodePath) }] },
    { items: [{ label: "Copy Name", onClick: () => copyToClipboard$1(node.name) }] },
    { items: [
      { label: "Find in Folder", shortcut: "Alt-Shift-F", onClick: actions.openSearch },
      { label: "Open in Terminal", onClick: actions.openTerminal }
    ] },
    { items: [{ label: "Collapse All", onClick: actions.collapseAll }] },
    { items: [{ label: "Delete", shortcut: "Del", onClick: () => actions.deleteNode(nodePath) }] }
  ];
}
function getBackgroundContextMenu(actions) {
  return [
    { items: [
      { label: "New File...", onClick: () => actions.createFile(null) },
      { label: "New Folder...", onClick: () => actions.createFolder(null) }
    ] },
    { items: [{ label: "Collapse All", onClick: actions.collapseAll }] }
  ];
}
function InlineRenameInput({ name, onCommit, onCancel }) {
  const [value, setValue] = useState(name);
  const inputRef = useRef(null);
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const dotIdx = name.lastIndexOf(".");
    el.setSelectionRange(0, dotIdx > 0 ? dotIdx : name.length);
  }, [name]);
  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== name) {
      onCommit(trimmed);
    } else {
      onCancel();
    }
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref: inputRef,
      value,
      onChange: (e) => setValue(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
        e.stopPropagation();
      },
      onBlur: commit,
      onClick: (e) => e.stopPropagation(),
      className: "bg-bg0 border border-focus rounded px-1 py-0 text-[13px] text-t1 outline-none w-full min-w-0"
    }
  );
}
function InlineCreateInput({ placeholder, onCommit, onCancel }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const commit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onCommit(trimmed);
    } else {
      onCancel();
    }
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref: inputRef,
      value,
      placeholder,
      onChange: (e) => setValue(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
        e.stopPropagation();
      },
      onBlur: commit,
      onClick: (e) => e.stopPropagation(),
      className: "bg-bg0 border border-focus rounded px-1 py-0 text-[13px] text-t1 outline-none w-full min-w-0"
    }
  );
}
const TREE_DND_TYPE = "application/weditor-tree-node";
const FileTreeItem = memo(function FileTreeItem2({ node, depth = 0, defaultOpen, onContextMenu, renamingPath, onRenameCommit, onRenameCancel, parentPath, creating, onCreateCommit, onCreateCancel, forceCollapsed }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
  const openTab = useWorkspaceStore((s) => s.openTab);
  const moveNode = useWorkspaceStore((s) => s.moveNode);
  const activeFilePath = useWorkspaceStore((s) => {
    const pane = s.panes[s.activePaneId];
    return pane?.activeTab ?? "";
  });
  const rowRef = useRef(null);
  const [dropPos, setDropPos] = useState(null);
  const nodePath = node.path;
  useEffect(() => {
    if (forceCollapsed > 0) setIsOpen(false);
  }, [forceCollapsed]);
  useEffect(() => {
    if (creating && creating.parentPath === nodePath && node.type === "folder") {
      setIsOpen(true);
    }
  }, [creating, nodePath, node.type]);
  const isActive = node.type === "file" && activeFilePath === nodePath;
  const isRenaming = renamingPath === nodePath;
  const handleClick = useCallback(() => {
    if (isRenaming) return;
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      openTab(nodePath);
    }
  }, [node, isOpen, openTab, isRenaming, nodePath]);
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData(TREE_DND_TYPE, nodePath);
    if (node.type === "file") {
      e.dataTransfer.setData("application/weditor-file", nodePath);
    }
    e.dataTransfer.effectAllowed = "move";
    e.stopPropagation();
  }, [node, nodePath]);
  const handleDragOver = useCallback((e) => {
    if (!e.dataTransfer.types.includes(TREE_DND_TYPE)) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    const el = rowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    if (node.type === "folder") {
      if (y < h * 0.25) setDropPos("above");
      else if (y > h * 0.75) setDropPos("below");
      else setDropPos("into");
    } else {
      setDropPos(y < h / 2 ? "above" : "below");
    }
  }, [node.type]);
  const handleDragLeave = useCallback((e) => {
    if (rowRef.current && !rowRef.current.contains(e.relatedTarget)) {
      setDropPos(null);
    }
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const pos = dropPos;
    setDropPos(null);
    const draggedPath = e.dataTransfer.getData(TREE_DND_TYPE);
    if (!draggedPath || draggedPath === nodePath) return;
    if (pos === "into" && node.type === "folder") {
      moveNode(draggedPath, nodePath);
      setIsOpen(true);
    } else if (pos === "above" || pos === "below") {
      moveNode(draggedPath, parentPath);
    }
  }, [dropPos, node, moveNode, parentPath, nodePath]);
  const paddingLeft = depth * 12 + 8;
  const showCreateInside = creating && creating.parentPath === nodePath && node.type === "folder";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: rowRef,
        onClick: handleClick,
        onContextMenu: (e) => onContextMenu(e, node, parentPath),
        draggable: !isRenaming,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        className: cn(
          "flex items-center gap-1.5 py-[3px] pr-2 cursor-pointer select-none text-[13px] group relative",
          "hover:bg-hover",
          isActive ? "bg-hover text-t1" : "text-t3",
          dropPos === "into" && "bg-accent/15"
        ),
        style: { paddingLeft },
        children: [
          dropPos === "above" && /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-0 h-[2px] bg-accent rounded-full z-10", style: { marginLeft: paddingLeft } }),
          dropPos === "below" && /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 bottom-0 h-[2px] bg-accent rounded-full z-10", style: { marginLeft: paddingLeft } }),
          depth > 0 && Array.from({ length: depth }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 w-px bg-border", style: { left: i * 12 + 20 } }, i)),
          node.type === "folder" ? /* @__PURE__ */ jsx("span", { className: "text-t4 w-4 flex items-center justify-center flex-shrink-0", children: isOpen ? /* @__PURE__ */ jsx(ChevronDown, { size: 12 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 12 }) }) : /* @__PURE__ */ jsx("span", { className: "w-4 flex-shrink-0" }),
          node.type === "folder" ? /* @__PURE__ */ jsx(FolderIcon, { open: isOpen, size: 14 }) : /* @__PURE__ */ jsx(FileIcon, { name: node.name, size: 14 }),
          isRenaming ? /* @__PURE__ */ jsx(
            InlineRenameInput,
            {
              name: node.name,
              onCommit: (newName) => onRenameCommit(nodePath, newName),
              onCancel: onRenameCancel
            }
          ) : /* @__PURE__ */ jsx("span", { className: "truncate text-[13px]", children: node.name })
        ]
      }
    ),
    node.type === "folder" && isOpen && /* @__PURE__ */ jsxs("div", { children: [
      node.children?.map((child, idx) => /* @__PURE__ */ jsx(
        FileTreeItem2,
        {
          node: child,
          depth: depth + 1,
          defaultOpen: child.name === "crates" || child.name === "zed" || child.name === "src",
          onContextMenu,
          renamingPath,
          onRenameCommit,
          onRenameCancel,
          parentPath: nodePath,
          creating,
          onCreateCommit,
          onCreateCancel,
          forceCollapsed
        },
        child.path || idx
      )),
      showCreateInside && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-1.5 py-[3px] pr-2 text-[13px]",
          style: { paddingLeft: (depth + 1) * 12 + 8 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 flex-shrink-0" }),
            creating.type === "folder" ? /* @__PURE__ */ jsx(FolderIcon, { open: false, size: 14 }) : /* @__PURE__ */ jsx(FileIcon, { name: "untitled", size: 14 }),
            /* @__PURE__ */ jsx(
              InlineCreateInput,
              {
                placeholder: creating.type === "file" ? "filename" : "folder name",
                onCommit: onCreateCommit,
                onCancel: onCreateCancel
              }
            )
          ]
        }
      )
    ] })
  ] });
});
function FileTree({ files }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [renamingPath, setRenamingPath] = useState(null);
  const [creating, setCreating] = useState(null);
  const [rootDragOver, setRootDragOver] = useState(false);
  const forceCollapsed = useWorkspaceStore((s) => s.collapseCounter);
  const openTab = useWorkspaceStore((s) => s.openTab);
  const setLeftPanel = useWorkspaceStore((s) => s.setLeftPanel);
  const setBottomPanel = useWorkspaceStore((s) => s.setBottomPanel);
  const renameFile = useWorkspaceStore((s) => s.renameFile);
  const moveNode = useWorkspaceStore((s) => s.moveNode);
  const createFile = useWorkspaceStore((s) => s.createFile);
  const createFolder = useWorkspaceStore((s) => s.createFolder);
  const deleteNode = useWorkspaceStore((s) => s.deleteNode);
  const duplicateFile = useWorkspaceStore((s) => s.duplicateFile);
  const collapseAll = useWorkspaceStore((s) => s.collapseAll);
  const menuActions = {
    openTab,
    openSearch: () => setLeftPanel("search"),
    openTerminal: () => setBottomPanel("terminal"),
    startRename: (nodePath) => setRenamingPath(nodePath),
    deleteNode,
    duplicateFile,
    createFile: (parentPath) => setCreating({ type: "file", parentPath }),
    createFolder: (parentPath) => setCreating({ type: "folder", parentPath }),
    collapseAll
  };
  const handleItemContextMenu = useCallback((e, node, parentPath) => {
    e.preventDefault();
    e.stopPropagation();
    const sections = node.type === "file" ? getFileContextMenu(node, menuActions, parentPath) : getFolderContextMenu(node, menuActions);
    setContextMenu({ x: e.clientX, y: e.clientY, sections });
  }, [openTab, setLeftPanel, setBottomPanel, deleteNode, duplicateFile]);
  const handleBackgroundContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, sections: getBackgroundContextMenu(menuActions) });
  }, []);
  const handleRenameCommit = useCallback((oldPath, newName) => {
    renameFile(oldPath, newName);
    setRenamingPath(null);
  }, [renameFile]);
  const handleRenameCancel = useCallback(() => {
    setRenamingPath(null);
  }, []);
  const handleCreateCommit = useCallback((name) => {
    if (!creating) return;
    if (creating.type === "file") {
      createFile(name, creating.parentPath);
    } else {
      createFolder(name, creating.parentPath);
    }
    setCreating(null);
  }, [creating, createFile, createFolder]);
  const handleCreateCancel = useCallback(() => {
    setCreating(null);
  }, []);
  const handleRootDragOver = useCallback((e) => {
    if (!e.dataTransfer.types.includes(TREE_DND_TYPE)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);
  const handleRootDrop = useCallback((e) => {
    e.preventDefault();
    setRootDragOver(false);
    const draggedPath = e.dataTransfer.getData(TREE_DND_TYPE);
    if (draggedPath) {
      moveNode(draggedPath, null);
    }
  }, [moveNode]);
  const showRootCreate = creating && creating.parentPath === null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("py-1 min-h-full", rootDragOver && "bg-accent/10"),
      onContextMenu: handleBackgroundContextMenu,
      onDragOver: (e) => {
        handleRootDragOver(e);
        if (e.dataTransfer.types.includes(TREE_DND_TYPE)) setRootDragOver(true);
      },
      onDragLeave: (e) => {
        if (e.currentTarget === e.target) setRootDragOver(false);
      },
      onDrop: handleRootDrop,
      children: [
        files.length === 0 && !showRootCreate && /* @__PURE__ */ jsx("div", { className: "px-3 py-4 text-t4 text-xs text-center", children: "No files yet. Open a project or use the terminal." }),
        files.map((node, idx) => /* @__PURE__ */ jsx(
          FileTreeItem,
          {
            node,
            defaultOpen: node.type === "folder",
            onContextMenu: handleItemContextMenu,
            renamingPath,
            onRenameCommit: handleRenameCommit,
            onRenameCancel: handleRenameCancel,
            parentPath: null,
            creating,
            onCreateCommit: handleCreateCommit,
            onCreateCancel: handleCreateCancel,
            forceCollapsed
          },
          node.path || idx
        )),
        showRootCreate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 py-[3px] pr-2 text-[13px]", style: { paddingLeft: 8 }, children: [
          /* @__PURE__ */ jsx("span", { className: "w-4 flex-shrink-0" }),
          creating.type === "folder" ? /* @__PURE__ */ jsx(FolderIcon, { open: false, size: 14 }) : /* @__PURE__ */ jsx(FileIcon, { name: "untitled", size: 14 }),
          /* @__PURE__ */ jsx(
            InlineCreateInput,
            {
              placeholder: creating.type === "file" ? "filename" : "folder name",
              onCommit: handleCreateCommit,
              onCancel: handleCreateCancel
            }
          )
        ] }),
        contextMenu && /* @__PURE__ */ jsx(
          ContextMenu,
          {
            x: contextMenu.x,
            y: contextMenu.y,
            sections: contextMenu.sections,
            onClose: () => setContextMenu(null)
          }
        )
      ]
    }
  );
}
function filterTree(nodes, filter) {
  const lower = filter.toLowerCase();
  const result = [];
  for (const node of nodes) {
    if (node.type === "folder") {
      const filteredChildren = filterTree(node.children ?? [], filter);
      if (filteredChildren.length > 0) {
        result.push({ ...node, children: filteredChildren });
      }
    } else {
      if (node.name.toLowerCase().includes(lower)) {
        result.push(node);
      }
    }
  }
  return result;
}
function ProjectPanel() {
  const [filterText, setFilterText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [importing, setImporting] = useState(false);
  const projectFiles = useWorkspaceStore((s) => s.projectFiles);
  const instance = useNodepodStore((s) => s.instance);
  const refreshFileTree = useNodepodStore((s) => s.refreshFileTree);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const filteredFiles = useMemo(() => {
    if (!filterText.trim()) return projectFiles;
    return filterTree(projectFiles, filterText.trim());
  }, [projectFiles, filterText]);
  const handleImportFiles = useCallback(async (files) => {
    if (!files || !instance) return;
    setImporting(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const relativePath = file.webkitRelativePath || file.name;
        const targetPath = `/project/${relativePath}`;
        const parentDir = targetPath.substring(0, targetPath.lastIndexOf("/"));
        if (parentDir && parentDir !== "/project") {
          try {
            await instance.fs.mkdir(parentDir, { recursive: true });
          } catch {
          }
        }
        const content = await file.text();
        await instance.fs.writeFile(targetPath, content);
        if ((i + 1) % 10 === 0) {
          await new Promise((r) => setTimeout(r, 0));
        }
      }
      await refreshFileTree();
    } finally {
      setImporting(false);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (folderInputRef.current) folderInputRef.current.value = "";
  }, [instance, refreshFileTree]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        className: "hidden",
        onChange: (e) => handleImportFiles(e.target.files)
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: folderInputRef,
        type: "file",
        className: "hidden",
        onChange: (e) => handleImportFiles(e.target.files),
        ...{ webkitdirectory: "" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-[35px] px-3 shrink-0 border-b border-border", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold tracking-wider text-t4 uppercase", children: "Project" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => fileInputRef.current?.click(),
            className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
            title: "Import files",
            children: /* @__PURE__ */ jsx(FileUp, { size: 12 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => folderInputRef.current?.click(),
            className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
            title: "Import folder",
            children: /* @__PURE__ */ jsx(FolderUp, { size: 12 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowFilter(!showFilter),
            className: cn("p-1 rounded hover:bg-hover", showFilter ? "text-accent" : "text-t4 hover:text-t3"),
            children: /* @__PURE__ */ jsx(Search, { size: 12 })
          }
        )
      ] })
    ] }),
    showFilter && /* @__PURE__ */ jsx("div", { className: "px-2 py-1.5 border-b border-border", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: filterText,
        onChange: (e) => setFilterText(e.target.value),
        placeholder: "Filter files...",
        autoFocus: true,
        className: "w-full bg-bg3 border border-border rounded px-2 py-1 text-[12px] text-t1 placeholder-t4 outline-none focus:border-focus"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin", children: [
      importing && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 text-[11px] text-t4 border-b border-border", children: [
        /* @__PURE__ */ jsx(LoaderCircle, { size: 12, className: "animate-spin" }),
        "Importing files..."
      ] }),
      /* @__PURE__ */ jsx(FileTree, { files: filteredFiles })
    ] })
  ] });
}
function GitPanel() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col h-full p-2 text-sm opacity-60", children: "Git" });
}
function SearchPanel() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col h-full p-2 text-sm opacity-60", children: "Search" });
}
function buildTerminalTheme(themeName) {
  const theme = getTheme(themeName);
  const c = theme.colors;
  return {
    background: c.bg0,
    foreground: c.text2,
    cursor: c.accent,
    selectionBackground: c.selection,
    black: c.bg0,
    red: c.deleted,
    green: c.added,
    yellow: c.warning,
    blue: c.accent,
    magenta: c.purple,
    cyan: c.syntaxType,
    white: c.text2,
    brightBlack: c.text4,
    brightRed: c.deleted,
    brightGreen: c.added,
    brightYellow: c.warning,
    brightBlue: c.accent,
    brightMagenta: c.purple,
    brightCyan: c.syntaxType,
    brightWhite: c.text1
  };
}
function TerminalPanel() {
  const bottomDockMaximized = useWorkspaceStore((s) => s.bottomDockMaximized);
  const toggleBottomDockMaximized = useWorkspaceStore((s) => s.toggleBottomDockMaximized);
  const bottomDockHeight = useWorkspaceStore((s) => s.bottomDock.height);
  const nodepodInstance = useNodepodStore((s) => s.instance);
  const startupCommand = useNodepodStore((s) => s.startupCommand);
  const themeName = useSettingsStore((s) => s.settings.theme);
  const termFontSize = useSettingsStore((s) => s.settings.terminal_font_size);
  const termFontFamily = useSettingsStore((s) => s.settings.terminal_font_family);
  const termCursor = useSettingsStore((s) => s.settings.terminal_cursor);
  const termBlinking = useSettingsStore((s) => s.settings.terminal_blinking);
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const terminalsRef = useRef(/* @__PURE__ */ new Map());
  const mountedRef = useRef(/* @__PURE__ */ new Set());
  const initialTabCreated = useRef(false);
  const startupExecutedRef = useRef(false);
  tabs.find((t) => t.id === activeTabId);
  useEffect(() => {
    if (nodepodInstance && !initialTabCreated.current) {
      initialTabCreated.current = true;
      addTab();
    }
  }, [nodepodInstance]);
  useEffect(() => {
    const theme = buildTerminalTheme(themeName);
    for (const terminal of terminalsRef.current.values()) {
      try {
        terminal.setTheme(theme);
      } catch {
      }
    }
  }, [themeName]);
  useEffect(() => {
    for (const terminal of terminalsRef.current.values()) {
      try {
        const xterm = terminal._xterm ?? terminal.xterm;
        if (xterm) {
          xterm.options.fontSize = termFontSize;
          xterm.options.fontFamily = `'${termFontFamily}', 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Consolas', monospace`;
          xterm.options.cursorStyle = termCursor;
          xterm.options.cursorBlink = termBlinking;
        }
        try {
          terminal.fit();
        } catch {
        }
      } catch {
      }
    }
  }, [termFontSize, termFontFamily, termCursor, termBlinking]);
  useEffect(() => {
    const terminal = activeTabId ? terminalsRef.current.get(activeTabId) : null;
    if (terminal) {
      setTimeout(() => {
        try {
          terminal.fit();
        } catch {
        }
      }, 50);
    }
  }, [bottomDockHeight, bottomDockMaximized, activeTabId]);
  useEffect(() => {
    return () => {
      for (const terminal of terminalsRef.current.values()) {
        try {
          terminal.detach();
        } catch {
        }
      }
      terminalsRef.current.clear();
      mountedRef.current.clear();
    };
  }, []);
  const addTab = useCallback(() => {
    const id = `term-${Date.now()}`;
    setTabs((prev) => [...prev, { id, title: "terminal" }]);
    setActiveTabId(id);
  }, []);
  const closeTermTab = useCallback((id) => {
    const terminal = terminalsRef.current.get(id);
    if (terminal) {
      try {
        terminal.detach();
      } catch {
      }
      terminalsRef.current.delete(id);
      mountedRef.current.delete(id);
    }
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      setActiveTabId((currentActive) => {
        if (currentActive === id && next.length > 0) return next[0].id;
        if (next.length === 0) return null;
        return currentActive;
      });
      return next;
    });
  }, []);
  const mountTerminal = useCallback(
    async (tabId, container) => {
      if (mountedRef.current.has(tabId)) return;
      if (!nodepodInstance) return;
      mountedRef.current.add(tabId);
      try {
        const { Terminal } = await import("@xterm/xterm");
        const { FitAddon } = await import("@xterm/addon-fit");
        const devTerminal = nodepodInstance.createTerminal({
          Terminal,
          FitAddon,
          theme: buildTerminalTheme(themeName),
          fontSize: termFontSize,
          fontFamily: `'${termFontFamily}', 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Consolas', monospace`,
          cursorStyle: termCursor,
          cursorBlink: termBlinking
        });
        devTerminal.attach(container);
        devTerminal.showPrompt();
        terminalsRef.current.set(tabId, devTerminal);
        if (startupCommand && !startupExecutedRef.current) {
          startupExecutedRef.current = true;
          setTimeout(() => {
            try {
              devTerminal.input(startupCommand + "\r");
            } catch (e) {
              console.error("Failed to auto-execute startup command:", e);
            }
          }, 500);
        }
      } catch (e) {
        console.error("Failed to mount terminal:", e);
        mountedRef.current.delete(tabId);
      }
    },
    [nodepodInstance, themeName, startupCommand, termFontSize, termFontFamily, termCursor, termBlinking]
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-bg0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[35px] border-b border-border shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center h-full flex-1 overflow-x-auto scrollbar-none", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => setActiveTabId(tab.id),
          className: cn(
            "flex items-center gap-1.5 px-3 h-full text-[12px] cursor-pointer select-none border-r border-border group min-w-[100px]",
            activeTabId === tab.id ? "bg-bg2 text-t1" : "text-t4 hover:text-t3"
          ),
          children: [
            /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: tab.title }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  closeTermTab(tab.id);
                },
                className: "opacity-0 group-hover:opacity-60 hover:!opacity-100 rounded p-0.5",
                children: /* @__PURE__ */ jsx(X, { size: 10 })
              }
            )
          ]
        },
        tab.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 px-2 border-l border-border h-full", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: addTab,
            className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
            disabled: !nodepodInstance,
            children: /* @__PURE__ */ jsx(Plus, { size: 13 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleBottomDockMaximized,
            className: cn(
              "p-1 rounded hover:bg-hover",
              bottomDockMaximized ? "text-accent" : "text-t4 hover:text-t3"
            ),
            title: bottomDockMaximized ? "Restore" : "Maximize",
            children: bottomDockMaximized ? /* @__PURE__ */ jsx(Minimize2, { size: 12 }) : /* @__PURE__ */ jsx(Maximize2, { size: 12 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative overflow-hidden", children: [
      !nodepodInstance && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-t4 text-sm", children: "Loading runtime..." }),
      tabs.map((tab) => /* @__PURE__ */ jsx(
        "div",
        {
          ref: (el) => {
            if (el && nodepodInstance) mountTerminal(tab.id, el);
          },
          className: cn(
            "absolute inset-0",
            tab.id === activeTabId ? "visible" : "invisible"
          )
        },
        tab.id
      ))
    ] })
  ] });
}
function RequestSender({ baseUrl }) {
  return null;
}
let nextTabId = 1;
function createTab(url = "/__preview__/3000/", title = "Preview") {
  return { id: `btab-${nextTabId++}`, title, url };
}
function getPreviewPort(url) {
  const m = url.match(/^\/__preview__\/(\d+)/);
  return m ? Number(m[1]) : null;
}
function BrowserPanel() {
  const serverPorts = useNodepodStore((s) => s.serverPorts);
  const [tabs, setTabs] = useState(() => [
    createTab()
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [inputValue, setInputValue] = useState(tabs[0].url);
  const [isLoading, setIsLoading] = useState(false);
  const [showSender, setShowSender] = useState(false);
  const iframeRef = useRef(null);
  const inputRef = useRef(null);
  const navigatedPortsRef = useRef(/* @__PURE__ */ new Set());
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const firstPort = useMemo(() => {
    for (const [port] of serverPorts) return port;
    return null;
  }, [serverPorts]);
  useEffect(() => {
    for (const [port] of serverPorts) {
      if (!navigatedPortsRef.current.has(port)) {
        navigatedPortsRef.current.add(port);
        const previewUrl = `/__preview__/${port}/`;
        setTabs(
          (prev) => prev.map(
            (t) => t.id === activeTabId ? { ...t, url: previewUrl, title: `localhost:${port}` } : t
          )
        );
        setInputValue(previewUrl);
        setIsLoading(true);
        break;
      }
    }
  }, [serverPorts, activeTabId]);
  const navigate = useCallback(
    (url) => {
      let resolved = url.trim();
      if (!resolved) return;
      if (resolved.startsWith("/__preview__/")) ;
      else if (/^localhost:\d+/i.test(resolved)) {
        const m = resolved.match(/^localhost:(\d+)(\/.*)?$/i);
        if (m) {
          resolved = `/__preview__/${m[1]}${m[2] || "/"}`;
        }
      } else if (/^https?:\/\/localhost:\d+/i.test(resolved)) {
        const m = resolved.match(/^https?:\/\/localhost:(\d+)(\/.*)?$/i);
        if (m) {
          resolved = `/__preview__/${m[1]}${m[2] || "/"}`;
        }
      } else if (resolved.startsWith("/")) {
        const port = getPreviewPort(activeTab.url) || firstPort;
        if (port) {
          resolved = `/__preview__/${port}${resolved}`;
        } else {
          return;
        }
      } else {
        return;
      }
      const title = resolved.startsWith("/__preview__/") ? `localhost:${getPreviewPort(resolved) || ""}${resolved.replace(/^\/__preview__\/\d+/, "")}` : resolved;
      setTabs(
        (prev) => prev.map(
          (t) => t.id === activeTabId ? { ...t, url: resolved, title } : t
        )
      );
      setInputValue(resolved);
      setIsLoading(true);
    },
    [activeTabId, activeTab.url, firstPort]
  );
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(inputValue);
      inputRef.current?.blur();
    }
  };
  const reload = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      setIsLoading(true);
      iframe.src = activeTab.url;
    }
  };
  const goHome = () => {
    if (firstPort) {
      navigate(`/__preview__/${firstPort}/`);
    } else {
      navigate("/__preview__/3000/");
    }
  };
  const addTab = () => {
    const tab = createTab();
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
    setInputValue(tab.url);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  };
  const closeTab = (id) => {
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      const newActive = newTabs[Math.min(idx, newTabs.length - 1)];
      setActiveTabId(newActive.id);
      setInputValue(newActive.url);
    }
  };
  const switchTab = (id) => {
    setActiveTabId(id);
    const tab = tabs.find((t) => t.id === id);
    if (tab) setInputValue(tab.url);
  };
  const senderBaseUrl = activeTab.url.startsWith("/__preview__/") ? activeTab.url : firstPort ? `/__preview__/${firstPort}/` : "/";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-bg0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[35px] border-b border-border shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center flex-1 min-w-0 h-full overflow-x-auto scrollbar-none", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => switchTab(tab.id),
          className: cn(
            "flex items-center gap-1.5 px-3 h-full min-w-[100px] max-w-[180px] cursor-pointer select-none border-r border-border group",
            tab.id === activeTabId ? "bg-bg2 text-t1" : "bg-bg0 text-t4 hover:text-t3 hover:bg-bg1"
          ),
          children: [
            /* @__PURE__ */ jsx(Globe, { size: 11, className: "shrink-0 text-t4" }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-[12px] flex-1", children: tab.title }),
            tabs.length > 1 && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                },
                className: cn(
                  "p-0.5 rounded hover:bg-hover",
                  tab.id === activeTabId ? "opacity-60 hover:opacity-100" : "opacity-0 group-hover:opacity-60 hover:!opacity-100"
                ),
                children: /* @__PURE__ */ jsx(X, { size: 10 })
              }
            )
          ]
        },
        tab.id
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: addTab,
          className: "p-1.5 mx-1 rounded text-t4 hover:text-t3 hover:bg-hover shrink-0",
          children: /* @__PURE__ */ jsx(Plus, { size: 13 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 h-[34px] px-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            try {
              iframeRef.current?.contentWindow?.history.back();
            } catch {
            }
          },
          className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            try {
              iframeRef.current?.contentWindow?.history.forward();
            } catch {
            }
          },
          className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
          "aria-label": "Go forward",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: reload,
          className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
          children: /* @__PURE__ */ jsx(RotateCw, { size: 12, className: isLoading ? "animate-spin" : "" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goHome,
          className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
          title: "Home",
          children: /* @__PURE__ */ jsx(House, { size: 13 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center bg-bg3 border border-border rounded-md px-2.5 py-1 gap-2 focus-within:border-focus min-w-0", children: [
        /* @__PURE__ */ jsx(Shield, { size: 11, className: "text-t4 shrink-0" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            onKeyDown: handleKeyDown,
            onFocus: (e) => e.target.select(),
            placeholder: "Enter local path or localhost:port/path",
            className: "flex-1 bg-transparent text-[12px] text-t1 placeholder-t4 outline-none min-w-0",
            spellCheck: false
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowSender((v) => !v),
          className: cn(
            "p-1 rounded hover:bg-hover",
            showSender ? "text-accent" : "text-t4 hover:text-t3"
          ),
          title: "API Request Sender",
          children: /* @__PURE__ */ jsx(Send, { size: 13 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 bg-white relative", children: showSender ? /* @__PURE__ */ jsx(RequestSender, { baseUrl: senderBaseUrl }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] z-10", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-accent animate-pulse", style: { width: "60%" } }) }),
      /* @__PURE__ */ jsx(
        "iframe",
        {
          ref: iframeRef,
          src: activeTab.url,
          className: "w-full h-full border-none",
          sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox",
          onLoad: () => setIsLoading(false),
          title: "Browser"
        }
      )
    ] }) })
  ] });
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
let wasmModule = null;
const log = (...args) => {
};
let wasmStatus = "idle";
let initializationPromise = null;
let performanceStats = {
  initTime: 0,
  memoryUsage: 0,
  isOptimized: false,
  version: "0.0.0",
  opsPerSecond: 0
};
const setStatus = (status, error = null) => {
  wasmStatus = status;
};
const initializeWasm = () => {
  if (initializationPromise) {
    return initializationPromise;
  }
  if (wasmStatus === "ready") {
    return Promise.resolve();
  }
  setStatus("initializing");
  const startTime = performance.now();
  initializationPromise = (() => __awaiter$1(void 0, void 0, void 0, function* () {
    try {
      log("Initializing WASM engine...");
      const wasmBindings = yield import("./warper_wasm-dF2xSn4w.js");
      wasmModule = wasmBindings;
      const wasmInit = wasmBindings.default;
      yield wasmInit();
      const endTime = performance.now();
      performanceStats.initTime = endTime - startTime;
      performanceStats.isOptimized = true;
      performanceStats.version = wasmModule.get_version();
      try {
        performanceStats.opsPerSecond = wasmModule.bench_uniform(1e4, 1e3);
      } catch (_a) {
        performanceStats.opsPerSecond = 0;
      }
      log(`Initialized in ${performanceStats.initTime.toFixed(2)}ms`);
      setStatus("ready");
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setStatus("error", error);
      throw error;
    } finally {
      initializationPromise = null;
    }
  }))();
  return initializationPromise;
};
const getWasmModule = () => {
  if (wasmStatus !== "ready" || !wasmModule) {
    throw new Error("WASM not initialized. Call initializeWasm() first.");
  }
  return wasmModule;
};
const createVirtualizer = (sizes) => {
  const wasm = getWasmModule();
  const sizesArray = new Float64Array(sizes);
  return new wasm.QuantumVariable(sizesArray);
};
const createUniformVirtualizer = (count, size) => {
  const wasm = getWasmModule();
  return new wasm.QuantumUniform(count, size);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const MAX_SAFE_SCROLL_HEIGHT = 15e6;
const MAX_VISIBLE = 200;
const bufferA = {
  items: new Int32Array(MAX_VISIBLE),
  offsets: new Float64Array(MAX_VISIBLE),
  sizes: new Float64Array(MAX_VISIBLE)
};
const bufferB = {
  items: new Int32Array(MAX_VISIBLE),
  offsets: new Float64Array(MAX_VISIBLE),
  sizes: new Float64Array(MAX_VISIBLE)
};
let cachedItemsA = [];
let cachedItemsB = [];
let cachedOffsetsA = [];
let cachedOffsetsB = [];
let cachedSizesA = [];
let cachedSizesB = [];
const EMPTY_RANGE = Object.freeze({
  startIndex: 0,
  endIndex: 0,
  items: Object.freeze([]),
  offsets: Object.freeze([]),
  sizes: Object.freeze([]),
  totalHeight: 0,
  paddingTop: 0,
  velocity: 0
});
function useVirtualizer(options) {
  const { itemCount, estimateSize, overscan = 3, horizontal = false } = options;
  const [range, setRange] = useState(EMPTY_RANGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const refs = useRef({
    element: null,
    virtualizer: null,
    uniformVirtualizer: null,
    isUniform: false,
    uniformSize: 0,
    lastStart: -1,
    lastEnd: -1,
    lastPaddingTop: 0,
    rafId: 0,
    rafPending: false,
    mounted: true,
    itemCount,
    estimateSize,
    overscan,
    horizontal,
    scrollMultiplier: 1,
    virtualTotalHeight: 0,
    actualScrollHeight: 0,
    useBufferA: true,
    lastScrollTime: 0,
    lastScrollPos: 0,
    velocity: 0
  });
  const r = refs.current;
  r.itemCount = itemCount;
  r.estimateSize = estimateSize;
  r.overscan = overscan;
  r.horizontal = horizontal;
  const calculateRange = useCallback(() => {
    const r2 = refs.current;
    const el = r2.element;
    if (!el || !r2.mounted)
      return;
    const scrollPos = r2.horizontal ? el.scrollLeft : el.scrollTop;
    const viewportSize = r2.horizontal ? el.clientWidth : el.clientHeight;
    if (viewportSize <= 0)
      return;
    const now = performance.now();
    const dt = now - r2.lastScrollTime;
    if (dt > 0 && dt < 100) {
      r2.velocity = Math.abs((scrollPos - r2.lastScrollPos) / dt) * 1e3;
    }
    r2.lastScrollTime = now;
    r2.lastScrollPos = scrollPos;
    const virtualScroll = scrollPos * r2.scrollMultiplier;
    let start = 0, end = 0;
    if (r2.isUniform && r2.uniformVirtualizer) {
      const info = r2.uniformVirtualizer.calc_range(virtualScroll, viewportSize, r2.overscan);
      start = info[0] | 0;
      end = info[1] | 0;
    } else if (r2.virtualizer) {
      const info = r2.virtualizer.calc_range(virtualScroll, viewportSize, r2.overscan);
      start = info[0] | 0;
      end = info[1] | 0;
    } else {
      return;
    }
    start = Math.max(0, start);
    end = Math.min(r2.itemCount, end);
    let firstItemVirtualOffset = 0;
    if (r2.isUniform) {
      firstItemVirtualOffset = start * r2.uniformSize;
    } else if (r2.virtualizer) {
      firstItemVirtualOffset = r2.virtualizer.get_offset(start);
    }
    const paddingTop = firstItemVirtualOffset / r2.scrollMultiplier;
    if (start === r2.lastStart && end === r2.lastEnd && Math.abs(paddingTop - r2.lastPaddingTop) < 0.5) {
      return;
    }
    r2.lastStart = start;
    r2.lastEnd = end;
    r2.lastPaddingTop = paddingTop;
    const count = Math.min(end - start, MAX_VISIBLE);
    const useA = r2.useBufferA;
    const buffer = useA ? bufferA : bufferB;
    r2.useBufferA = !r2.useBufferA;
    if (r2.isUniform) {
      const size = r2.uniformSize;
      for (let i = 0; i < count; i++) {
        const idx = start + i;
        buffer.items[i] = idx;
        buffer.offsets[i] = i * size;
        buffer.sizes[i] = size;
      }
    } else if (r2.virtualizer) {
      for (let i = 0; i < count; i++) {
        const idx = start + i;
        buffer.items[i] = idx;
        buffer.offsets[i] = r2.virtualizer.get_offset(idx) - firstItemVirtualOffset;
        buffer.sizes[i] = r2.virtualizer.get_size(idx);
      }
    }
    let cachedItems = useA ? cachedItemsA : cachedItemsB;
    let cachedOffsets = useA ? cachedOffsetsA : cachedOffsetsB;
    let cachedSizes = useA ? cachedSizesA : cachedSizesB;
    if (cachedItems.length !== count) {
      cachedItems = new Array(count);
      cachedOffsets = new Array(count);
      cachedSizes = new Array(count);
      if (useA) {
        cachedItemsA = cachedItems;
        cachedOffsetsA = cachedOffsets;
        cachedSizesA = cachedSizes;
      } else {
        cachedItemsB = cachedItems;
        cachedOffsetsB = cachedOffsets;
        cachedSizesB = cachedSizes;
      }
    }
    for (let i = 0; i < count; i++) {
      cachedItems[i] = buffer.items[i];
      cachedOffsets[i] = buffer.offsets[i];
      cachedSizes[i] = buffer.sizes[i];
    }
    const newRange = {
      startIndex: start,
      endIndex: end,
      items: cachedItems,
      offsets: cachedOffsets,
      sizes: cachedSizes,
      totalHeight: r2.actualScrollHeight,
      paddingTop,
      velocity: r2.velocity
    };
    setRange(newRange);
  }, []);
  const handleScroll = useCallback(() => {
    const r2 = refs.current;
    if (r2.rafPending)
      return;
    r2.rafPending = true;
    r2.rafId = requestAnimationFrame(() => {
      r2.rafPending = false;
      calculateRange();
    });
  }, [calculateRange]);
  useEffect(() => {
    const r2 = refs.current;
    r2.mounted = true;
    const init = () => __awaiter(this, void 0, void 0, function* () {
      try {
        yield initializeWasm();
        if (!r2.mounted)
          return;
        const count = r2.itemCount;
        const firstSize = r2.estimateSize(0);
        let isUniform = true;
        const checkCount = Math.min(10, count);
        for (let i = 1; i < checkCount; i++) {
          if (r2.estimateSize(i) !== firstSize) {
            isUniform = false;
            break;
          }
        }
        r2.isUniform = isUniform;
        r2.uniformSize = firstSize;
        let virtualTotalHeight;
        if (isUniform) {
          r2.uniformVirtualizer = createUniformVirtualizer(count, firstSize);
          virtualTotalHeight = count * firstSize;
        } else {
          const sizes = new Array(count);
          for (let i = 0; i < count; i++)
            sizes[i] = r2.estimateSize(i);
          r2.virtualizer = createVirtualizer(sizes);
          virtualTotalHeight = sizes.reduce((a, b) => a + b, 0);
        }
        r2.virtualTotalHeight = virtualTotalHeight;
        if (virtualTotalHeight > MAX_SAFE_SCROLL_HEIGHT) {
          r2.actualScrollHeight = MAX_SAFE_SCROLL_HEIGHT;
          r2.scrollMultiplier = virtualTotalHeight / MAX_SAFE_SCROLL_HEIGHT;
        } else {
          r2.actualScrollHeight = virtualTotalHeight;
          r2.scrollMultiplier = 1;
        }
        setIsLoading(false);
        requestAnimationFrame(() => {
          if (r2.mounted && r2.element)
            calculateRange();
        });
      } catch (err) {
        if (!r2.mounted)
          return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    });
    init();
    return () => {
      var _a, _b;
      r2.mounted = false;
      if (r2.rafId)
        cancelAnimationFrame(r2.rafId);
      (_a = r2.virtualizer) === null || _a === void 0 ? void 0 : _a.free();
      (_b = r2.uniformVirtualizer) === null || _b === void 0 ? void 0 : _b.free();
      r2.virtualizer = null;
      r2.uniformVirtualizer = null;
    };
  }, [calculateRange]);
  useEffect(() => {
    const r2 = refs.current;
    if (!isLoading && r2.element) {
      r2.lastStart = -1;
      r2.lastEnd = -1;
      requestAnimationFrame(() => calculateRange());
    }
  }, [isLoading, calculateRange]);
  useEffect(() => {
    const r2 = refs.current;
    if (isLoading)
      return;
    let virtualTotalHeight;
    if (r2.isUniform && r2.uniformVirtualizer) {
      r2.uniformVirtualizer.set_count(itemCount);
      virtualTotalHeight = itemCount * r2.uniformSize;
    } else if (r2.virtualizer) {
      const sizes = new Array(itemCount);
      for (let i = 0; i < itemCount; i++)
        sizes[i] = estimateSize(i);
      r2.virtualizer.free();
      r2.virtualizer = createVirtualizer(sizes);
      virtualTotalHeight = sizes.reduce((a, b) => a + b, 0);
    } else {
      return;
    }
    r2.virtualTotalHeight = virtualTotalHeight;
    if (virtualTotalHeight > MAX_SAFE_SCROLL_HEIGHT) {
      r2.actualScrollHeight = MAX_SAFE_SCROLL_HEIGHT;
      r2.scrollMultiplier = virtualTotalHeight / MAX_SAFE_SCROLL_HEIGHT;
    } else {
      r2.actualScrollHeight = virtualTotalHeight;
      r2.scrollMultiplier = 1;
    }
    r2.lastStart = -1;
    r2.lastEnd = -1;
    calculateRange();
  }, [itemCount, estimateSize, calculateRange, isLoading]);
  const scrollToOffset = useCallback((offset, behavior = "auto") => {
    const el = refs.current.element;
    if (!el)
      return;
    const actualOffset = offset / refs.current.scrollMultiplier;
    if (refs.current.horizontal) {
      el.scrollTo({ left: actualOffset, behavior });
    } else {
      el.scrollTo({ top: actualOffset, behavior });
    }
  }, []);
  const scrollToIndex = useCallback((index, behavior = "auto") => {
    const r2 = refs.current;
    let virtualOffset = 0;
    if (r2.isUniform) {
      virtualOffset = index * r2.uniformSize;
    } else if (r2.virtualizer) {
      virtualOffset = r2.virtualizer.get_offset(index);
    }
    scrollToOffset(virtualOffset, behavior);
  }, [scrollToOffset]);
  const scrollElementRef = useCallback((el) => {
    const r2 = refs.current;
    const prevEl = r2.element;
    r2.element = el;
    if (prevEl && prevEl !== el) {
      prevEl.removeEventListener("scroll", handleScroll);
    }
    if (el && el !== prevEl) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      if (!isLoading) {
        requestAnimationFrame(() => calculateRange());
      }
    }
  }, [handleScroll, calculateRange, isLoading]);
  return {
    scrollElementRef,
    range,
    isLoading,
    error,
    scrollToOffset,
    scrollToIndex,
    totalHeight: range.totalHeight
  };
}
const baseRowStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  contain: "layout style paint",
  willChange: "transform"
};
const Row = memo(function Row2({ index, offset, size, render }) {
  return jsx("div", { style: Object.assign(Object.assign({}, baseRowStyle), { transform: `translateY(${offset}px)`, height: size }), "data-index": index, children: render(index) });
}, (prev, next) => prev.index === next.index && prev.offset === next.offset && prev.size === next.size && prev.render === next.render);
const containerBaseStyle = {
  width: "100%",
  overflow: "auto",
  position: "relative",
  overscrollBehavior: "contain",
  contain: "strict"
};
function WarperComponentInner({ itemCount, estimateSize, children, overscan = 3, height, horizontal = false, className, style, loadingPlaceholder, errorPlaceholder, onRendered }, ref) {
  const elementRef = useRef(null);
  const { scrollElementRef, range, isLoading, error, scrollToOffset, scrollToIndex } = useVirtualizer({
    itemCount,
    estimateSize,
    overscan,
    horizontal
  });
  const handleRef = useCallback((el) => {
    elementRef.current = el;
    scrollElementRef(el);
  }, [scrollElementRef]);
  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    scrollToOffset,
    scrollToIndex
  }), [scrollToOffset, scrollToIndex]);
  const renderedRef = useRef(false);
  useEffect(() => {
    if (!isLoading && onRendered && !renderedRef.current) {
      renderedRef.current = true;
      onRendered();
    }
  }, [isLoading, onRendered]);
  const containerStyle = useMemo(() => Object.assign(Object.assign(Object.assign({}, containerBaseStyle), { height: height !== null && height !== void 0 ? height : "100%" }), style), [height, style]);
  const innerStyle = useMemo(() => ({
    width: "100%",
    position: "relative",
    height: range.totalHeight || 1,
    pointerEvents: "none"
  }), [range.totalHeight]);
  const renderFn = useCallback((index) => children(index), [children]);
  if (error) {
    return jsx("div", { ref: handleRef, style: containerStyle, className, children: errorPlaceholder ? errorPlaceholder(error) : jsxs("div", { style: { padding: 20, color: "#ef4444" }, children: ["⚠️ Error: ", error.message] }) });
  }
  if (isLoading) {
    return jsx("div", { ref: handleRef, style: containerStyle, className, children: loadingPlaceholder !== null && loadingPlaceholder !== void 0 ? loadingPlaceholder : jsx("div", { style: { padding: 20, color: "#888" }, children: "Loading..." }) });
  }
  const { items, offsets, sizes, paddingTop } = range;
  return jsx("div", { ref: handleRef, style: containerStyle, className, "data-warper-container": true, children: jsx("div", { style: innerStyle, "data-warper-inner": true, children: jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    transform: `translateY(${paddingTop}px)`,
    willChange: "transform"
  }, "data-warper-viewport": true, children: items.map((itemIndex, i) => jsx(Row, { index: itemIndex, offset: offsets[i], size: sizes[i], render: renderFn }, itemIndex)) }) }) });
}
const WarperComponent = forwardRef(WarperComponentInner);
const AGENT_TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read the contents of a file. Returns the full text content.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute path (e.g. /project/src/index.js)" }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "write_file",
      description: "Write content to a file, creating it and any parent directories if they don't exist. Overwrites existing content.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute path to the file" },
          content: { type: "string", description: "Full content to write" }
        },
        required: ["path", "content"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "list_directory",
      description: "List files and directories at the given path. Returns entries with [dir] or [file] prefix and size info.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Directory path (e.g. /project)" },
          recursive: { type: "boolean", description: "If true, list recursively (max 3 levels deep). Default false." }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_directory",
      description: "Create a directory (and parents if needed).",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path of the directory to create" }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_path",
      description: "Delete a file or directory (recursively).",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path to delete" }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "rename",
      description: "Rename or move a file or directory.",
      parameters: {
        type: "object",
        properties: {
          from: { type: "string", description: "Current path" },
          to: { type: "string", description: "New path" }
        },
        required: ["from", "to"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "stat",
      description: "Get file or directory metadata (size, type, modification time).",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path to stat" }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "run_command",
      description: "Run a shell command in the project directory. Use for npm install, running scripts, building, testing, or any CLI task. Returns stdout and stderr. Has a 30 second timeout.",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string", description: "The full shell command to run (e.g. 'npm install', 'node index.js', 'ls -la')" },
          cwd: { type: "string", description: "Working directory. Defaults to /project." }
        },
        required: ["command"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "search_files",
      description: "Search for a text pattern across files in a directory. Returns matching lines with file paths and line numbers. Useful for finding usages, definitions, imports, etc.",
      parameters: {
        type: "object",
        properties: {
          pattern: { type: "string", description: "Text or regex pattern to search for" },
          path: { type: "string", description: "Directory to search in. Defaults to /project." },
          include: { type: "string", description: "File glob to include (e.g. '*.ts', '*.{js,jsx}'). Optional." }
        },
        required: ["pattern"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "find_files",
      description: "Find files by name pattern. Returns matching file paths.",
      parameters: {
        type: "object",
        properties: {
          pattern: { type: "string", description: "Filename pattern to match (substring match, case-insensitive)" },
          path: { type: "string", description: "Directory to search in. Defaults to /project." }
        },
        required: ["pattern"]
      }
    }
  },
  // --- Error reporting ---
  {
    type: "function",
    function: {
      name: "report_error",
      description: "Report a suspected Nodepod runtime bug. Use this whenever an error looks like it could be caused by the browser-based Node.js runtime (missing API, incorrect polyfill behavior, crash, package import failure) rather than user code. The user can dismiss false positives — always err on the side of reporting.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Short summary of the bug (e.g. 'fs.createReadStream missing highWaterMark option')" },
          description: { type: "string", description: "Detailed description of what went wrong, what was expected, and what actually happened" },
          code_snippet: { type: "string", description: "The code that triggered the bug" },
          error_message: { type: "string", description: "The exact error message or unexpected output" },
          affected_module: { type: "string", description: "The Node.js module or Nodepod component affected (e.g. 'fs', 'http', 'child_process')" }
        },
        required: ["title", "description", "error_message"]
      }
    }
  }
];
const SYSTEM_PROMPT = `You are an expert AI coding assistant embedded in wZed, a browser-based IDE powered by Nodepod (an in-browser Node.js runtime). You help users build, debug, and understand their projects.

## Environment
You are running inside Nodepod, a browser-based Node.js runtime. Nodepod uses an in-memory virtual filesystem and JavaScript-based polyfills of Node.js built-in modules (fs, http, path, crypto, child_process, etc.). Write normal Node.js code — most APIs work correctly. However, some APIs may be incomplete or have edge-case bugs because they are browser polyfills, not native C++ bindings.

## Capabilities
You have full access to the project's virtual filesystem and a shell terminal. You can:
- Read, write, create, rename, and delete files and directories
- Run any shell command (node, npm, npx, etc.)
- Search across files for patterns, find files by name
- Install npm packages, run scripts, start dev servers

## Guidelines
- The project root is /project. All file paths should be absolute.
- Before modifying code, read the relevant files to understand context.
- When writing files, always provide the complete file content.
- After making changes, run relevant commands to verify (e.g. type-check, tests, build).
- When installing packages, use \`npm install\`.
- Be concise. Show what you did and the result, don't over-explain.
- If a command might run forever (e.g. a dev server), mention that to the user — the 30s timeout will kill it.
- Use search_files and find_files to explore unfamiliar codebases instead of guessing file locations.

## Debugging in Nodepod
When something fails, think about what could cause this in a browser-based runtime. Common root causes:

- **ESM/CJS mismatch**: Nodepod converts ESM to CJS. If exports are empty, methods return undefined, or "class constructors must be invoked with 'new'" — the transform likely broke something.
- **Polyfill gaps**: A Node.js API exists but behaves slightly wrong (missing option, wrong return type).
- **Native bindings**: C++ addon packages (bcrypt, sharp, better-sqlite3, canvas) will never work. Suggest pure-JS alternatives.
- **Async/sync mismatch**: Code hangs or a Promise never resolves — the sync bridge can't unwrap native Promises.
- **Module resolution**: Package found but exports are wrong — resolver picked the wrong conditional export.
- **Missing globals**: \`__dirname\`, \`process.binding\`, etc. may be absent or stubbed.

## Quick Error Triage
When an error mentions a file path (e.g. "TypeError in /project/node_modules/foo/bar.js"), do a quick read_file on that file to glance at the relevant code. Don't analyze it deeply — just skim enough to identify if the issue is an ESM/CJS problem, a missing API, or something the user actually wrote wrong. Keep it brief: one read, a quick assessment, then report or move on. Do NOT go down a rabbit hole investigating node_modules internals.

## Reporting Runtime Bugs
Report errors liberally — not just crashes, but also warnings, unexpected behavior, or anything that seems "off" compared to real Node.js. ALWAYS call report_error FIRST, before attempting any workaround. Keep your message to the user short: say what failed and that you've reported it. Don't hedge with "I'm 60% sure it's X or maybe Y" — just report it and move on. After reporting, you may briefly suggest an alternative if one is obvious.`;
let _nodepodStoreModule = null;
async function getNodepodStoreModule() {
  if (!_nodepodStoreModule) _nodepodStoreModule = await Promise.resolve().then(() => nodepodStore);
  return _nodepodStoreModule;
}
function validatePath(path) {
  if (typeof path !== "string" || !path.startsWith("/")) return "Path must be absolute (start with /)";
  if (path.includes("..")) return "Path must not contain '..' traversal";
  return null;
}
function createNodepodToolExecutor(nodepod, options) {
  return async (name, args) => {
    switch (name) {
      // --- Filesystem ---
      case "read_file": {
        const path = args.path;
        const pathErr = validatePath(path);
        if (pathErr) return `Error: ${pathErr}`;
        try {
          const content = await nodepod.fs.readFile(path, "utf-8");
          return typeof content === "string" ? content : "(empty file)";
        } catch (e) {
          return `Error reading ${path}: ${e.message || e}`;
        }
      }
      case "write_file": {
        const path = args.path;
        const pathErr = validatePath(path);
        if (pathErr) return `Error: ${pathErr}`;
        const content = args.content;
        try {
          await nodepod.fs.writeFile(path, content);
          try {
            const { useNodepodStore: useNodepodStore2 } = await getNodepodStoreModule();
            await useNodepodStore2.getState().refreshFileTree();
          } catch {
          }
          try {
            const { useWorkspaceStore: useWorkspaceStore2 } = await Promise.resolve().then(() => workspaceStore);
            const ws = useWorkspaceStore2.getState();
            const existing = ws.openFiles[path];
            if (existing) {
              useWorkspaceStore2.setState((s) => ({
                openFiles: { ...s.openFiles, [path]: { ...existing, content, modified: false } }
              }));
            }
          } catch {
          }
          return `Wrote ${content.length} chars to ${path}`;
        } catch (e) {
          return `Error writing ${path}: ${e.message || e}`;
        }
      }
      case "list_directory": {
        const path = args.path;
        const recursive = args.recursive ?? false;
        async function listDir(dir, depth) {
          const results = [];
          try {
            const entries = await nodepod.fs.readdir(dir);
            for (const entry of entries.sort()) {
              if (entry === "node_modules" || entry === ".cache" || entry === ".npm" || entry === ".git") continue;
              const fullPath = dir.endsWith("/") ? `${dir}${entry}` : `${dir}/${entry}`;
              try {
                const st = await nodepod.fs.stat(fullPath);
                const indent = "  ".repeat(depth);
                if (st.isDirectory) {
                  results.push(`${indent}[dir]  ${entry}/`);
                  if (recursive && depth < 3) {
                    results.push(...await listDir(fullPath, depth + 1));
                  }
                } else {
                  const size = st.size != null ? ` (${formatSize(st.size)})` : "";
                  results.push(`${indent}[file] ${entry}${size}`);
                }
              } catch {
                results.push(`${"  ".repeat(depth)}[?]    ${entry}`);
              }
            }
          } catch (e) {
            results.push(`Error: ${e.message || e}`);
          }
          return results;
        }
        const lines = await listDir(path, 0);
        return lines.join("\n") || "(empty directory)";
      }
      case "create_directory": {
        const path = args.path;
        try {
          await nodepod.fs.mkdir(path, { recursive: true });
          return `Created directory ${path}`;
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      case "delete_path": {
        const path = args.path;
        try {
          const st = await nodepod.fs.stat(path);
          if (st.isDirectory) {
            await nodepod.fs.rmdir(path, { recursive: true });
          } else {
            await nodepod.fs.unlink(path);
          }
          try {
            const { useNodepodStore: useNodepodStore2 } = await getNodepodStoreModule();
            await useNodepodStore2.getState().refreshFileTree();
          } catch {
          }
          return `Deleted ${path}`;
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      case "rename": {
        const from = args.from;
        const to = args.to;
        try {
          await nodepod.fs.rename(from, to);
          try {
            const { useNodepodStore: useNodepodStore2 } = await getNodepodStoreModule();
            await useNodepodStore2.getState().refreshFileTree();
          } catch {
          }
          return `Renamed ${from} → ${to}`;
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      case "stat": {
        const path = args.path;
        try {
          const st = await nodepod.fs.stat(path);
          return JSON.stringify({
            type: st.isDirectory ? "directory" : "file",
            size: st.size,
            modified: st.mtimeMs ? new Date(st.mtimeMs).toISOString() : void 0
          }, null, 2);
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      case "run_command": {
        const command = args.command;
        const cwd = args.cwd || "/project";
        try {
          const parts = parseCommand(command);
          const cmd = parts[0];
          const cmdArgs = parts.slice(1);
          const proc = await nodepod.spawn(cmd, cmdArgs, { cwd });
          const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Command timed out after 30 seconds")), 3e4);
          });
          const result = await Promise.race([proc.completion, timeout]);
          let output = "";
          if (result.stdout) output += result.stdout;
          if (result.stderr) output += (output ? "\n" : "") + result.stderr;
          if (result.exitCode !== 0) {
            output += `
[exit code: ${result.exitCode}]`;
          }
          try {
            const { useNodepodStore: useNodepodStore2 } = await getNodepodStoreModule();
            await useNodepodStore2.getState().refreshFileTree();
          } catch {
          }
          return output || "(no output)";
        } catch (e) {
          return `Error running "${command}": ${e.message || e}`;
        }
      }
      case "search_files": {
        const pattern = args.pattern;
        const searchPath = args.path || "/project";
        const include = args.include;
        try {
          const results = await grepFiles(nodepod, searchPath, pattern, include);
          return results || "No matches found.";
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      case "find_files": {
        const pattern = args.pattern.toLowerCase();
        const searchPath = args.path || "/project";
        try {
          const matches = await findFilesByName(nodepod, searchPath, pattern);
          return matches.join("\n") || "No matching files found.";
        } catch (e) {
          return `Error: ${e.message || e}`;
        }
      }
      // --- Error reporting ---
      case "report_error": {
        const data = {
          title: args.title,
          description: args.description,
          code_snippet: args.code_snippet,
          error_message: args.error_message,
          affected_module: args.affected_module
        };
        if (options?.onReportError) {
          const reported = await options.onReportError(data);
          return reported ? "The user has opened a GitHub issue to report this bug." : "The user chose not to report this bug at this time.";
        }
        return "Error reporting is not available.";
      }
      default:
        return `Unknown tool: ${name}`;
    }
  };
}
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
function parseCommand(cmd) {
  const parts = [];
  let current = "";
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i];
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }
    if (ch === " " && !inSingle && !inDouble) {
      if (current) {
        parts.push(current);
        current = "";
      }
      continue;
    }
    current += ch;
  }
  if (current) parts.push(current);
  return parts;
}
async function grepFiles(nodepod, dir, pattern, include, maxResults = 50) {
  const results = [];
  let regex;
  try {
    regex = new RegExp(pattern, "gi");
  } catch {
    regex = new RegExp(escapeRegex(pattern), "gi");
  }
  const includeExts = include ? parseGlob(include) : null;
  async function walk(d) {
    if (results.length >= maxResults) return;
    try {
      const entries = await nodepod.fs.readdir(d);
      for (const entry of entries) {
        if (results.length >= maxResults) return;
        if (entry === "node_modules" || entry === ".cache" || entry === ".npm" || entry === ".git" || entry === "dist") continue;
        const full = d.endsWith("/") ? `${d}${entry}` : `${d}/${entry}`;
        try {
          const st = await nodepod.fs.stat(full);
          if (st.isDirectory) {
            await walk(full);
          } else {
            if (includeExts && !matchGlob(entry, includeExts)) continue;
            if (/\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|svg|mp3|mp4|zip|tar|gz|lock)$/i.test(entry)) continue;
            try {
              const content = await nodepod.fs.readFile(full, "utf-8");
              if (typeof content !== "string") continue;
              const lines = content.split("\n");
              for (let i = 0; i < lines.length; i++) {
                if (results.length >= maxResults) return;
                regex.lastIndex = 0;
                if (regex.test(lines[i])) {
                  results.push(`${full}:${i + 1}: ${lines[i].trim().slice(0, 200)}`);
                }
              }
            } catch {
            }
          }
        } catch {
        }
      }
    } catch {
    }
  }
  await walk(dir);
  if (results.length >= maxResults) {
    results.push(`
... (truncated at ${maxResults} results)`);
  }
  return results.join("\n");
}
async function findFilesByName(nodepod, dir, pattern, maxResults = 50) {
  const results = [];
  async function walk(d) {
    if (results.length >= maxResults) return;
    try {
      const entries = await nodepod.fs.readdir(d);
      for (const entry of entries) {
        if (results.length >= maxResults) return;
        if (entry === "node_modules" || entry === ".cache" || entry === ".npm" || entry === ".git") continue;
        const full = d.endsWith("/") ? `${d}${entry}` : `${d}/${entry}`;
        if (entry.toLowerCase().includes(pattern)) {
          results.push(full);
        }
        try {
          const st = await nodepod.fs.stat(full);
          if (st.isDirectory) await walk(full);
        } catch {
        }
      }
    } catch {
    }
  }
  await walk(dir);
  return results;
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseGlob(glob) {
  const braceMatch = glob.match(/^\*\.\{(.+)\}$/);
  if (braceMatch) return braceMatch[1].split(",").map((e) => `.${e.trim()}`);
  const extMatch = glob.match(/^\*(\..+)$/);
  if (extMatch) return [extMatch[1]];
  return [];
}
function matchGlob(filename, exts) {
  return exts.some((ext) => filename.endsWith(ext));
}
const MAX_AGENT_TURNS = 25;
async function runAgentTurn(apiKey, model, messages, toolExecutor, callbacks, signal, _turnCount = 0) {
  if (_turnCount >= MAX_AGENT_TURNS) {
    const limitMsg = {
      role: "assistant",
      content: "I've reached the maximum number of tool-use turns (25). Please continue the conversation to proceed."
    };
    callbacks.onComplete(limitMsg);
    return [...messages, limitMsg];
  }
  const allMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages
  ];
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : ""
    },
    body: JSON.stringify({
      model,
      messages: allMessages.map((m) => {
        const msg = { role: m.role, content: m.content };
        if (m.tool_calls) msg.tool_calls = m.tool_calls;
        if (m.tool_call_id) msg.tool_call_id = m.tool_call_id;
        return msg;
      }),
      tools: AGENT_TOOLS,
      stream: true
    }),
    signal
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error ${response.status}: ${errText.slice(0, 200)}`);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let contentAccum = "";
  const toolCallAccum = {};
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") break;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta;
        if (!delta) continue;
        if (delta.content) {
          contentAccum += delta.content;
          callbacks.onToken(delta.content);
        }
        if (delta.tool_calls) {
          for (const tc of delta.tool_calls) {
            const idx = tc.index ?? 0;
            if (!toolCallAccum[idx]) {
              toolCallAccum[idx] = { id: "", name: "", args: "" };
            }
            if (tc.id) toolCallAccum[idx].id = tc.id;
            if (tc.function?.name) toolCallAccum[idx].name += tc.function.name;
            if (tc.function?.arguments) toolCallAccum[idx].args += tc.function.arguments;
          }
        }
      } catch {
      }
    }
  }
  const toolCalls = [];
  for (const key of Object.keys(toolCallAccum).sort((a, b) => Number(a) - Number(b))) {
    const tc = toolCallAccum[Number(key)];
    if (tc.id && tc.name) {
      toolCalls.push({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: tc.args }
      });
    }
  }
  const assistantMsg = {
    role: "assistant",
    content: contentAccum,
    ...toolCalls.length > 0 ? { tool_calls: toolCalls } : {}
  };
  callbacks.onComplete(assistantMsg);
  const newMessages = [...messages, assistantMsg];
  if (toolCalls.length > 0) {
    const toolResults = [];
    for (const tc of toolCalls) {
      callbacks.onToolCall(tc);
      try {
        const args = JSON.parse(tc.function.arguments);
        const result = await toolExecutor(tc.function.name, args);
        callbacks.onToolResult(tc.id, tc.function.name, result);
        toolResults.push({
          role: "tool",
          content: result,
          tool_call_id: tc.id
        });
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : "Unknown error";
        callbacks.onToolResult(tc.id, tc.function.name, `Error: ${errMsg}`);
        toolResults.push({
          role: "tool",
          content: `Error: ${errMsg}`,
          tool_call_id: tc.id
        });
      }
    }
    return runAgentTurn(
      apiKey,
      model,
      [...newMessages, ...toolResults],
      toolExecutor,
      callbacks,
      signal,
      _turnCount + 1
    );
  }
  return newMessages;
}
let _modelsCache = null;
let _modelsFetchPromise = null;
async function fetchOpenRouterModels(apiKey) {
  if (_modelsCache) return _modelsCache;
  if (_modelsFetchPromise) return _modelsFetchPromise;
  _modelsFetchPromise = (async () => {
    const res = await fetch("https://openrouter.ai/api/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch models: ${res.status}`);
    const json = await res.json();
    const models = (json.data ?? []).filter((m) => m.id && m.name).map((m) => ({
      id: m.id,
      name: m.name,
      context_length: m.context_length ?? 0,
      pricing: {
        prompt: m.pricing?.prompt ?? "0",
        completion: m.pricing?.completion ?? "0"
      }
    })).sort((a, b) => a.name.localeCompare(b.name));
    _modelsCache = models;
    _modelsFetchPromise = null;
    return models;
  })();
  return _modelsFetchPromise;
}
function ErrorReportModal({ data, onConfirm, onDismiss }) {
  return null;
}
let _persistedMessages = [];
let _persistedChatHistory = [];
let _abortController = null;
let _persistedSessions = [];
const SESSION_STORE_KEY = "weditor_ai_sessions";
function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSION_STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveSessions(sessions) {
  try {
    const trimmed = sessions.slice(0, 50);
    localStorage.setItem(SESSION_STORE_KEY, JSON.stringify(trimmed));
  } catch {
  }
}
const POPOVER_WIDTH = 320;
const POPOVER_HEIGHT = 340;
const MODEL_ROW_HEIGHT = 40;
function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.round(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.round(diff / 36e5)}h ago`;
  const days = Math.round(diff / 864e5);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}
function extractSessionTitle(messages) {
  const first = messages.find((m) => m.kind === "text" && m.role === "user");
  if (!first || first.kind !== "text") return "New Conversation";
  return first.content.slice(0, 48) + (first.content.length > 48 ? "…" : "");
}
function renderMarkdown(text) {
  const lines = text.split("\n");
  const result = [];
  let inCode = false;
  let codeLang = "";
  let codeLines = [];
  let key = 0;
  const flushCode = () => {
    if (codeLines.length > 0) {
      result.push(
        /* @__PURE__ */ jsxs(
          "pre",
          {
            className: "my-2 p-2.5 bg-bg0 border border-border rounded-md text-[10.5px] text-t2 font-mono overflow-x-auto max-h-[300px] whitespace-pre scrollbar-thin",
            children: [
              codeLang && /* @__PURE__ */ jsx("div", { className: "text-[9px] text-t5 uppercase tracking-wider mb-1.5 font-sans", children: codeLang }),
              codeLines.join("\n")
            ]
          },
          `code-${key++}`
        )
      );
    }
    codeLines = [];
    codeLang = "";
  };
  const renderInline = (s, k) => {
    const parts = s.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    if (parts.length === 1) return s;
    return /* @__PURE__ */ jsx("span", { children: parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**"))
        return /* @__PURE__ */ jsx("strong", { className: "text-t1 font-semibold", children: p.slice(2, -2) }, i);
      if (p.startsWith("`") && p.endsWith("`"))
        return /* @__PURE__ */ jsx("code", { className: "px-1 py-0.5 bg-bg0 border border-border rounded text-[10.5px] font-mono text-accent", children: p.slice(1, -1) }, i);
      return p;
    }) }, k);
  };
  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (line === "") {
      result.push(/* @__PURE__ */ jsx("div", { className: "h-2" }, `br-${key++}`));
      continue;
    }
    if (line.startsWith("### ")) {
      result.push(/* @__PURE__ */ jsx("p", { className: "text-[12px] font-semibold text-t1 mt-2 mb-0.5", children: line.slice(4) }, key++));
      continue;
    }
    if (line.startsWith("## ")) {
      result.push(/* @__PURE__ */ jsx("p", { className: "text-[12.5px] font-semibold text-t1 mt-2 mb-1", children: line.slice(3) }, key++));
      continue;
    }
    if (/^[-*•] /.test(line)) {
      result.push(
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 leading-relaxed", children: [
          /* @__PURE__ */ jsx("span", { className: "text-t5 shrink-0 mt-0.5", children: "•" }),
          /* @__PURE__ */ jsx("span", { children: renderInline(line.replace(/^[-*•] /, ""), key++) })
        ] }, key++)
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const m = line.match(/^(\d+)\. (.*)/);
      if (m) {
        result.push(
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 leading-relaxed", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-t5 shrink-0 mt-0.5 tabular-nums", children: [
              m[1],
              "."
            ] }),
            /* @__PURE__ */ jsx("span", { children: renderInline(m[2], key++) })
          ] }, key++)
        );
        continue;
      }
    }
    result.push(/* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: renderInline(line, key++) }, key++));
  }
  if (inCode) flushCode();
  return result;
}
function VirtualModelList({
  models,
  selectedId,
  height,
  onSelect,
  formatPrice
}) {
  return /* @__PURE__ */ jsx(
    WarperComponent,
    {
      itemCount: models.length,
      estimateSize: () => MODEL_ROW_HEIGHT,
      overscan: 5,
      height,
      className: "scrollbar-thin",
      children: (index) => {
        const m = models[index];
        if (!m) return null;
        const isSelected = m.id === selectedId;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onSelect(m.id),
            className: cn(
              "w-full flex items-center gap-2 px-2.5 text-left rounded-sm hover:bg-hover transition-colors",
              isSelected && "bg-accent/10"
            ),
            style: { height: MODEL_ROW_HEIGHT, pointerEvents: "auto" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-3.5 shrink-0 flex items-center justify-center", children: isSelected && /* @__PURE__ */ jsx(Check, { size: 11, className: "text-accent" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] text-t2 truncate leading-tight", children: m.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-t5 truncate leading-tight", children: [
                  m.id,
                  " · ",
                  (m.context_length / 1e3).toFixed(0),
                  "k"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-t5 shrink-0 text-right leading-tight", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  formatPrice(m.pricing.prompt),
                  "/M in"
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  formatPrice(m.pricing.completion),
                  "/M out"
                ] })
              ] })
            ]
          }
        );
      }
    }
  );
}
function ModelSelector({
  model,
  apiKey,
  onSelect
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchRef = useRef(null);
  useEffect(() => {
    if (!open || !apiKey) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchOpenRouterModels(apiKey).then((m) => {
      if (!cancelled) {
        setModels(m);
        setLoading(false);
      }
    }).catch((e) => {
      if (!cancelled) {
        setError(e.message || "Failed to load models");
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, apiKey]);
  useEffect(() => {
    if (open) requestAnimationFrame(() => searchRef.current?.focus());
    else setSearch("");
  }, [open]);
  const filtered = useMemo(
    () => search ? models.filter(
      (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase())
    ) : models,
    [models, search]
  );
  const displayName = model.includes("/") ? model.split("/").pop() ?? model : model;
  const formatPrice = (p) => {
    const n = parseFloat(p);
    if (!n || isNaN(n)) return "free";
    const perM = n * 1e6;
    if (perM < 0.01) return "<$0.01";
    if (perM >= 100) return `$${perM.toFixed(0)}`;
    if (perM >= 1) return `$${perM.toFixed(2)}`;
    return `$${perM.toFixed(3)}`;
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 bg-transparent text-[11px] text-t4 outline-none cursor-pointer hover:text-t3 px-1.5 py-1 rounded hover:bg-hover max-w-[160px] transition-colors", children: [
      /* @__PURE__ */ jsx(Sparkles, { size: 10, className: "shrink-0 opacity-70" }),
      /* @__PURE__ */ jsx("span", { className: "truncate", children: displayName || "Select model" }),
      /* @__PURE__ */ jsx(ChevronDown, { size: 9, className: "shrink-0 opacity-60" })
    ] }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        side: "top",
        align: "start",
        className: "overflow-hidden bg-bg1 border-border",
        style: { width: POPOVER_WIDTH, height: POPOVER_HEIGHT },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 px-2.5 py-1.5", children: [
            /* @__PURE__ */ jsx(Search, { size: 12, className: "text-t5 shrink-0" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search models...",
                className: "flex-1 bg-transparent text-[12px] text-t1 placeholder-t5 outline-none min-w-0",
                onKeyDown: (e) => e.stopPropagation()
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-px border-t border-border my-1" }),
          /* @__PURE__ */ jsx("div", { style: { height: POPOVER_HEIGHT - 52 }, children: loading ? /* @__PURE__ */ jsx("div", { className: "p-1.5 space-y-0.5", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-2 py-2 rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-bg3 rounded animate-pulse", style: { width: `${60 + i % 3 * 15}%` } }),
            /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-bg3/60 rounded animate-pulse", style: { width: `${40 + i % 4 * 10}%` } })
          ] }) }, i)) }) : error ? /* @__PURE__ */ jsxs("div", { className: "px-3 py-4 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-red-400", children: error }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setLoading(true);
                  setError("");
                  fetchOpenRouterModels(apiKey).then(setModels).catch((e) => setError(e.message)).finally(() => setLoading(false));
                },
                className: "mt-2 text-[11px] text-accent hover:underline",
                children: "Retry"
              }
            )
          ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "px-3 py-6 text-center text-[11px] text-t5", children: [
            "No models match “",
            search,
            "”"
          ] }) : /* @__PURE__ */ jsx(
            VirtualModelList,
            {
              models: filtered,
              selectedId: model,
              height: POPOVER_HEIGHT - 52,
              onSelect: (id) => {
                onSelect(id);
                setOpen(false);
              },
              formatPrice
            }
          ) })
        ]
      }
    )
  ] });
}
const PERMISSION_MODES = [
  { id: "default", label: "Auto", icon: /* @__PURE__ */ jsx(WandSparkles, { size: 11 }), desc: "AI decides when to act" },
  { id: "plan", label: "Plan", icon: /* @__PURE__ */ jsx(ListTodo, { size: 11 }), desc: "Plan before executing" },
  { id: "auto", label: "Max", icon: /* @__PURE__ */ jsx(Shield, { size: 11 }), desc: "Maximum autonomy" }
];
function ModeSelector({
  mode,
  onSelect
}) {
  const [open, setOpen] = useState(false);
  const current = PERMISSION_MODES.find((m) => m.id === mode) ?? PERMISSION_MODES[0];
  return /* @__PURE__ */ jsxs(DropdownMenu, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 bg-transparent text-[11px] text-t4 outline-none cursor-pointer hover:text-t3 px-1.5 py-1 rounded hover:bg-hover transition-colors", children: [
      current.icon,
      /* @__PURE__ */ jsx("span", { children: current.label }),
      /* @__PURE__ */ jsx(ChevronDown, { size: 9, className: "opacity-60" })
    ] }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { side: "top", align: "start", className: "bg-bg1 border-border p-1", style: { width: 180 }, children: PERMISSION_MODES.map((m) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          onSelect(m.id);
          setOpen(false);
        },
        className: cn(
          "w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-colors",
          m.id === mode ? "bg-accent/10 text-t1" : "hover:bg-hover text-t3"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: cn("shrink-0", m.id === mode ? "text-accent" : "text-t4"), children: m.icon }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11.5px] font-medium", children: m.label }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-t5", children: m.desc })
          ] }),
          m.id === mode && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-accent ml-auto shrink-0" })
        ]
      },
      m.id
    )) })
  ] });
}
const MessageBubble = memo(function MessageBubble2({ message }) {
  if (message.kind === "tool_call") {
    return /* @__PURE__ */ jsx(ToolCallBlock, { message });
  }
  const isUser = message.role === "user";
  return /* @__PURE__ */ jsxs("div", { className: cn("flex gap-2.5 items-start group", isUser && "flex-row-reverse"), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors",
          isUser ? "bg-accent/15 text-accent group-hover:bg-accent/25" : "bg-purple/15 text-purple group-hover:bg-purple/25"
        ),
        children: isUser ? /* @__PURE__ */ jsx(User, { size: 13 }) : /* @__PURE__ */ jsx(Bot, { size: 13 })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: cn("flex-1 min-w-0", isUser && "flex flex-col items-end"), children: [
      isUser ? /* @__PURE__ */ jsx("div", { className: "inline-block max-w-[85%] px-3 py-2 bg-bg2 border border-border rounded-lg text-[12.5px] text-t1 leading-relaxed whitespace-pre-wrap break-words", children: message.content }) : /* @__PURE__ */ jsx("div", { className: "text-[12.5px] text-t2 leading-relaxed break-words", children: renderMarkdown(message.content) }),
      message.timestamp && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-t6 mt-1 opacity-0 group-hover:opacity-100 transition-opacity", children: new Date(message.timestamp).toLocaleTimeString() })
    ] })
  ] });
});
function ToolCallBlock({ message }) {
  const [collapsed, setCollapsed] = useState(message.collapsed ?? true);
  let parsedArgs = "";
  try {
    const obj = JSON.parse(message.args);
    parsedArgs = Object.entries(obj).map(([k, v]) => {
      const valueStr = typeof v === "string" && v.length > 60 ? v.slice(0, 60) + "…" : JSON.stringify(v);
      return `${k}: ${valueStr}`;
    }).join(", ");
  } catch {
    parsedArgs = message.args.slice(0, 80);
  }
  const status = message.status || (message.result ? "success" : "running");
  const statusIcon = status === "success" ? /* @__PURE__ */ jsx(CircleCheck, { size: 12 }) : status === "error" ? /* @__PURE__ */ jsx(CircleX, { size: 12 }) : /* @__PURE__ */ jsx(LoaderCircle, { size: 12, className: "animate-spin" });
  const statusColors = {
    success: "bg-green-500/15 text-green-500 border-green-500/20",
    error: "bg-red-500/15 text-red-500 border-red-500/20",
    running: "bg-warning/15 text-warning border-warning/20"
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 items-start group min-w-0", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors",
          statusColors[status]
        ),
        children: statusIcon
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setCollapsed(!collapsed),
          className: "flex items-center gap-1.5 w-full text-left hover:text-t1 transition-colors min-w-0",
          children: [
            collapsed ? /* @__PURE__ */ jsx(ChevronRight, { size: 10, className: "shrink-0 text-t5" }) : /* @__PURE__ */ jsx(ChevronDown, { size: 10, className: "shrink-0 text-t5" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] font-semibold text-t2 shrink-0", children: message.name }),
            parsedArgs && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-t5 truncate font-mono", children: [
              "(",
              parsedArgs,
              ")"
            ] })
          ]
        }
      ),
      !collapsed && message.result && /* @__PURE__ */ jsx("pre", { className: "mt-2 p-2.5 bg-bg0 border border-border rounded-md text-[10.5px] text-t3 font-mono overflow-x-auto max-h-[200px] whitespace-pre-wrap break-all scrollbar-thin", children: message.result }),
      !collapsed && status === "running" && !message.result && /* @__PURE__ */ jsx("div", { className: "mt-2 p-2 bg-bg0 border border-border rounded-md text-[10.5px] text-t5 italic", children: "Executing…" })
    ] })
  ] });
}
function AttachmentPill({ att, onRemove }) {
  const icon = att.mimeType?.startsWith("image/") ? /* @__PURE__ */ jsx(Image, { size: 11 }) : att.mimeType?.includes("text") || /\.(txt|md|json|js|ts|tsx|jsx|css|html)$/i.test(att.fileName) ? /* @__PURE__ */ jsx(FileText, { size: 11 }) : /* @__PURE__ */ jsx(File, { size: 11 });
  const size = att.fileSize ? att.fileSize < 1024 ? `${att.fileSize}B` : att.fileSize < 1024 * 1024 ? `${(att.fileSize / 1024).toFixed(1)}KB` : `${(att.fileSize / (1024 * 1024)).toFixed(1)}MB` : "";
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-2 py-1 bg-bg2 border border-border rounded-md hover:bg-bg3 transition-colors group text-t4", children: [
    icon,
    /* @__PURE__ */ jsx("span", { className: "text-[11px] text-t2 max-w-[120px] truncate", children: att.fileName }),
    size && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-t5", children: size }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onRemove(att.id),
        className: "text-t5 hover:text-t2 rounded p-0.5 transition-colors",
        "aria-label": `Remove ${att.fileName}`,
        children: /* @__PURE__ */ jsx(X, { size: 10 })
      }
    )
  ] });
}
function TokenIndicator({ percentage, totalTokens, contextWindow = 2e5 }) {
  const fmt = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${n}`;
  const label = totalTokens !== void 0 ? `${fmt(totalTokens)} / ${fmt(contextWindow)}` : `${percentage.toFixed(1)}%`;
  const barColor = percentage < 50 ? "bg-green-500" : percentage < 75 ? "bg-yellow-400" : percentage < 90 ? "bg-orange-400" : "bg-red-500";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-hover transition-colors group cursor-default",
      title: `${percentage.toFixed(1)}% of context used`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-bg3 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("h-full rounded-full transition-all duration-500", barColor),
            style: { width: `${Math.min(100, Math.max(0, percentage))}%` }
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-t5 font-mono group-hover:text-t4 transition-colors whitespace-nowrap", children: label })
      ]
    }
  );
}
function InputToolbar({
  value,
  onChange,
  onSubmit,
  onStop,
  onAttach,
  disabled,
  placeholder,
  isRunning,
  attachments,
  onRemoveAttachment,
  tokenPercentage,
  totalTokens,
  contextWindow,
  model,
  apiKey,
  onModelSelect,
  permissionMode,
  onPermissionModeSelect,
  thinkingOn,
  onThinkingToggle
}) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!disabled && value.trim() && !isRunning) onSubmit();
      }
    },
    [disabled, value, isRunning, onSubmit]
  );
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
      const t = e.target;
      t.style.height = "auto";
      t.style.height = Math.min(t.scrollHeight, 200) + "px";
    },
    [onChange]
  );
  const handlePaste = useCallback(
    (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const f = items[i].getAsFile();
          if (f) files.push(f);
        }
      }
      if (files.length > 0 && onAttach) {
        e.preventDefault();
        const dt = new DataTransfer();
        files.forEach((f) => dt.items.add(f));
        onAttach(dt.files);
      }
    },
    [onAttach]
  );
  const handleFileSelect = useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files.length > 0 && onAttach) onAttach(files);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [onAttach]
  );
  return /* @__PURE__ */ jsxs("div", { className: "border-t border-border shrink-0 bg-bg1 min-w-0", children: [
    attachments && attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-3 pt-2 pb-1 flex flex-wrap gap-1.5", children: attachments.map((att) => /* @__PURE__ */ jsx(AttachmentPill, { att, onRemove: onRemoveAttachment || (() => {
    }) }, att.id)) }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ref: textareaRef,
        value,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onPaste: handlePaste,
        placeholder,
        disabled,
        rows: 3,
        className: "w-full bg-transparent text-[12.5px] text-t1 placeholder-t5 outline-none resize-none min-h-[60px] px-3 pt-2.5 pb-1"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[30px] px-2 gap-1", children: [
      /* @__PURE__ */ jsx(ModeSelector, { mode: permissionMode, onSelect: onPermissionModeSelect }),
      /* @__PURE__ */ jsx("div", { className: "w-px h-3 bg-border mx-0.5" }),
      /* @__PURE__ */ jsx(ModelSelector, { model, apiKey, onSelect: onModelSelect }),
      /* @__PURE__ */ jsx("div", { className: "flex-1" }),
      tokenPercentage !== void 0 && /* @__PURE__ */ jsx(
        TokenIndicator,
        {
          percentage: tokenPercentage,
          totalTokens,
          contextWindow
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onThinkingToggle,
          title: thinkingOn ? "Thinking on" : "Thinking off",
          className: cn(
            "p-1.5 rounded transition-colors",
            thinkingOn ? "text-purple bg-purple/10 hover:bg-purple/20" : "text-t5 hover:text-t3 hover:bg-hover"
          ),
          children: /* @__PURE__ */ jsx(Brain, { size: 13 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => fileInputRef.current?.click(),
          className: "p-1.5 rounded text-t5 hover:text-t3 hover:bg-hover transition-colors",
          title: "Attach files",
          disabled,
          children: /* @__PURE__ */ jsx(Paperclip, { size: 13 })
        }
      ),
      /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", multiple: true, className: "hidden", onChange: handleFileSelect }),
      isRunning ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onStop,
          className: "w-6 h-6 flex items-center justify-center rounded bg-t2/80 text-bg0 hover:bg-t1 transition-colors shrink-0",
          title: "Stop",
          children: /* @__PURE__ */ jsx(Square, { size: 10, fill: "currentColor" })
        }
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onSubmit,
          disabled: disabled || !value.trim(),
          className: cn(
            "w-6 h-6 flex items-center justify-center rounded transition-colors shrink-0",
            value.trim() && !disabled ? "bg-t2/80 text-bg0 hover:bg-t1" : "bg-t2/20 text-t5 cursor-not-allowed"
          ),
          title: "Send (Enter)",
          children: /* @__PURE__ */ jsx(Send, { size: 11 })
        }
      )
    ] })
  ] });
}
function SessionsPage({
  sessions,
  onOpen,
  onNew,
  onBack,
  onDelete
}) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    if (showSearch) {
      requestAnimationFrame(() => searchRef.current?.focus());
    } else {
      setSearch("");
    }
  }, [showSearch]);
  const filtered = useMemo(
    () => search ? sessions.filter(
      (s) => s.title.toLowerCase().includes(search.toLowerCase())
    ) : sessions,
    [sessions, search]
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full w-full min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[36px] px-2 border-b border-border shrink-0 gap-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onBack,
          className: "p-1.5 rounded text-t5 hover:text-t3 hover:bg-hover transition-colors",
          title: "Back to chat",
          children: /* @__PURE__ */ jsx(ArrowLeft, { size: 13 })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-[11.5px] font-semibold text-t2 flex-1", children: "History" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowSearch((v) => !v),
          className: cn(
            "p-1.5 rounded transition-colors",
            showSearch ? "text-accent bg-accent/10" : "text-t5 hover:text-t3 hover:bg-hover"
          ),
          title: "Search",
          children: /* @__PURE__ */ jsx(Search, { size: 12 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onNew,
          className: "p-1.5 rounded text-t5 hover:text-t3 hover:bg-hover transition-colors",
          title: "New conversation",
          children: /* @__PURE__ */ jsx(Plus, { size: 12 })
        }
      )
    ] }),
    showSearch && /* @__PURE__ */ jsx("div", { className: "px-3 py-1.5 border-b border-border shrink-0 bg-bg0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-bg2 border border-border rounded px-2 py-1", children: [
      /* @__PURE__ */ jsx(Search, { size: 11, className: "text-t5 shrink-0" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: searchRef,
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search conversations…",
          className: "flex-1 bg-transparent text-[12px] text-t1 placeholder-t5 outline-none",
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              setShowSearch(false);
            }
          }
        }
      ),
      search && /* @__PURE__ */ jsx("button", { onClick: () => setSearch(""), className: "text-t5 hover:text-t3", children: /* @__PURE__ */ jsx(X, { size: 11 }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1 min-h-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center opacity-50 gap-3 py-8", children: [
      /* @__PURE__ */ jsx(MessageSquare, { size: 36, className: "text-t5" }),
      /* @__PURE__ */ jsx("p", { className: "text-[12px] text-t4", children: search ? "No conversations match your search" : "No conversation history yet" }),
      !search && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onNew,
          className: "px-3 py-1.5 bg-accent/15 text-accent hover:bg-accent/25 rounded text-[11.5px] transition-colors",
          children: "Start a conversation"
        }
      )
    ] }) : filtered.map((s) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => onOpen(s.id),
        className: "group flex items-start gap-2 px-2.5 py-2 rounded-md hover:bg-hover cursor-pointer border border-transparent hover:border-border transition-all",
        children: [
          /* @__PURE__ */ jsx(MessageSquare, { size: 13, className: "text-t5 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[12px] text-t2 truncate font-medium", children: s.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsx(Clock, { size: 10, className: "text-t6" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-t5", children: formatRelativeTime(s.lastModified) }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-t6", children: [
                s.messages.filter((m) => m.kind === "text").length,
                " msgs"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onDelete(s.id);
              },
              className: "opacity-0 group-hover:opacity-100 p-0.5 text-t5 hover:text-red-400 rounded transition-all shrink-0",
              title: "Delete",
              children: /* @__PURE__ */ jsx(X, { size: 11 })
            }
          )
        ]
      },
      s.id
    )) })
  ] });
}
function AiWordmark() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-purple/30 to-accent/30 flex items-center justify-center border border-purple/20", children: /* @__PURE__ */ jsx(Bot, { size: 28, className: "text-purple" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center border-2 border-bg0", children: /* @__PURE__ */ jsx(Sparkles, { size: 8, className: "text-bg0" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-t2", children: "weditor AI" }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-t5 mt-0.5", children: "Powered by OpenRouter" })
    ] })
  ] });
}
function StreamingMessage({ content }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 bg-purple/15 text-purple", children: /* @__PURE__ */ jsx(Bot, { size: 13 }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 text-[12.5px] text-t2 leading-relaxed break-words", children: [
      renderMarkdown(content),
      /* @__PURE__ */ jsx("span", { className: "inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-pulse" })
    ] })
  ] });
}
function AIPanel() {
  const [page, setPage] = useState("chat");
  const [messages, setMessages] = useState(_persistedMessages);
  const [chatHistory, setChatHistory] = useState(_persistedChatHistory);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [errorReport, setErrorReport] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [tokenUsage, setTokenUsage] = useState({ used: 0, total: 2e5 });
  const [showConfig, setShowConfig] = useState(
    !useSettingsStore.getState().settings.openrouter_api_key
  );
  const [permissionMode, setPermissionMode] = useState("default");
  const [thinkingOn, setThinkingOn] = useState(true);
  const [sessions, setSessions] = useState(() => {
    _persistedSessions = loadSessions();
    return _persistedSessions;
  });
  const apiKey = useSettingsStore((s) => s.settings.openrouter_api_key);
  const model = useSettingsStore((s) => s.settings.openrouter_model);
  const setSetting = useSettingsStore((s) => s.set);
  const nodepod = useNodepodStore((s) => s.instance);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    _persistedMessages = messages;
  }, [messages]);
  useEffect(() => {
    _persistedChatHistory = chatHistory;
  }, [chatHistory]);
  const scrollTimerRef = useRef(null);
  useEffect(() => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (streamingContent) {
      scrollTimerRef.current = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 80);
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [messages, streamingContent]);
  useEffect(() => {
    if (apiKey) setShowConfig(false);
    else setShowConfig(true);
  }, [apiKey]);
  const saveCurrentSession = useCallback((msgs, hist) => {
    if (msgs.length === 0) return;
    const title = extractSessionTitle(msgs);
    const existing = _persistedSessions.find(
      (s) => s.messages[0]?.kind === "text" && s.messages[0].role === "user" && msgs[0]?.kind === "text" && msgs[0].role === "user" && s.messages[0].content === msgs[0].content
    );
    if (existing) {
      existing.messages = msgs;
      existing.chatHistory = hist;
      existing.lastModified = Date.now();
      existing.title = title;
      const updated = [existing, ..._persistedSessions.filter((s) => s.id !== existing.id)];
      _persistedSessions = updated;
    } else {
      const newSession = {
        id: Math.random().toString(36).slice(2),
        title,
        messages: msgs,
        chatHistory: hist,
        lastModified: Date.now()
      };
      _persistedSessions = [newSession, ..._persistedSessions];
    }
    saveSessions(_persistedSessions);
    setSessions([..._persistedSessions]);
  }, []);
  const handleSend = useCallback(async () => {
    if (!input.trim() || isRunning) return;
    if (!apiKey) {
      setShowConfig(true);
      return;
    }
    const userMessage = input.trim();
    setInput("");
    setIsRunning(true);
    setStreamingContent("");
    const newUIMessages = [
      ...messages,
      { kind: "text", role: "user", content: userMessage, timestamp: Date.now() }
    ];
    setMessages(newUIMessages);
    const newHistory = [...chatHistory, { role: "user", content: userMessage }];
    setChatHistory(newHistory);
    const toolExecutor = nodepod ? createNodepodToolExecutor(nodepod, {
      onReportError: (data) => new Promise((resolve) => {
        setErrorReport({ data, resolve });
      })
    }) : async () => "Error: Nodepod not available";
    _abortController = new AbortController();
    let currentContent = "";
    const uiUpdates = [...newUIMessages];
    try {
      const finalHistory = await runAgentTurn(
        apiKey,
        model,
        newHistory,
        toolExecutor,
        {
          onToken: (token) => {
            currentContent += token;
            setStreamingContent(currentContent);
          },
          onToolCall: (call) => {
            if (currentContent) {
              uiUpdates.push({ kind: "text", role: "assistant", content: currentContent, timestamp: Date.now() });
              currentContent = "";
              setStreamingContent("");
            }
            let argsStr = call.function.arguments;
            try {
              argsStr = JSON.stringify(JSON.parse(call.function.arguments), null, 2);
            } catch {
            }
            uiUpdates.push({
              kind: "tool_call",
              callId: call.id,
              name: call.function.name,
              args: argsStr,
              status: "running",
              timestamp: Date.now()
            });
            setMessages([...uiUpdates]);
          },
          onToolResult: (callId, _name, result) => {
            const idx = uiUpdates.findIndex((m) => m.kind === "tool_call" && m.callId === callId);
            if (idx >= 0) {
              uiUpdates[idx].result = result;
              uiUpdates[idx].status = "success";
              setMessages([...uiUpdates]);
            }
          },
          onComplete: (assistantMsg) => {
            if (assistantMsg.content && !assistantMsg.tool_calls?.length) {
              uiUpdates.push({ kind: "text", role: "assistant", content: assistantMsg.content, timestamp: Date.now() });
              currentContent = "";
              setStreamingContent("");
              setMessages([...uiUpdates]);
            }
          },
          onError: (error) => {
            uiUpdates.push({ kind: "text", role: "assistant", content: `Error: ${error}`, timestamp: Date.now() });
            setMessages([...uiUpdates]);
          }
        },
        _abortController.signal
      );
      setChatHistory(finalHistory);
      if (currentContent) {
        uiUpdates.push({ kind: "text", role: "assistant", content: currentContent, timestamp: Date.now() });
        setStreamingContent("");
        setMessages([...uiUpdates]);
      }
      saveCurrentSession(uiUpdates, finalHistory);
    } catch (e) {
      const errMsg = e instanceof Error && e.name === "AbortError" ? "(Cancelled)" : `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      uiUpdates.push({ kind: "text", role: "assistant", content: errMsg, timestamp: Date.now() });
      setMessages([...uiUpdates]);
      setStreamingContent("");
    } finally {
      setIsRunning(false);
      _abortController = null;
      setErrorReport(null);
    }
  }, [input, isRunning, apiKey, model, nodepod, messages, chatHistory, saveCurrentSession]);
  const handleStop = () => {
    if (_abortController) _abortController.abort();
  };
  const handleClear = () => {
    if (messages.length > 0) saveCurrentSession(messages, chatHistory);
    setMessages([]);
    setChatHistory([]);
    setStreamingContent("");
    setAttachments([]);
    _persistedMessages = [];
    _persistedChatHistory = [];
  };
  const handleAttach = useCallback((files) => {
    const newAtts = Array.from(files).map((f) => ({
      id: Math.random().toString(36).slice(2, 11),
      fileName: f.name,
      fileSize: f.size,
      mimeType: f.type
    }));
    setAttachments((prev) => [...prev, ...newAtts]);
  }, []);
  const handleRemoveAttachment = useCallback((id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);
  const tokenPercentage = useMemo(() => tokenUsage.used / tokenUsage.total * 100, [tokenUsage]);
  const handleOpenSession = useCallback((id) => {
    if (messages.length > 0) saveCurrentSession(messages, chatHistory);
    const s = _persistedSessions.find((x) => x.id === id);
    if (!s) return;
    setMessages(s.messages);
    setChatHistory(s.chatHistory);
    _persistedMessages = s.messages;
    _persistedChatHistory = s.chatHistory;
    setPage("chat");
  }, [messages, chatHistory, saveCurrentSession]);
  const handleDeleteSession = useCallback((id) => {
    _persistedSessions = _persistedSessions.filter((s) => s.id !== id);
    saveSessions(_persistedSessions);
    setSessions([..._persistedSessions]);
  }, []);
  const handleNewSession = useCallback(() => {
    if (messages.length > 0) saveCurrentSession(messages, chatHistory);
    handleClear();
    setPage("chat");
  }, [messages, chatHistory, saveCurrentSession]);
  if (page === "sessions") {
    return /* @__PURE__ */ jsx(
      SessionsPage,
      {
        sessions,
        onOpen: handleOpenSession,
        onNew: handleNewSession,
        onBack: () => setPage("chat"),
        onDelete: handleDeleteSession
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full w-full min-w-0 overflow-hidden bg-bg0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[36px] px-2 border-b border-border shrink-0 gap-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setPage("sessions"),
          className: "p-1.5 rounded text-t5 hover:text-t3 hover:bg-hover transition-colors",
          title: "View history",
          children: /* @__PURE__ */ jsx(MessageSquare, { size: 13 })
        }
      ),
      /* @__PURE__ */ jsx(Bot, { size: 13, className: "text-purple mx-0.5 shrink-0" }),
      /* @__PURE__ */ jsx("span", { className: "text-[11.5px] font-semibold text-t2 flex-1 truncate", children: messages.length > 0 ? extractSessionTitle(messages) : "AI Assistant" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowConfig(!showConfig),
          className: cn(
            "p-1.5 rounded transition-colors",
            showConfig ? "text-accent bg-accent/10" : "text-t5 hover:text-t3 hover:bg-hover"
          ),
          title: "API Key",
          children: /* @__PURE__ */ jsx(KeyRound, { size: 12 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleClear,
          className: "p-1.5 rounded text-t5 hover:text-t3 hover:bg-hover transition-colors",
          title: "New thread",
          children: /* @__PURE__ */ jsx(Plus, { size: 12 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin p-3 space-y-4 min-h-0", children: [
      messages.length === 0 && !streamingContent && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center opacity-70 gap-6", children: [
        /* @__PURE__ */ jsx(AiWordmark, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[12.5px] text-t3", children: "Start a conversation" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-t5", children: "Ask questions, write code, or get help with tasks" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2 max-w-[260px]", children: [
          "Explain this code",
          "Write a function",
          "Debug my error",
          "Suggest improvements"
        ].map((prompt) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setInput(prompt),
            className: "px-2.5 py-1 text-[11px] text-t4 bg-bg2 border border-border rounded-full hover:bg-bg3 hover:text-t3 transition-colors",
            children: prompt
          },
          prompt
        )) })
      ] }),
      messages.map((msg, i) => /* @__PURE__ */ jsx(MessageBubble, { message: msg }, i)),
      streamingContent && /* @__PURE__ */ jsx(StreamingMessage, { content: streamingContent }),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsx(
      InputToolbar,
      {
        value: input,
        onChange: setInput,
        onSubmit: handleSend,
        onStop: handleStop,
        onAttach: handleAttach,
        disabled: !apiKey,
        placeholder: apiKey ? "Message AI… (@ files, / commands)" : "Set your API key first…",
        isRunning,
        attachments,
        onRemoveAttachment: handleRemoveAttachment,
        tokenPercentage,
        totalTokens: tokenUsage.used,
        contextWindow: tokenUsage.total,
        model,
        apiKey,
        onModelSelect: (id) => setSetting("openrouter_model", id),
        permissionMode,
        onPermissionModeSelect: setPermissionMode,
        thinkingOn,
        onThinkingToggle: () => setThinkingOn((v) => !v)
      }
    ),
    showConfig && /* @__PURE__ */ jsxs("div", { className: "px-3 py-2.5 border-t border-border bg-bg0 shrink-0 min-w-0", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-[10px] text-t4 uppercase tracking-wider font-semibold mb-1.5", children: "OpenRouter API Key" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          value: apiKey,
          onChange: (e) => setSetting("openrouter_api_key", e.target.value),
          placeholder: "sk-or-...",
          className: "w-full bg-bg3 border border-border rounded px-2.5 py-1.5 text-[12px] text-t1 placeholder-t5 outline-none focus:border-focus font-mono"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-t5 mt-1.5", children: [
        "Get your key at",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://openrouter.ai",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-accent hover:underline",
            children: "openrouter.ai"
          }
        )
      ] })
    ] }),
    errorReport && /* @__PURE__ */ jsx(
      ErrorReportModal,
      {
        data: errorReport.data,
        onConfirm: () => {
          errorReport.resolve(true);
          setErrorReport(null);
        },
        onDismiss: () => {
          errorReport.resolve(false);
          setErrorReport(null);
        }
      }
    )
  ] });
}
function ExtensionsPanel() {
  const extensions = useExtensionStore((s) => s.extensions);
  const enabledExtensions = useExtensionStore((s) => s.enabledExtensions);
  const toggleExtension = useExtensionStore((s) => s.toggleExtension);
  const refreshExtensions = useExtensionStore((s) => s.refreshExtensions);
  const nodepod = useNodepodStore((s) => s.instance);
  const [loading, setLoading] = useState(false);
  const [installUrl, setInstallUrl] = useState("");
  const [error, setError] = useState(null);
  const handleToggle = async (extensionId) => {
    try {
      await toggleExtension(extensionId);
      refreshExtensions();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };
  const handleInstallFromUrl = async () => {
    if (!installUrl.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { manifest, module } = await loadExtensionFromUrl(installUrl);
      await extensionHost.loadExtension(manifest, module, installUrl);
      refreshExtensions();
      setInstallUrl("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      if (nodepod) {
        const { autoLoadExtensions: autoLoadExtensions2 } = await Promise.resolve().then(() => extensionLoader);
        await autoLoadExtensions2(nodepod);
        refreshExtensions();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col bg-bg2 text-t3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Package, { size: 16, className: "text-t4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Extensions" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleRefresh,
          disabled: loading,
          className: "p-1 hover:bg-hover rounded text-t4 hover:text-t3",
          title: "Refresh extensions",
          children: /* @__PURE__ */ jsx(RefreshCw, { size: 14, className: loading ? "animate-spin" : "" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Extension URL or path...",
          value: installUrl,
          onChange: (e) => setInstallUrl(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleInstallFromUrl(),
          className: "flex-1 px-2 py-1 text-sm bg-bg3 border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent",
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleInstallFromUrl,
          disabled: loading || !installUrl.trim(),
          className: "px-3 py-1 text-sm bg-accent text-white rounded hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsx(Download, { size: 14 }),
            "Install"
          ]
        }
      )
    ] }) }),
    error && /* @__PURE__ */ jsx("div", { className: "mx-4 mt-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: error }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: extensions.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-t4 text-sm", children: [
      /* @__PURE__ */ jsx(Package, { size: 32, className: "mb-2 opacity-50" }),
      /* @__PURE__ */ jsx("p", { children: "No extensions installed" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", children: "Install extensions from URL or place them in" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-t5 font-mono", children: "/project/.weditor/extensions/" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "py-2", children: extensions.map((ext) => {
      const isEnabled = enabledExtensions.includes(ext.id);
      const isActive = ext.active;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "px-4 py-3 hover:bg-hover border-b border-border/50",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", children: ext.manifest.name }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-t5", children: [
                    "v",
                    ext.manifest.version
                  ] }),
                  isActive && /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded", children: "Active" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-t4 mt-1 truncate", children: ext.manifest.description || "No description" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-t5 mt-1 font-mono truncate", children: ext.id })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleToggle(ext.id),
                  disabled: loading,
                  className: `
                        flex items-center gap-1.5 px-2.5 py-1 text-xs rounded
                        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                        ${isEnabled ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-bg3 text-t4 hover:bg-hover"}
                      `,
                  children: isEnabled ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Check, { size: 12 }),
                    "Enabled"
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(X, { size: 12 }),
                    "Disabled"
                  ] })
                }
              )
            ] }),
            ext.manifest.authors && ext.manifest.authors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-t5", children: [
              "by ",
              ext.manifest.authors.join(", ")
            ] }),
            ext.manifest.commands && Object.keys(ext.manifest.commands).length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-t5 mb-1", children: "Commands:" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: Object.entries(ext.manifest.commands).map(([id, cmd]) => /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono text-t4 pl-2", children: [
                "• ",
                cmd.label,
                cmd.keybinding && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-t5", children: [
                  "(",
                  cmd.keybinding,
                  ")"
                ] })
              ] }, id)) })
            ] })
          ]
        },
        ext.id
      );
    }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-t border-border text-xs text-t5", children: [
      extensions.length,
      " extension",
      extensions.length !== 1 ? "s" : "",
      " installed •",
      " ",
      enabledExtensions.length,
      " enabled"
    ] })
  ] });
}
async function fetchZedMarketplaceExtensions() {
  return [];
}
function searchExtensions(exts, query) {
  return exts;
}
function filterExtensionsByCategory(exts, category) {
  return exts;
}
async function getExtensionDetails(id) {
  return null;
}
function isExtensionCompatible(ext) {
  return true;
}
async function resolveExtensionManifest(ext) {
  return null;
}
function MarketplacePanel() {
  const [extensions, setExtensions] = useState([]);
  const [filteredExtensions, setFilteredExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [installing, setInstalling] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const installedExtensions = useExtensionStore((s) => s.extensions);
  const refreshExtensions = useExtensionStore((s) => s.refreshExtensions);
  useEffect(() => {
    loadMarketplace();
  }, []);
  useEffect(() => {
    let result = extensions;
    result = filterExtensionsByCategory(result);
    if (searchQuery.trim()) {
      result = searchExtensions(result);
    }
    setFilteredExtensions(result);
  }, [extensions, searchQuery, category]);
  const loadMarketplace = async () => {
    setLoading(true);
    setError(null);
    try {
      const exts = await fetchZedMarketplaceExtensions();
      setExtensions(exts);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };
  const handleInstall = async (ext) => {
    setInstalling(ext.id);
    setError(null);
    try {
      const compat = isExtensionCompatible(ext);
      if (!compat.compatible) {
        setError(`Cannot install: ${compat.reason}`);
        setInstalling(null);
        return;
      }
      const resolved = await resolveExtensionManifest(ext.id);
      let manifestText;
      let baseUrl;
      for (const manifestUrl of resolved.manifestUrls) {
        try {
          const response = await fetch(manifestUrl);
          if (response.ok) {
            manifestText = await response.text();
            baseUrl = manifestUrl.replace(/\/extension\.toml$/, "/");
            break;
          }
        } catch (e) {
          continue;
        }
      }
      if (!manifestText || !baseUrl) {
        throw new Error(`Could not fetch extension.toml from any candidate URL`);
      }
      const manifest = parseExtensionToml(manifestText);
      const { module } = await loadExtensionFromUrl(baseUrl);
      await extensionHost.loadExtension(manifest, module, baseUrl);
      refreshExtensions();
      alert(`Successfully installed ${ext.name}!`);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Failed to install ${ext.name}: ${message}`);
    } finally {
      setInstalling(null);
    }
  };
  const handleViewDetails = async (ext) => {
    try {
      const details = await getExtensionDetails(ext);
      setSelectedExtension(details);
    } catch (e) {
      console.error("Failed to load extension details:", e);
    }
  };
  const isInstalled = (extId) => {
    return installedExtensions.some((e) => e.id === extId || e.id.includes(extId));
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col bg-bg2 text-t3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Package, { size: 16, className: "text-t4" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Zed Marketplace" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-t5", children: [
          "(",
          filteredExtensions.length,
          " ",
          category !== "all" && category,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: loadMarketplace,
          disabled: loading,
          className: "p-1 hover:bg-hover rounded text-t4 hover:text-t3",
          title: "Refresh marketplace",
          children: /* @__PURE__ */ jsx(RefreshCw, { size: 14, className: loading ? "animate-spin" : "" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-border space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { size: 14, className: "absolute left-2 top-1/2 -translate-y-1/2 text-t5" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search extensions...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-8 pr-3 py-1.5 text-sm bg-bg3 border border-border rounded focus:outline-none focus:ring-1 focus:ring-accent"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 text-xs", children: ["all", "language", "theme", "tool"].map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCategory(cat),
          className: `px-2 py-1 rounded transition-colors ${category === cat ? "bg-accent text-white" : "bg-bg3 text-t4 hover:bg-hover hover:text-t3"}`,
          children: cat.charAt(0).toUpperCase() + cat.slice(1)
        },
        cat
      )) })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mx-4 mt-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: error }),
    loading && !extensions.length && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-t4 text-sm", children: [
      /* @__PURE__ */ jsx(RefreshCw, { size: 32, className: "mb-2 animate-spin" }),
      /* @__PURE__ */ jsx("p", { children: "Loading marketplace..." })
    ] }),
    !loading && filteredExtensions.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-t4 text-sm", children: [
      /* @__PURE__ */ jsx(Search, { size: 32, className: "mb-2 opacity-50" }),
      /* @__PURE__ */ jsx("p", { children: "No extensions found" }),
      searchQuery && /* @__PURE__ */ jsx("p", { className: "text-xs text-t5 mt-1", children: "Try a different search term" })
    ] }),
    !loading && filteredExtensions.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
      filteredExtensions.slice(0, 100).map((ext) => {
        const installed = isInstalled(ext.id);
        const compat = isExtensionCompatible();
        const isInstalling = installing === ext.id;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "px-4 py-3 hover:bg-hover border-b border-border/50 cursor-pointer",
            onClick: () => handleViewDetails(ext),
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", children: ext.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-t5", children: ext.version }),
                  installed && /* @__PURE__ */ jsxs("span", { className: "text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(CircleCheckBig, { size: 10 }),
                    "Installed"
                  ] }),
                  !compat.compatible && /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded flex items-center gap-1",
                      title: compat.reason,
                      children: [
                        /* @__PURE__ */ jsx(TriangleAlert, { size: 10 }),
                        "Limited"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-t4 mt-1 line-clamp-2", children: ext.description || "No description available" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-t5", children: [
                  ext.authors && ext.authors.length > 0 && /* @__PURE__ */ jsxs("span", { children: [
                    "by ",
                    ext.authors.slice(0, 2).join(", ")
                  ] }),
                  ext.download_count && /* @__PURE__ */ jsxs("span", { children: [
                    ext.download_count.toLocaleString(),
                    " downloads"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                ext.repository && /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: ext.repository,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e) => e.stopPropagation(),
                    className: "p-1.5 hover:bg-bg3 rounded text-t4 hover:text-t3",
                    title: "View repository",
                    children: /* @__PURE__ */ jsx(ExternalLink, { size: 14 })
                  }
                ),
                !installed && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      handleInstall(ext);
                    },
                    disabled: isInstalling || !compat.compatible,
                    className: `
                            flex items-center gap-1.5 px-2.5 py-1 text-xs rounded
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                            ${compat.compatible ? "bg-accent text-white hover:bg-accent/90" : "bg-bg3 text-t5"}
                          `,
                    title: !compat.compatible ? compat.reason : "Install extension",
                    children: [
                      isInstalling ? /* @__PURE__ */ jsx(RefreshCw, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ jsx(Download, { size: 12 }),
                      isInstalling ? "Installing..." : "Install"
                    ]
                  }
                )
              ] })
            ] })
          },
          ext.id
        );
      }),
      filteredExtensions.length > 100 && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 text-center text-xs text-t5", children: "Showing first 100 results. Refine your search to see more." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-t border-border text-xs text-t5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        extensions.length,
        " extension",
        extensions.length !== 1 ? "s" : "",
        " available"
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://zed.dev/extensions",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-t3 hover:underline flex items-center gap-1",
          children: [
            "Browse on zed.dev",
            /* @__PURE__ */ jsx(ExternalLink, { size: 10 })
          ]
        }
      )
    ] }) })
  ] });
}
class ErrorBoundary2 extends Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full p-4 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-deleted font-medium mb-1", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-t4 max-w-[300px] break-words", children: this.state.error?.message || "An unexpected error occurred." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => this.setState({ hasError: false, error: null }),
            className: "mt-3 px-3 py-1 rounded text-[11px] text-t2 bg-bg3 border border-border hover:bg-hover",
            children: "Try again"
          }
        )
      ] });
    }
    return this.props.children;
  }
}
function PanelContent({ panel }) {
  let content;
  switch (panel) {
    case "project":
      content = /* @__PURE__ */ jsx(ProjectPanel, {});
      break;
    case "git":
      content = /* @__PURE__ */ jsx(GitPanel, {});
      break;
    case "search":
      content = /* @__PURE__ */ jsx(SearchPanel, {});
      break;
    case "terminal":
      content = /* @__PURE__ */ jsx(TerminalPanel, {});
      break;
    case "browser":
      content = /* @__PURE__ */ jsx(BrowserPanel, {});
      break;
    case "ai":
      content = /* @__PURE__ */ jsx(AIPanel, {});
      break;
    case "extensions":
      content = /* @__PURE__ */ jsx(ExtensionsPanel, {});
      break;
    case "marketplace":
      content = /* @__PURE__ */ jsx(MarketplacePanel, {});
      break;
    default:
      return null;
  }
  return /* @__PURE__ */ jsx(ErrorBoundary2, { children: content });
}
function DockPanel({ position, panels }) {
  const dock = useWorkspaceStore(
    (s) => position === "left" ? s.leftDock : position === "right" ? s.rightDock : s.bottomDock
  );
  const hasBrowser = panels.includes("browser");
  return /* @__PURE__ */ jsx("div", { className: "flex h-full bg-bg0", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 min-h-0 overflow-hidden relative", children: [
    hasBrowser && /* @__PURE__ */ jsx("div", { className: cn("w-full h-full", dock.activePanel !== "browser" && "hidden"), children: /* @__PURE__ */ jsx(BrowserPanel, {}) }),
    dock.activePanel !== "browser" && /* @__PURE__ */ jsx(PanelContent, { panel: dock.activePanel })
  ] }) });
}
const isIterable = (obj) => Symbol.iterator in obj;
const hasIterableEntries = (value) => (
  // HACK: avoid checking entries type
  "entries" in value
);
const compareEntries = (valueA, valueB) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!mapB.has(key) || !Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};
const compareIterables = (valueA, valueB) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};
function shallow(valueA, valueB) {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (isIterable(valueA) && isIterable(valueB)) {
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }
    return compareIterables(valueA, valueB);
  }
  return compareEntries(
    { entries: () => Object.entries(valueA) },
    { entries: () => Object.entries(valueB) }
  );
}
function useShallow(selector) {
  const prev = React__default.useRef(void 0);
  return (state) => {
    const next = selector(state);
    return shallow(prev.current, next) ? prev.current : prev.current = next;
  };
}
function SpecialTabIcon({ type, size = 13 }) {
  switch (type) {
    case "keymap":
      return /* @__PURE__ */ jsx(Keyboard, { size, className: "text-accent shrink-0" });
    case "browser":
      return /* @__PURE__ */ jsx(Globe, { size, className: "text-accent shrink-0" });
    case "ai":
      return /* @__PURE__ */ jsx(Sparkles, { size, className: "text-purple shrink-0" });
    default:
      return null;
  }
}
const Tab = memo(function Tab2({ fileName, paneId, active, modified, index, onContextMenu }) {
  const tabRef = useRef(null);
  const [dropSide, setDropSide] = useState(null);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/weditor-tab", JSON.stringify({ paneId, fileName, index }));
    e.dataTransfer.effectAllowed = "move";
    useWorkspaceStore.getState().startTabDrag(fileName, paneId);
  };
  const handleDragEnd = () => {
    useWorkspaceStore.getState().endTabDrag();
  };
  const handleDragOver = (e) => {
    const types = e.dataTransfer.types;
    if (!types.includes("application/weditor-tab") && !types.includes("application/weditor-file")) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    const el = tabRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    setDropSide(e.clientX < midX ? "left" : "right");
  };
  const handleDragLeave = (e) => {
    if (tabRef.current && !tabRef.current.contains(e.relatedTarget)) {
      setDropSide(null);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const side = dropSide;
    setDropSide(null);
    const tabData = e.dataTransfer.getData("application/weditor-tab");
    if (tabData) {
      const data = JSON.parse(tabData);
      if (data.paneId === paneId) {
        const targetIdx = side === "left" ? index : index + 1;
        const adjustedTarget = data.index < targetIdx ? targetIdx - 1 : targetIdx;
        if (data.index !== adjustedTarget) {
          useWorkspaceStore.getState().reorderTab(paneId, data.index, adjustedTarget);
        }
      } else {
        const moveTabToPane = useWorkspaceStore.getState().moveTabToPane;
        moveTabToPane(data.fileName, data.paneId, paneId);
        const state = useWorkspaceStore.getState();
        const pane = state.panes[paneId];
        if (pane) {
          const movedIdx = pane.tabs.indexOf(data.fileName);
          const targetIdx = side === "left" ? index : index + 1;
          if (movedIdx >= 0 && movedIdx !== targetIdx) {
            const adjusted = movedIdx < targetIdx ? targetIdx - 1 : targetIdx;
            useWorkspaceStore.getState().reorderTab(paneId, movedIdx, adjusted);
          }
        }
      }
    }
    const fileData = e.dataTransfer.getData("application/weditor-file");
    if (fileData) {
      const openTab = useWorkspaceStore.getState().openTab;
      openTab(fileData, paneId);
      const state = useWorkspaceStore.getState();
      const pane = state.panes[paneId];
      if (pane) {
        const movedIdx = pane.tabs.indexOf(fileData);
        const targetIdx = side === "left" ? index : index + 1;
        if (movedIdx >= 0 && movedIdx !== targetIdx) {
          const adjusted = movedIdx < targetIdx ? targetIdx - 1 : targetIdx;
          state.reorderTab(paneId, movedIdx, adjusted);
        }
      }
    }
    useWorkspaceStore.getState().endTabDrag();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: tabRef,
      draggable: true,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onContextMenu: (e) => onContextMenu(e, fileName),
      onMouseDown: (e) => {
        if (e.button === 1) {
          e.preventDefault();
          useWorkspaceStore.getState().closeTab(paneId, fileName);
        }
      },
      onClick: () => useWorkspaceStore.getState().setActiveTab(paneId, fileName),
      className: cn(
        "flex items-center gap-1.5 px-3 min-w-[100px] max-w-[180px] cursor-pointer select-none group relative",
        "border-r border-border transition-colors",
        active ? "bg-bg2 text-t1 h-[calc(100%+1px)]" : "bg-bg0 text-t4 hover:text-t3 hover:bg-bg1 h-full"
      ),
      children: [
        dropSide === "left" && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-[4px] bottom-[4px] w-[2px] bg-accent rounded-full z-10" }),
        dropSide === "right" && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-[4px] bottom-[4px] w-[2px] bg-accent rounded-full z-10" }),
        getTabType(fileName) === "file" ? /* @__PURE__ */ jsx(FileIcon, { name: fileName.split("/").pop() || fileName, size: 13 }) : /* @__PURE__ */ jsx(SpecialTabIcon, { type: getTabType(fileName), size: 13 }),
        /* @__PURE__ */ jsx("span", { className: "truncate flex-1 text-[12px]", children: getTabLabel(fileName) }),
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 flex items-center justify-center flex-shrink-0", children: modified && !active ? /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-warning" }) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              useWorkspaceStore.getState().closeTab(paneId, fileName);
            },
            className: cn(
              "rounded hover:bg-hover p-0.5",
              active ? "opacity-60 hover:opacity-100" : "opacity-0 group-hover:opacity-60 hover:!opacity-100"
            ),
            children: /* @__PURE__ */ jsx(X, { size: 11 })
          }
        ) })
      ]
    }
  );
});
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
  });
}
const TabBar = memo(function TabBar2({ paneId }) {
  const pane = useWorkspaceStore((s) => s.panes[paneId]);
  const tabModifiedMap = useWorkspaceStore(useShallow((s) => {
    const p = s.panes[paneId];
    if (!p) return null;
    const map = {};
    for (const tab of p.tabs) {
      map[tab] = s.openFiles[tab]?.modified ?? false;
    }
    return map;
  }));
  const maximizedPaneId = useWorkspaceStore((s) => s.maximizedPaneId);
  const historyIndex = useWorkspaceStore((s) => s.panes[paneId]?.historyIndex ?? 0);
  const historyLength = useWorkspaceStore((s) => s.panes[paneId]?.tabHistory.length ?? 0);
  const isMaximized = maximizedPaneId === paneId;
  const [tabContextMenu, setTabContextMenu] = useState(null);
  const [emptyDragOver, setEmptyDragOver] = useState(false);
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < historyLength - 1;
  const tabsRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const checkOverflow = useCallback(() => {
    const el = tabsRef.current;
    if (el) setIsOverflowing(el.scrollWidth > el.clientWidth);
  }, []);
  useEffect(() => {
    checkOverflow();
    const el = tabsRef.current;
    if (!el) return;
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [checkOverflow, pane?.tabs.length]);
  const handleWheel = useCallback((e) => {
    const el = tabsRef.current;
    if (!el || !isOverflowing) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY || e.deltaX;
  }, [isOverflowing]);
  const handleTabContextMenu = useCallback((e, fileName) => {
    e.preventDefault();
    e.stopPropagation();
    const tabs = pane?.tabs || [];
    const idx = tabs.indexOf(fileName);
    const file = useWorkspaceStore.getState().openFiles[fileName];
    const path = file?.path || fileName;
    const isSpecial = isSpecialTab(fileName);
    const s = useWorkspaceStore.getState();
    const sections = [
      {
        items: [
          { label: "Close", shortcut: "Ctrl-W", onClick: () => s.closeTab(paneId, fileName) },
          { label: "Close Others", onClick: () => s.closeOtherTabs(paneId, fileName) },
          { label: "Close Left", onClick: () => s.closeTabsToLeft(paneId, fileName), disabled: idx <= 0 },
          { label: "Close Right", onClick: () => s.closeTabsToRight(paneId, fileName), disabled: idx >= tabs.length - 1 },
          { label: "Close All", onClick: () => s.closeAllTabs(paneId) }
        ]
      },
      ...!isSpecial ? [
        {
          items: [
            { label: "Copy Path", onClick: () => copyToClipboard(path) },
            { label: "Copy Relative Path", onClick: () => copyToClipboard(path) }
          ]
        },
        {
          items: [
            { label: "Reveal in Project Panel", onClick: () => s.revealInProjectPanel(fileName) },
            { label: "Open in Terminal", onClick: () => s.setBottomPanel("terminal") }
          ]
        }
      ] : []
    ];
    setTabContextMenu({ x: e.clientX, y: e.clientY, sections });
  }, [pane?.tabs, paneId]);
  if (!pane) return null;
  const handleEmptyDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEmptyDragOver(false);
    const tabData = e.dataTransfer.getData("application/weditor-tab");
    if (tabData) {
      const data = JSON.parse(tabData);
      if (data.paneId === paneId) {
        const state = useWorkspaceStore.getState();
        const currentPane = state.panes[paneId];
        if (currentPane) {
          const lastIdx = currentPane.tabs.length - 1;
          if (data.index < lastIdx) {
            state.reorderTab(paneId, data.index, lastIdx);
          }
        }
      } else {
        const moveTabToPane = useWorkspaceStore.getState().moveTabToPane;
        moveTabToPane(data.fileName, data.paneId, paneId);
      }
    }
    const fileData = e.dataTransfer.getData("application/weditor-file");
    if (fileData) {
      const openTab = useWorkspaceStore.getState().openTab;
      openTab(fileData, paneId);
    }
    useWorkspaceStore.getState().endTabDrag();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[35px] bg-bg0 border-b border-border shrink-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0 px-1 h-full border-r border-border shrink-0", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => useWorkspaceStore.getState().navigateBack(paneId),
            disabled: !canGoBack,
            className: cn("p-1 rounded", canGoBack ? "text-t4 hover:text-t3 hover:bg-hover" : "text-t5 cursor-default"),
            children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => useWorkspaceStore.getState().navigateForward(paneId),
            disabled: !canGoForward,
            className: cn("p-1 rounded", canGoForward ? "text-t4 hover:text-t3 hover:bg-hover" : "text-t5 cursor-default"),
            children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: tabsRef,
          className: cn(
            "flex items-center h-full overflow-x-auto flex-1",
            isOverflowing ? "tabbar-scroll" : "scrollbar-none"
          ),
          onWheel: handleWheel,
          children: [
            pane.tabs.map((fileName, idx) => /* @__PURE__ */ jsx(
              Tab,
              {
                fileName,
                paneId,
                active: pane.activeTab === fileName,
                modified: tabModifiedMap?.[fileName],
                index: idx,
                onContextMenu: handleTabContextMenu
              },
              fileName
            )),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex-1 min-w-[40px] h-full transition-colors",
                  emptyDragOver && "bg-accent/15"
                ),
                onDragOver: (e) => {
                  const types = e.dataTransfer.types;
                  if (!types.includes("application/weditor-tab") && !types.includes("application/weditor-file")) return;
                  e.preventDefault();
                  e.stopPropagation();
                  e.dataTransfer.dropEffect = "move";
                  setEmptyDragOver(true);
                },
                onDragLeave: () => {
                  setEmptyDragOver(false);
                },
                onDrop: handleEmptyDrop
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 px-2 h-full border-l border-border", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => useWorkspaceStore.getState().splitActivePane("row"),
            className: "p-1 rounded text-t4 hover:text-t3 hover:bg-hover",
            title: "Split Right",
            children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
              /* @__PURE__ */ jsx("rect", { x: "1", y: "2", width: "14", height: "12", rx: "1" }),
              /* @__PURE__ */ jsx("line", { x1: "8", y1: "2", x2: "8", y2: "14" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => useWorkspaceStore.getState().toggleMaximizePane(paneId),
            className: cn(
              "p-1 rounded hover:bg-hover",
              isMaximized ? "text-accent" : "text-t4 hover:text-t3"
            ),
            title: isMaximized ? "Restore" : "Maximize",
            children: isMaximized ? /* @__PURE__ */ jsx(Minimize2, { size: 13 }) : /* @__PURE__ */ jsx(Maximize2, { size: 13 })
          }
        )
      ] })
    ] }),
    tabContextMenu && /* @__PURE__ */ jsx(
      ContextMenu,
      {
        x: tabContextMenu.x,
        y: tabContextMenu.y,
        sections: tabContextMenu.sections,
        onClose: () => setTabContextMenu(null)
      }
    )
  ] });
});
function eventToKeyString(e) {
  if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return null;
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  let key = e.key;
  if (key === " ") key = "Space";
  else if (key === "ArrowUp") key = "Up";
  else if (key === "ArrowDown") key = "Down";
  else if (key === "ArrowLeft") key = "Left";
  else if (key === "ArrowRight") key = "Right";
  else if (key === "Escape") key = "Escape";
  else if (key === "Enter") key = "Enter";
  else if (key === "Backspace") key = "Backspace";
  else if (key === "Delete") key = "Delete";
  else if (key === "Tab") key = "Tab";
  else if (key.length === 1) key = key.toUpperCase();
  parts.push(key);
  return parts.join("-");
}
function KeyBadge({ keys }) {
  if (!keys) return /* @__PURE__ */ jsx("span", { className: "text-t5 text-[11px] italic", children: "unset" });
  return /* @__PURE__ */ jsx("span", { className: "inline-flex gap-1", children: keys.split(" ").map((chord) => /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded bg-bg0 border border-border text-[11px] text-t2 font-mono", children: chord }, chord)) });
}
function KeyCaptureInput({ value, onChange, onCancel }) {
  const [captured, setCaptured] = useState([]);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      onCancel();
      return;
    }
    const keyStr = eventToKeyString(e.nativeEvent);
    if (!keyStr) return;
    setCaptured((prev) => {
      const next = [...prev, keyStr];
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(next.join(" "));
      }, 800);
      return next;
    });
  }, [onChange, onCancel]);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        className: "bg-bg0 border border-focus rounded px-2 py-0.5 text-[11px] text-t1 font-mono outline-none w-[180px]",
        value: captured.length > 0 ? captured.join(" ") : "Press keys...",
        readOnly: true,
        onKeyDown: handleKeyDown,
        onBlur: onCancel
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-t5", children: "Press Escape to cancel" })
  ] });
}
function BindingRow({ binding }) {
  const [editing, setEditing] = useState(false);
  const updateBinding = useKeymapStore((s) => s.updateBinding);
  const resetBinding = useKeymapStore((s) => s.resetBinding);
  return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50 hover:bg-hover/50 group", children: [
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3 text-[11px] text-t2", children: binding.action }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3", children: editing ? /* @__PURE__ */ jsx(
      KeyCaptureInput,
      {
        value: binding.keys,
        onChange: (keys) => {
          updateBinding(binding.id, keys);
          setEditing(false);
        },
        onCancel: () => setEditing(false)
      }
    ) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setEditing(true),
        className: "hover:bg-bg3 rounded px-1 py-0.5 -mx-1 transition-colors",
        title: "Click to rebind",
        children: /* @__PURE__ */ jsx(KeyBadge, { keys: binding.keys })
      }
    ) }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3 text-[11px] text-t4", children: binding.context }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3 text-[11px]", children: /* @__PURE__ */ jsx("span", { className: binding.source === "User" ? "text-accent" : "text-t5", children: binding.source }) }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-2 w-8", children: binding.source === "User" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => resetBinding(binding.id),
        className: "p-0.5 rounded text-t5 hover:text-t3 hover:bg-hover opacity-0 group-hover:opacity-100 transition-opacity",
        title: "Reset to default",
        children: /* @__PURE__ */ jsx(RotateCcw, { size: 11 })
      }
    ) })
  ] });
}
function CreateBindingRow({ onCreated }) {
  const [action, setAction] = useState("");
  const [context, setContext] = useState("Global");
  const [capturingKeys, setCapturingKeys] = useState(false);
  const addBinding = useKeymapStore((s) => s.addBinding);
  if (capturingKeys) {
    return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50 bg-bg3/50", children: [
      /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3 text-[11px] text-t2", children: action }),
      /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3", colSpan: 4, children: /* @__PURE__ */ jsx(
        KeyCaptureInput,
        {
          value: "",
          onChange: (keys) => {
            addBinding(action, keys, context);
            setCapturingKeys(false);
            setAction("");
            onCreated();
          },
          onCancel: () => setCapturingKeys(false)
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50 bg-bg3/30", children: [
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        value: action,
        onChange: (e) => setAction(e.target.value),
        placeholder: "Action name...",
        className: "bg-transparent text-[11px] text-t1 placeholder-t5 outline-none w-full"
      }
    ) }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (action.trim()) setCapturingKeys(true);
        },
        className: cn(
          "text-[11px] px-2 py-0.5 rounded",
          action.trim() ? "text-accent hover:bg-accent/10" : "text-t5 cursor-not-allowed"
        ),
        disabled: !action.trim(),
        children: "Set keys..."
      }
    ) }),
    /* @__PURE__ */ jsx("td", { className: "py-1.5 px-3", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "bg-bg0 border border-border rounded pl-1.5 pr-6 py-0.5 text-[11px] text-t2 outline-none cursor-pointer text-left min-w-[90px] flex items-center relative", children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: context }),
        /* @__PURE__ */ jsx(ChevronsUpDown, { size: 10, className: "absolute right-1.5 top-1/2 -translate-y-1/2 text-t4 pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "min-w-[120px]", children: ["Global", "Editor", "Terminal"].map((opt) => /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: () => setContext(opt), children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 shrink-0 flex items-center justify-center", children: context === opt && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-accent" }) }),
        opt
      ] }, opt)) })
    ] }) }),
    /* @__PURE__ */ jsx("td", { colSpan: 2 })
  ] });
}
function KeymapEditorContent() {
  const bindings = useKeymapStore((s) => s.bindings);
  const getJSON = useKeymapStore((s) => s.getJSON);
  const [filter, setFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const filterRef = useRef(null);
  useEffect(() => {
    setTimeout(() => filterRef.current?.focus(), 100);
  }, []);
  const filtered = filter ? bindings.filter(
    (b) => b.action.toLowerCase().includes(filter.toLowerCase()) || b.keys.toLowerCase().includes(filter.toLowerCase()) || b.context.toLowerCase().includes(filter.toLowerCase())
  ) : bindings;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-bg1", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-[44px] px-4 border-b border-border shrink-0", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[13px] text-t1 font-semibold", children: "Keymap Editor" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowJSON(!showJSON),
            className: cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors",
              showJSON ? "text-accent bg-accent/10" : "text-t4 hover:text-t3 hover:bg-hover"
            ),
            title: "Edit in JSON",
            children: [
              /* @__PURE__ */ jsx(Code, { size: 12 }),
              "Edit in JSON"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowCreate(!showCreate),
            className: "flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium text-t4 hover:text-t3 hover:bg-hover transition-colors",
            title: "Create Keybinding",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 12 }),
              "Create Keybinding"
            ]
          }
        )
      ] })
    ] }),
    showJSON ? (
      /* JSON View */
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 p-4 overflow-auto", children: /* @__PURE__ */ jsx("pre", { className: "bg-bg0 border border-border rounded-lg p-4 text-[11px] text-t2 font-mono overflow-auto h-full whitespace-pre-wrap", children: getJSON() || "[]" }) })
    ) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0", children: [
        /* @__PURE__ */ jsx(Search, { size: 13, className: "text-t4 shrink-0" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: filterRef,
            value: filter,
            onChange: (e) => setFilter(e.target.value),
            placeholder: "Filter action names...",
            className: "flex-1 bg-transparent text-[12px] text-t1 placeholder-t5 outline-none"
          }
        ),
        filter && /* @__PURE__ */ jsx("button", { onClick: () => setFilter(""), className: "p-0.5 rounded text-t5 hover:text-t3", children: /* @__PURE__ */ jsx(X, { size: 12 }) }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-t5", children: [
          filtered.length,
          " bindings"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-h-0 overflow-auto scrollbar-thin", children: [
        /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-bg1 z-10", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-[10px] text-t5 uppercase tracking-wider font-semibold", children: [
            /* @__PURE__ */ jsx("th", { className: "text-left py-2 px-3 w-[35%]", children: "Action" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2 px-3 w-[25%]", children: "Keystrokes" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2 px-3 w-[20%]", children: "Context" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2 px-3 w-[12%]", children: "Source" }),
            /* @__PURE__ */ jsx("th", { className: "w-8" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            showCreate && /* @__PURE__ */ jsx(CreateBindingRow, { onCreated: () => setShowCreate(false) }),
            filtered.map((binding) => /* @__PURE__ */ jsx(BindingRow, { binding }, binding.id))
          ] })
        ] }),
        filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-12 text-t5 text-[12px]", children: [
          "No bindings match “",
          filter,
          "”"
        ] })
      ] })
    ] })
  ] });
}
const MonacoEditor = lazy(() => import("./index-BrGZK_y7.js").then((m) => ({ default: m.default })));
function SpecialTabContent({ tabId }) {
  switch (getTabType(tabId)) {
    case "keymap":
      return /* @__PURE__ */ jsx(KeymapEditorContent, {});
    case "browser":
      return /* @__PURE__ */ jsx(BrowserPanel, {});
    case "ai":
      return /* @__PURE__ */ jsx(AIPanel, {});
    default:
      return null;
  }
}
const FileEditor = memo(function FileEditor2({ filePath }) {
  const file = useWorkspaceStore((s) => s.openFiles[filePath]);
  const updateFileContent = useWorkspaceStore((s) => s.updateFileContent);
  const theme = useSettingsStore((s) => s.theme);
  const handleChange = useCallback(
    (value) => updateFileContent(filePath, value ?? ""),
    [filePath, updateFileContent]
  );
  if (!file) {
    return /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center text-t5 text-sm select-none", children: "Loading…" });
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "flex-1 bg-bg1" }), children: /* @__PURE__ */ jsx(
    MonacoEditor,
    {
      className: "flex-1 min-h-0",
      height: "100%",
      language: file.language ?? "plaintext",
      value: file.content,
      onChange: handleChange,
      theme: theme === "light" ? "vs" : "vs-dark",
      options: {
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        fontSize: 13,
        lineHeight: 20,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
        renderLineHighlight: "gutter",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        tabSize: 2
      }
    }
  ) });
});
const Pane = memo(function Pane2({ paneId }) {
  const activeTab = useWorkspaceStore((s) => s.panes[paneId]?.activeTab ?? "");
  const activePaneId = useWorkspaceStore((s) => s.activePaneId);
  const setActivePaneId = useWorkspaceStore((s) => s.setActivePaneId);
  const isActive = activePaneId === paneId;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col h-full w-full overflow-hidden border ${isActive ? "border-accent/30" : "border-transparent"}`,
      onMouseDown: () => {
        if (!isActive) setActivePaneId(paneId);
      },
      children: [
        /* @__PURE__ */ jsx(TabBar, { paneId }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 relative overflow-hidden", children: activeTab === "" ? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-t5 text-sm select-none", children: "Open a file to start editing" }) : isSpecialTab(activeTab) ? /* @__PURE__ */ jsx(SpecialTabContent, { tabId: activeTab }) : /* @__PURE__ */ jsx(FileEditor, { filePath: activeTab }) })
      ]
    }
  );
});
const SplitView = memo(function SplitView2({ node }) {
  if (node.type === "leaf") {
    return /* @__PURE__ */ jsx(Pane, { paneId: node.paneId });
  }
  const isRow = node.type === "row";
  const children = node.children ?? [];
  const sizes = node.sizes ?? children.map(() => 100 / children.length);
  return /* @__PURE__ */ jsx("div", { className: `flex ${isRow ? "flex-row" : "flex-col"} h-full w-full overflow-hidden`, children: children.map((child, i) => /* @__PURE__ */ jsx(
    "div",
    {
      style: { flex: sizes[i] ?? 1 },
      className: "min-w-0 min-h-0 overflow-hidden",
      children: /* @__PURE__ */ jsx(SplitView2, { node: child })
    },
    child.id
  )) });
});
function EditorArea() {
  const splitLayout = useWorkspaceStore((s) => s.splitLayout);
  return /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden", children: /* @__PURE__ */ jsx(SplitView, { node: splitLayout }) });
}
function MaximizedPane({ paneId }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-50 bg-bg1 flex flex-col", children: /* @__PURE__ */ jsx(Pane, { paneId }) });
}
function PerfMonitor() {
  return null;
}
const LANG_DISPLAY = {
  rust: "Rust",
  typescript: "TypeScript",
  javascript: "JavaScript",
  json: "JSON",
  toml: "TOML",
  markdown: "Markdown",
  css: "CSS",
  scss: "SCSS",
  less: "Less",
  html: "HTML",
  xml: "XML",
  yaml: "YAML",
  python: "Python",
  shell: "Shell",
  svelte: "Svelte",
  vue: "Vue",
  graphql: "GraphQL",
  sql: "SQL",
  go: "Go",
  java: "Java",
  kotlin: "Kotlin",
  ruby: "Ruby",
  php: "PHP",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  swift: "Swift",
  r: "R",
  lua: "Lua",
  perl: "Perl",
  ini: "INI",
  dockerfile: "Dockerfile",
  plaintext: "Plain Text"
};
function StatusBar() {
  const leftDockVisible = useWorkspaceStore((s) => s.leftDock.visible);
  const leftDockPanel = useWorkspaceStore((s) => s.leftDock.activePanel);
  const rightDockVisible = useWorkspaceStore((s) => s.rightDock.visible);
  const setLeftPanel = useWorkspaceStore((s) => s.setLeftPanel);
  const toggleLeftDock = useWorkspaceStore((s) => s.toggleLeftDock);
  const toggleRightDock = useWorkspaceStore((s) => s.toggleRightDock);
  const openTab = useWorkspaceStore((s) => s.openTab);
  const activeFileLanguage = useWorkspaceStore((s) => {
    const pane = s.panes[s.activePaneId];
    const tab = pane?.activeTab;
    return tab ? s.openFiles[tab]?.language ?? null : null;
  });
  const panelIcons = [
    { kind: "project", icon: /* @__PURE__ */ jsx(FolderTree, { size: 16 }), label: "Project" },
    { kind: "search", icon: /* @__PURE__ */ jsx(Search, { size: 16 }), label: "Search" },
    { kind: "git", icon: /* @__PURE__ */ jsx(GitBranch, { size: 16 }), label: "Git" },
    { kind: "extensions", icon: /* @__PURE__ */ jsx(Package, { size: 16 }), label: "Extensions" },
    { kind: "marketplace", icon: /* @__PURE__ */ jsx(ShoppingBag, { size: 16 }), label: "Marketplace" }
  ];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-[26px] flex items-center justify-between px-2 text-[11px] select-none shrink-0",
        "bg-bg0 border-t border-border text-t4"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          panelIcons.map(({ kind, icon, label }) => {
            const isActive = leftDockVisible && leftDockPanel === kind;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  if (isActive) {
                    toggleLeftDock();
                  } else {
                    setLeftPanel(kind);
                  }
                },
                className: cn(
                  "p-0.5 rounded hover:bg-hover",
                  isActive ? "text-accent" : "hover:text-t3"
                ),
                title: label,
                children: icon
              },
              kind
            );
          }),
          /* @__PURE__ */ jsx("div", { className: "w-px self-stretch bg-border" }),
          /* @__PURE__ */ jsx("span", { className: "flex items-center", children: /* @__PURE__ */ jsx(GitBranch, { size: 11, className: "text-git-branch" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(PerfMonitor, {}),
          activeFileLanguage && /* @__PURE__ */ jsx("span", { children: LANG_DISPLAY[activeFileLanguage] || activeFileLanguage }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTab("tab:browser"),
              className: "p-0.5 rounded hover:bg-hover hover:text-t3",
              title: "Open Browser (Ctrl+Shift+I)",
              children: /* @__PURE__ */ jsx(Globe, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleRightDock,
              className: cn(
                "p-0.5 rounded hover:bg-hover",
                rightDockVisible ? "text-accent" : "hover:text-t3"
              ),
              title: "Toggle AI Panel",
              children: /* @__PURE__ */ jsx(Sparkles, { size: 16 })
            }
          )
        ] })
      ]
    }
  );
}
function CommandPalette() {
  return null;
}
function FileFinder() {
  return null;
}
function CtrlKMenu() {
  return null;
}
function SettingsModal() {
  return null;
}
function useResizable(direction, onDelta) {
  const dragging = useRef(false);
  const lastPos = useRef(0);
  const onDeltaRef = useRef(onDelta);
  onDeltaRef.current = onDelta;
  const dirRef = useRef(direction);
  dirRef.current = direction;
  const cleanupRef = useRef(null);
  useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    const isTouch = "touches" in e;
    lastPos.current = dirRef.current === "horizontal" ? isTouch ? e.touches[0].clientX : e.clientX : isTouch ? e.touches[0].clientY : e.clientY;
    document.body.style.cursor = dirRef.current === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) => {
      if (!dragging.current) return;
      const isTouchEv = "touches" in ev;
      const pos = dirRef.current === "horizontal" ? isTouchEv ? ev.touches[0].clientX : ev.clientX : isTouchEv ? ev.touches[0].clientY : ev.clientY;
      const delta = pos - lastPos.current;
      lastPos.current = pos;
      if (delta !== 0) onDeltaRef.current(delta);
    };
    const cleanup = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", cleanup);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", cleanup);
      window.removeEventListener("touchcancel", cleanup);
      cleanupRef.current = null;
    };
    cleanupRef.current = cleanup;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", cleanup);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", cleanup);
    window.addEventListener("touchcancel", cleanup);
  }, []);
  return onMouseDown;
}
function ResizeHandle({ direction, onDelta }) {
  const onMouseDown = useResizable(direction, onDelta);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex-shrink-0 relative z-20 flex items-center justify-center",
        direction === "horizontal" ? "w-[9px] -mx-[4px] cursor-col-resize" : "h-[9px] -my-[4px] cursor-row-resize"
      ),
      onMouseDown,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "bg-border transition-colors",
              direction === "horizontal" ? "w-[1px] h-full" : "h-[1px] w-full"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute opacity-0 hover:opacity-100 transition-opacity",
              direction === "horizontal" ? "top-0 left-[2px] w-[5px] h-full bg-focus/40" : "left-0 top-[2px] h-[5px] w-full bg-focus/40"
            )
          }
        )
      ]
    }
  );
}
function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
const TEMPLATE_ICONS = {
  blank: FileCode,
  react: CodeXml,
  node: Server,
  vite: Globe
};
function getTemplateIcon(templateId) {
  return TEMPLATE_ICONS[templateId] || FileCode;
}
function ProjectCard({
  project,
  onOpen,
  onRename,
  onDelete,
  onShare
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(project.name);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const shareCopiedTimer = useRef(null);
  const Icon2 = getTemplateIcon(project.templateId || "blank");
  useEffect(() => {
    return () => {
      if (shareCopiedTimer.current) clearTimeout(shareCopiedTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);
  useEffect(() => {
    if (renaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renaming]);
  function handleRenameSubmit() {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== project.name) {
      onRename(trimmed);
    }
    setRenaming(false);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      tabIndex: 0,
      className: cn(
        "group relative flex flex-col justify-between p-5 rounded-lg border border-border bg-bg1 transition-all cursor-pointer focus:outline-none focus:border-accent min-h-[120px]",
        "hover:border-accent/40 hover:shadow-sm"
      ),
      onClick: () => {
        if (!renaming && !menuOpen) onOpen();
      },
      onKeyDown: (e) => {
        if ((e.key === "Enter" || e.key === " ") && !renaming && !menuOpen) {
          e.preventDefault();
          onOpen();
        }
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-md bg-bg2 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon2, { size: 18, className: "text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                },
                className: "p-1.5 rounded hover:bg-bg3 text-t5 opacity-0 group-hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ jsx(Ellipsis, { size: 14 })
              }
            ),
            menuOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-8 z-50 w-[150px] rounded-md bg-bg3 border border-border shadow-lg py-1", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    setRenameValue(project.name);
                    setRenaming(true);
                  },
                  className: "flex items-center gap-2 w-full px-3 py-1.5 text-[11px] text-t2 hover:bg-hover transition-colors text-left",
                  children: [
                    /* @__PURE__ */ jsx(Pencil, { size: 12, className: "text-t4" }),
                    "Rename"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled: shareLoading,
                  onClick: async (e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    setShareLoading(true);
                    try {
                      await onShare();
                      setShareCopied(true);
                      if (shareCopiedTimer.current)
                        clearTimeout(shareCopiedTimer.current);
                      shareCopiedTimer.current = setTimeout(
                        () => setShareCopied(false),
                        2e3
                      );
                    } finally {
                      setShareLoading(false);
                    }
                  },
                  className: cn(
                    "flex items-center gap-2 w-full px-3 py-1.5 text-[11px] text-t2 hover:bg-hover transition-colors text-left",
                    shareLoading && "opacity-50 cursor-wait"
                  ),
                  children: [
                    shareLoading ? /* @__PURE__ */ jsx(LoaderCircle, { size: 12, className: "text-t4 animate-spin" }) : shareCopied ? /* @__PURE__ */ jsx(Check, { size: 12, className: "text-added" }) : /* @__PURE__ */ jsx(Link, { size: 12, className: "text-t4" }),
                    shareLoading ? "Sharing..." : shareCopied ? "Copied!" : "Copy link"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onDelete();
                  },
                  className: "flex items-center gap-2 w-full px-3 py-1.5 text-[11px] text-deleted hover:bg-hover transition-colors text-left",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { size: 12 }),
                    "Delete"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          renaming ? /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              value: renameValue,
              onChange: (e) => setRenameValue(e.target.value),
              onBlur: handleRenameSubmit,
              onKeyDown: (e) => {
                if (e.key === "Enter") handleRenameSubmit();
                if (e.key === "Escape") setRenaming(false);
              },
              onClick: (e) => e.stopPropagation(),
              className: "text-[13px] font-medium text-t1 bg-bg3 border border-accent rounded px-1.5 py-0.5 outline-none w-full"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium text-t1 truncate", children: project.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] text-t5 mt-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { size: 9 }),
              timeAgo(project.lastOpened)
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-border", children: "·" }),
            /* @__PURE__ */ jsx("span", { className: "capitalize", children: project.templateId || "blank" })
          ] })
        ] })
      ]
    }
  );
}
function TemplateCard({
  template,
  onSelect
}) {
  const Icon2 = getTemplateIcon(template.id);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: onSelect,
      className: "flex flex-col justify-between p-5 rounded-lg bg-bg1 border border-border hover:border-accent/30 hover:bg-hover/50 transition-all text-left group min-h-[120px]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-md bg-bg2 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsx(
            Icon2,
            {
              size: 17,
              className: "text-t4 group-hover:text-accent transition-colors"
            }
          ) }),
          /* @__PURE__ */ jsx(
            ArrowRight,
            {
              size: 13,
              className: "text-t5 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[13px] text-t2 group-hover:text-t1 font-medium", children: template.name }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-t5 mt-0.5", children: template.description })
        ] })
      ]
    }
  );
}
function HomeScreen() {
  const projects = useWorkspaceStore((s) => s.projects);
  const templates = useWorkspaceStore((s) => s.templates);
  const openProject = useWorkspaceStore((s) => s.openProject);
  const openTemplate = useWorkspaceStore((s) => s.openTemplate);
  const deleteProject = useWorkspaceStore((s) => s.deleteProject);
  const renameProject = useWorkspaceStore((s) => s.renameProject);
  const search = useWorkspaceStore((s) => s.homeSearch);
  async function handleShareProject(project) {
    try {
      const { loadProjectSnapshot: loadProjectSnapshot2 } = await Promise.resolve().then(() => snapshotDb);
      const { createShareUrl } = await import("./share-AjXBiX7F.js");
      const snapshot = await loadProjectSnapshot2(project.id);
      if (!snapshot) {
        alert("No saved snapshot for this project. Open and save it first.");
        return;
      }
      await new Promise(
        (r) => requestAnimationFrame(() => setTimeout(r, 0))
      );
      const result = await createShareUrl(
        project.name,
        project.templateId || "blank",
        snapshot
      );
      if ("error" in result) {
        alert(result.error);
        return;
      }
      await navigator.clipboard.writeText(result.url);
    } catch (e) {
      console.error("Failed to share project:", e);
      alert("Failed to create share link");
    }
  }
  const sorted = [...projects].sort((a, b) => b.lastOpened - a.lastOpened).filter(
    (p) => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
  );
  const hasProjects = projects.length > 0;
  return /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col bg-bg0 select-none overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[860px] mx-auto px-8 py-8", children: [
    hasProjects && /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[11px] text-t4 uppercase tracking-wider font-medium mb-3", children: "Recent Projects" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [
        sorted.map((project, i) => /* @__PURE__ */ jsx(
          ProjectCard,
          {
            project,
            onOpen: () => openProject(project.id),
            onRename: (name) => renameProject(project.id, name),
            onDelete: () => deleteProject(project.id),
            onShare: () => handleShareProject(project)
          },
          project.id
        )),
        sorted.length === 0 && search && /* @__PURE__ */ jsxs("div", { className: "col-span-full text-center text-t5 text-[12px] py-8", children: [
          "No projects match “",
          search,
          "”"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[11px] text-t4 uppercase tracking-wider font-medium mb-3", children: "Start New" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: templates.map((template) => /* @__PURE__ */ jsx(
        TemplateCard,
        {
          template,
          onSelect: () => openTemplate(template.id)
        },
        template.id
      )) })
    ] }),
    !hasProjects && /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx(Folder, { size: 32, className: "text-t5 mx-auto mb-3" }),
      /* @__PURE__ */ jsx("p", { className: "text-t4 text-[13px] mb-1", children: "No projects yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-t5 text-[11px]", children: "Choose a template above to create your first project." })
    ] })
  ] }) });
}
const STYLE_ID = "np-pulse-keyframes";
function LoadingOverlay() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `@keyframes np-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`;
    document.head.appendChild(style);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg0", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-[40px] font-semibold text-white select-none",
        style: {
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: "np-pulse 2s ease-in-out infinite"
        },
        children: "Nodepod"
      }
    ),
    /* @__PURE__ */ jsx(
      "p",
      {
        className: "fixed bottom-6 text-[11px] tracking-widest lowercase",
        style: { color: "var(--text5)", opacity: 0.6 },
        children: "booting..."
      }
    )
  ] });
}
function ZedClone() {
  const leftDock = useWorkspaceStore((s) => s.leftDock);
  const rightDock = useWorkspaceStore((s) => s.rightDock);
  const bottomDock = useWorkspaceStore((s) => s.bottomDock);
  const resizeLeftDock = useWorkspaceStore((s) => s.resizeLeftDock);
  const resizeRightDock = useWorkspaceStore((s) => s.resizeRightDock);
  const resizeBottomDock = useWorkspaceStore((s) => s.resizeBottomDock);
  const maximizedPaneId = useWorkspaceStore((s) => s.maximizedPaneId);
  const bottomDockMaximized = useWorkspaceStore((s) => s.bottomDockMaximized);
  const toggleBottomDock = useWorkspaceStore((s) => s.toggleBottomDock);
  const showHomeScreen = useWorkspaceStore((s) => s.showHomeScreen);
  const hydrateProjects = useWorkspaceStore((s) => s.hydrateProjects);
  const importFromShare = useWorkspaceStore((s) => s.importFromShare);
  const uiFontSize = useSettingsStore((s) => s.settings.ui_font_size);
  const uiFontFamily = useSettingsStore((s) => s.settings.ui_font_family);
  const themeName = useSettingsStore((s) => s.settings.theme);
  const nodepodInstance = useNodepodStore((s) => s.instance);
  const nodepodBooting = useNodepodStore((s) => s.booting);
  const startupCommand = useNodepodStore((s) => s.startupCommand);
  const extensionsInitialized = useExtensionStore((s) => s.extensions.length > 0);
  useEffect(() => {
    hydrateProjects();
    const shareData = new URLSearchParams(window.location.search).get("share");
    if (shareData) {
      window.history.replaceState({}, "", window.location.pathname);
      (async () => {
        try {
          const { decompressFromBase64 } = await import("./share-AjXBiX7F.js");
          const payload = await decompressFromBase64(shareData);
          if (payload?.version === 1 && payload.snapshot && typeof payload.name === "string") {
            importFromShare(payload.name, payload.templateId, payload.snapshot);
          }
        } catch (e) {
          console.error("Failed to import from share URL:", e);
        }
      })();
    }
  }, [hydrateProjects, importFromShare]);
  useEffect(() => {
    if (nodepodInstance && !extensionsInitialized) {
      extensionHost.initialize({
        monaco: window.monaco,
        // Will be set by Monaco editor on mount
        workspaceStore: useWorkspaceStore,
        settingsStore: useSettingsStore,
        nodepodStore: useNodepodStore
      });
      (async () => {
        try {
          const { initializeBuiltInExtensions } = await import("./builtin-extensions-Bcu1mnab.js");
          await initializeBuiltInExtensions();
          await autoLoadExtensions(nodepodInstance);
          useExtensionStore.getState().refreshExtensions();
          console.log("Extensions initialized");
        } catch (e) {
          console.error("Failed to initialize extensions:", e);
        }
      })();
    }
  }, [nodepodInstance, extensionsInitialized]);
  useEffect(() => {
    if (startupCommand && nodepodInstance) {
      const isVisible = useWorkspaceStore.getState().bottomDock.visible;
      if (!isVisible) toggleBottomDock();
    }
  }, [startupCommand, nodepodInstance, toggleBottomDock]);
  useEffect(() => {
    const theme = getThemeByName(themeName) || getTheme(themeName);
    const c = theme.colors;
    const root = document.documentElement;
    const vars = [
      ["--bg0", c.bg0],
      ["--bg1", c.bg1],
      ["--bg2", c.bg2],
      ["--bg3", c.bg3],
      ["--bg4", c.bg4],
      ["--border", c.border],
      ["--hover", c.hover],
      ["--selection", c.selection],
      ["--text1", c.text1],
      ["--text2", c.text2],
      ["--text3", c.text3],
      ["--text4", c.text4],
      ["--text5", c.text5],
      ["--accent", c.accent],
      ["--accent-hover", c.accentHover],
      ["--focus", c.focus],
      ["--added", c.added],
      ["--modified", c.modified],
      ["--deleted", c.deleted],
      ["--warning", c.warning],
      ["--git-branch", c.gitBranch],
      ["--purple", c.purple],
      ["--scroll-thumb", c.scrollThumb],
      ["--scroll-thumb-hover", c.scrollThumbHover]
    ];
    for (const [k, v] of vars) root.style.setProperty(k, v);
    root.style.colorScheme = theme.appearance;
  }, [themeName]);
  useEffect(() => {
    document.documentElement.style.fontSize = `${uiFontSize}px`;
  }, [uiFontSize]);
  useEffect(() => {
    const safeFontFamily = uiFontFamily.replace(/'/g, "");
    document.documentElement.style.fontFamily = `'${safeFontFamily}', system-ui, sans-serif`;
  }, [uiFontFamily]);
  const handleKeyDown = useCallback((e) => {
    const handled = handleKeybinding(e);
    if (handled) e.preventDefault();
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  if (showHomeScreen) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen w-full overflow-hidden bg-bg0 text-t3 font-sans", children: [
      /* @__PURE__ */ jsx(TitleBar, {}),
      /* @__PURE__ */ jsx(HomeScreen, {}),
      /* @__PURE__ */ jsx(SettingsModal, {}),
      nodepodBooting && /* @__PURE__ */ jsx(LoadingOverlay, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen w-full overflow-hidden bg-bg0 text-t3 font-sans", children: [
    /* @__PURE__ */ jsx(TitleBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      leftDock.visible && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { style: { width: leftDock.width }, className: "shrink-0 h-full", children: /* @__PURE__ */ jsx(
          DockPanel,
          {
            position: "left",
            panels: ["project", "search", "git"]
          }
        ) }),
        /* @__PURE__ */ jsx(ResizeHandle, { direction: "horizontal", onDelta: resizeLeftDock })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-w-0 min-h-0", children: [
        /* @__PURE__ */ jsx(EditorArea, {}),
        bottomDock.visible && !bottomDockMaximized && /* @__PURE__ */ jsx(ResizeHandle, { direction: "vertical", onDelta: resizeBottomDock }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: !bottomDock.visible ? "hidden" : bottomDockMaximized ? "fixed inset-0 top-[38px] z-40 p-2" : "shrink-0 w-full",
            style: !bottomDock.visible || bottomDockMaximized ? void 0 : { height: bottomDock.height },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: bottomDockMaximized ? "w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-border" : "h-full",
                children: /* @__PURE__ */ jsx(DockPanel, { position: "bottom", panels: ["terminal"] })
              }
            )
          }
        )
      ] }),
      rightDock.visible && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ResizeHandle, { direction: "horizontal", onDelta: resizeRightDock }),
        /* @__PURE__ */ jsx("div", { style: { width: rightDock.width }, className: "shrink-0 h-full", children: /* @__PURE__ */ jsx(DockPanel, { position: "right", panels: ["ai"] }) })
      ] })
    ] }),
    maximizedPaneId && /* @__PURE__ */ jsx(MaximizedPane, { paneId: maximizedPaneId }),
    nodepodBooting && /* @__PURE__ */ jsx(LoadingOverlay, {}),
    /* @__PURE__ */ jsx(CommandPalette, {}),
    /* @__PURE__ */ jsx(FileFinder, {}),
    /* @__PURE__ */ jsx(CtrlKMenu, {}),
    /* @__PURE__ */ jsx(SettingsModal, {}),
    /* @__PURE__ */ jsx(StatusBar, {})
  ] });
}
const export_f29e6e234fea = {
  ErrorBoundary: ErrorBoundary$1,
  NotFoundBoundary
};
const export_0deffcb8ffd7 = {
  LayoutSegmentProvider
};
const export_73d7a23e5015 = {
  default: ZedClone
};
const facade__virtual_vinextRscEntry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  export_0deffcb8ffd7,
  export_73d7a23e5015,
  export_f29e6e234fea
}, Symbol.toStringTag, { value: "Module" }));
export {
  facade__virtual_vinextRscEntry as f,
  registerBuiltInExtension as r
};

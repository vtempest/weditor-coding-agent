import { r as registerBuiltInExtension } from "./facade__virtual_vinext-rsc-entry-C8Z3mcOQ.js";
import "react/jsx-runtime";
import "react";
import "../index.js";
import "../__vite_rsc_assets_manifest.js";
import "react-dom";
import "react-dom/server.edge";
import "node:async_hooks";
import "clsx";
import "tailwind-merge";
async function registerLineCounterExtension() {
  await registerBuiltInExtension(
    {
      id: "weditor.line-counter",
      name: "Line Counter",
      version: "1.0.0",
      description: "Shows line count in the status bar",
      commands: {
        "line-counter.count": {
          label: "Count Lines",
          description: "Count lines in active file"
        }
      }
    },
    (context) => {
      context.subscriptions.push(
        context.commands.registerCommand("line-counter.count", async () => {
          const editor = context.editor.getActiveEditor();
          if (editor) {
            const model = editor.getModel();
            if (model) {
              const lineCount = model.getLineCount();
              alert(`This file has ${lineCount} lines`);
            }
          }
        })
      );
      console.log("Line Counter extension activated");
    }
  );
}
async function registerBracketHighlighterExtension() {
  await registerBuiltInExtension(
    {
      id: "weditor.bracket-highlighter",
      name: "Bracket Highlighter",
      version: "1.0.0",
      description: "Highlights matching brackets"
    },
    (context) => {
      context.subscriptions.push(
        context.editor.registerDecorator({
          id: "bracket-highlighter",
          provide: (editor) => {
            const decorations = [];
            const model = editor.getModel();
            const position = editor.getPosition();
            if (!model || !position) return decorations;
            const lineContent = model.getLineContent(position.lineNumber);
            const brackets = ["(", ")", "[", "]", "{", "}"];
            for (let col = 1; col <= lineContent.length; col++) {
              const char = lineContent[col - 1];
              if (brackets.includes(char)) {
                decorations.push({
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: col,
                    endLineNumber: position.lineNumber,
                    endColumn: col + 1
                  },
                  options: {
                    inlineClassName: "bracket-highlight",
                    isWholeLine: false
                  }
                });
              }
            }
            return decorations;
          }
        })
      );
      console.log("Bracket Highlighter extension activated");
    }
  );
}
async function registerWordCountExtension() {
  await registerBuiltInExtension(
    {
      id: "weditor.word-count",
      name: "Word Count",
      version: "1.0.0",
      description: "Counts words in the active file",
      commands: {
        "word-count.count": {
          label: "Count Words",
          description: "Count words in active file",
          keybinding: "Ctrl+Shift+W"
        }
      }
    },
    (context) => {
      context.subscriptions.push(
        context.commands.registerCommand("word-count.count", async () => {
          const editor = context.editor.getActiveEditor();
          if (editor) {
            const model = editor.getModel();
            if (model) {
              const text = model.getValue();
              const words = text.split(/\s+/).filter((w) => w.length > 0);
              const chars = text.length;
              alert(`Words: ${words.length}
Characters: ${chars}`);
            }
          }
        })
      );
      console.log("Word Count extension activated");
    }
  );
}
async function initializeBuiltInExtensions() {
  try {
    await registerLineCounterExtension();
    await registerBracketHighlighterExtension();
    await registerWordCountExtension();
    console.log("Built-in extensions registered");
  } catch (e) {
    console.error("Failed to register built-in extensions:", e);
  }
}
export {
  initializeBuiltInExtensions,
  registerBracketHighlighterExtension,
  registerLineCounterExtension,
  registerWordCountExtension
};

import { Keyboard, X } from "lucide-react";
import { useState } from "react";

const shortcuts = [
  { keys: ["Ctrl", "Z"], action: "Undo", category: "Basic" },
  { keys: ["Ctrl", "Y"], action: "Redo", category: "Basic" },
  {
    keys: ["Ctrl", "Shift", "Z"],
    action: "Redo (Alternative)",
    category: "Basic",
  },
  { keys: ["Ctrl", "C"], action: "Copy", category: "Basic" },
  { keys: ["Ctrl", "V"], action: "Paste", category: "Basic" },
  { keys: ["Ctrl", "A"], action: "Select All", category: "Basic" },
  { keys: ["Ctrl", "B"], action: "Bold", category: "Formatting" },
  { keys: ["Ctrl", "I"], action: "Italic", category: "Formatting" },
  { keys: ["Ctrl", "U"], action: "Underline", category: "Formatting" },
  {
    keys: ["Ctrl", "Shift", "S"],
    action: "Strikethrough",
    category: "Formatting",
  },
  { keys: ["Ctrl", "`"], action: "Code", category: "Formatting" },
  { keys: ["Ctrl", "Shift", "L"], action: "Align Left", category: "Layout" },
  { keys: ["Ctrl", "Shift", "E"], action: "Align Center", category: "Layout" },
  { keys: ["Ctrl", "Shift", "R"], action: "Align Right", category: "Layout" },
  { keys: ["Ctrl", "Shift", "8"], action: "Bullet List", category: "Layout" },
  { keys: ["Ctrl", "Shift", "7"], action: "Numbered List", category: "Layout" },
  { keys: ["Ctrl", "Shift", "."], action: "Blockquote", category: "Layout" },
  { keys: ["Ctrl", "K"], action: "Insert Link", category: "Insert" },
  { keys: ["Ctrl", "Shift", "I"], action: "Insert Image", category: "Insert" },
  { keys: ["Ctrl", "-"], action: "Horizontal Rule", category: "Insert" },
  { keys: ["Ctrl", "="], action: "Increase Font Size", category: "Typography" },
  { keys: ["Ctrl", "-"], action: "Decrease Font Size", category: "Typography" },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const categorized = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) acc[shortcut.category] = [];
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title="Keyboard Shortcuts"
        className="h-8 w-8  p-0 center border border-[#1D3237] rounded"
      >
        <Keyboard className="size-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[50] center pl-[20vw] bg-black/40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0B1315] w-full max-w-md rounded-lg shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 p-5 pb-0 ">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Keyboard /> Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl"
              >
                <X />
              </button>
            </div>

            {/* Shortcuts */}
            <div className="space-y-5 max-h-[60vh] sideBar overflow-y-auto  p-5">
              {Object.entries(categorized).map(
                ([category, categoryShortcuts]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {category}
                    </h3>
                    <div className="space-y-2 ml-4">
                      {categoryShortcuts.map((shortcut, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {shortcut.action}
                          </span>
                          <div className="flex gap-1">
                            {shortcut.keys.map((key, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-mono bg-gray-200 text-gray-800 rounded dark:bg-gray-800 dark:text-gray-100"
                              >
                                {key}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

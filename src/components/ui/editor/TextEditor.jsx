/* eslint-disable react/prop-types */
import { useState, useRef, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Palette,
  Image as ImageIcon,
  Undo,
  Redo,
  Copy,
  Clipboard,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Type,
  Strikethrough,
  Code,
  Minus,
  FileText,
  MoveLeft,
  MoveUp,
  MoveRight,
} from "lucide-react";
import { cn } from "../../../utils/utils";
import Button from "../button/Button";
import KeyboardShortcuts from "./KeyboardShortcuts";
// import KeyboardShortcuts from "./KeyboardShortcuts";

// Enhanced Image extension with full-width, resizing and alignment capabilities
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
      alignment: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-alignment"),
        renderHTML: (attributes) => {
          if (!attributes.alignment) return {};
          return { "data-alignment": attributes.alignment };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const container = document.createElement("div");
      container.className = "image-wrapper group my-4";
      container.setAttribute(
        "data-alignment",
        node.attrs.alignment || "center"
      );

      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container relative";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.className = "block rounded-lg shadow-lg";

      // Set full width by default, or use stored width
      if (node.attrs.width) {
        img.style.width = node.attrs.width + "px";
      } else {
        img.style.width = "100%";
      }
      img.style.height = "auto";

      // Helper function to get icon paths
      const getIconPath = (alignment) => {
        switch (alignment) {
          case "left":
            return "m12 19-7-7 7-7m7 145";
          case "center":
            return "m7 11 5-5 5 5m-5-5v12";
          case "right":
            return "m12 5 7 7-7 7m5 19h14";
          default:
            return "";
        }
      };

      // Alignment controls
      const alignmentControls = document.createElement("div");
      alignmentControls.className =
        "absolute top-2 left-2 bg-[#0B1315]/50 backdrop-blur rounded-lg shadow-lg p-1  group-hover:opacity-100 transition-opacity flex gap-1";

      const alignments = [
        { value: "left", icon: MoveLeft, title: "Align Left" },
        { value: "center", icon: MoveUp, title: "Align Center" },
        { value: "right", icon: MoveRight, title: "Align Right" },
      ];

      alignments.forEach(({ value, title }) => {
        const btn = document.createElement("button");
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${getIconPath(
          value
        )}"/></svg>`;
        btn.title = title;
        btn.className = cn(
          "w-8 h-8 rounded hover:bg-[#0B1315] flex items-center justify-center text-sm",
          node.attrs.alignment === value ? "bg-[#0B1315]" : ""
        );
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof getPos === "function") {
            editor.commands.updateAttributes("image", { alignment: value });
            container.setAttribute("data-alignment", value);
          }
        };
        alignmentControls.appendChild(btn);
      });

      // Resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className =
        "absolute bottom-2 right-2 w-4 h-4 bg-blue-500 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity rounded-sm";

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>`;
      deleteBtn.className =
        "absolute top-8 right-0 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center";
      deleteBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof getPos === "function") {
          const pos = getPos();
          editor.commands.deleteRange({ from: pos, to: pos + node.nodeSize });
        }
      };

      // Resize functionality
      let isResizing = false;
      let startWidth = 0;
      let startX = 0;

      resizeHandle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isResizing = true;
        startWidth = img.offsetWidth;
        startX = e.clientX;

        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", stopResize);
      });

      const handleResize = (e) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        let newWidth = startWidth + deltaX;

        // Set minimum and maximum width
        const containerWidth = container.offsetWidth;
        newWidth = Math.max(200, Math.min(containerWidth, newWidth));

        img.style.width = newWidth + "px";
      };

      const stopResize = () => {
        if (!isResizing) return;
        isResizing = false;

        if (typeof getPos === "function") {
          editor.commands.updateAttributes("image", {
            width: img.offsetWidth,
          });
        }

        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", stopResize);
      };

      imageContainer.appendChild(img);
      imageContainer.appendChild(alignmentControls);
      imageContainer.appendChild(resizeHandle);
      imageContainer.appendChild(deleteBtn);
      container.appendChild(imageContainer);

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.attrs.src !== node.attrs.src) {
            img.src = updatedNode.attrs.src;
          }
          if (updatedNode.attrs.alignment !== node.attrs.alignment) {
            container.setAttribute(
              "data-alignment",
              updatedNode.attrs.alignment
            );
          }
          if (
            updatedNode.attrs.width !== node.attrs.width &&
            updatedNode.attrs.width
          ) {
            img.style.width = updatedNode.attrs.width + "px";
          }
          return true;
        },
      };
    };
  },
});

// Enhanced FontSize and FontFamily extension
const EnhancedTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily.replace(/['"]+/g, ""),
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) {
            return {};
          }
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
      setFontFamily:
        (fontFamily) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontFamily }).run();
        },
      unsetFontFamily:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontFamily: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export default function TextEditor() {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false);
  const [isFontFamilyMenuOpen, setIsFontFamilyMenuOpen] = useState(false);
  const [activeFontSize, setActiveFontSize] = useState("16px");
  const [activeFontFamily, setActiveFontFamily] = useState("Inter");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isCodeView, setIsCodeView] = useState(false);

  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const colorMenuRef = useRef(null);
  const fontSizeMenuRef = useRef(null);
  const fontFamilyMenuRef = useRef(null);

  // Color options
  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#FF0000",
    "#FF6600",
    "#FFCC00",
    "#00FF00",
    "#0066FF",
    "#6600FF",
    "#FF00FF",
    "#00FFFF",
    "#262689",
    "#6B46C1",
    "#EC4899",
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
  ];

  // Font sizes
  const fontSizes = [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
    { value: "20px", label: "20px" },
    { value: "24px", label: "24px" },
    { value: "28px", label: "28px" },
    { value: "32px", label: "32px" },
    { value: "36px", label: "36px" },
    { value: "48px", label: "48px" },
    { value: "64px", label: "64px" },
    { value: "72px", label: "72px" },
  ];

  // Font families
  const fontFamilies = [
    {
      value: "Inter, system-ui, sans-serif",
      label: "Inter",
      preview: "The quick brown fox",
    },
    {
      value: "Poppins, system-ui, sans-serif",
      label: "Poppins",
      preview: "The quick brown fox",
    },
    {
      value: "Roboto, system-ui, sans-serif",
      label: "Roboto",
      preview: "The quick brown fox",
    },
    {
      value: "Open Sans, system-ui, sans-serif",
      label: "Open Sans",
      preview: "The quick brown fox",
    },
    {
      value: "Lato, system-ui, sans-serif",
      label: "Lato",
      preview: "The quick brown fox",
    },
  ];

  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
        },
      }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: "rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Placeholder.configure({
        placeholder: () => {
          // No placeholder text - completely empty
          return "";
        },
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      EnhancedTextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      CharacterCount,
    ],
    content: "",
    editable: true,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onCreate: ({ editor }) => {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    },
    onSelectionUpdate: ({ editor }) => {
      // Update active font size and family when selection changes
      const attrs = editor.getAttributes("textStyle");
      if (attrs.fontSize) {
        setActiveFontSize(attrs.fontSize);
      } else {
        setActiveFontSize("16px");
      }
      if (attrs.fontFamily) {
        // Extract just the font name from the full family string
        const fontName = attrs.fontFamily.split(",")[0].replace(/['"]/g, "");
        setActiveFontFamily(fontName);
      } else {
        setActiveFontFamily("Inter");
      }

      // Update undo/redo availability
      setCanUndo(editor.can().undo());
      setCanRedo(editor.can().redo());
    },
    onUpdate: ({ editor }) => {
      console.log("Editor content updated:", editor.getHTML());

      // Update undo/redo availability on content changes
      setCanUndo(editor.can().undo());
      setCanRedo(editor.can().redo());
    },
  });
  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(event.target)
      ) {
        setIsColorMenuOpen(false);
      }
      if (
        fontSizeMenuRef.current &&
        !fontSizeMenuRef.current.contains(event.target)
      ) {
        setIsFontSizeMenuOpen(false);
      }
      if (
        fontFamilyMenuRef.current &&
        !fontFamilyMenuRef.current.contains(event.target)
      ) {
        setIsFontFamilyMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle image upload with full width
  const handleImageUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result && editor) {
            editor
              .chain()
              .focus()
              .setImage({
                src: reader.result,
              })
              .run();
          }
        };
        reader.readAsDataURL(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [editor]
  );

  // Handle link operations
  const handleLinkInsert = useCallback(() => {
    if (linkUrl && editor) {
      const url = linkUrl.match(/^https?:\/\//)
        ? linkUrl
        : `https://${linkUrl}`;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setLinkUrl("");
      setIsLinkMenuOpen(false);
    }
  }, [linkUrl, editor]);

  const handleLinkRemove = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkUrl("");
      setIsLinkMenuOpen(false);
    }
  }, [editor]);

  const openLinkMenu = useCallback(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      setSelectedText(text);
      const linkMark = editor.getAttributes("link");
      if (linkMark.href) {
        setLinkUrl(linkMark.href);
      } else {
        setLinkUrl("");
      }
      setIsLinkMenuOpen(true);
    }
  }, [editor]);

  // Handle color application
  const applyColor = useCallback(
    (color) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
        setIsColorMenuOpen(false);
      }
    },
    [editor]
  );

  const applyHighlight = useCallback(
    (color) => {
      if (editor) {
        editor.chain().focus().toggleHighlight({ color }).run();
        setIsColorMenuOpen(false);
      }
    },
    [editor]
  );

  // Handle font size
  const applyFontSize = useCallback(
    (size) => {
      if (editor) {
        editor.chain().focus().setFontSize(size).run();
        setActiveFontSize(size);
        setIsFontSizeMenuOpen(false);
      }
    },
    [editor]
  );

  // Handle font family
  const applyFontFamily = useCallback(
    (fontFamily, label) => {
      if (editor) {
        editor.chain().focus().setFontFamily(fontFamily).run();
        setActiveFontFamily(label);
        setIsFontFamilyMenuOpen(false);
      }
    },
    [editor]
  );

  // Fixed copy functionality - copies all editor content
  const copyText = useCallback(async () => {
    if (editor) {
      try {
        const content = editor.getText();
        await navigator.clipboard.writeText(content);
        console.log("Content copied to clipboard");
      } catch (err) {
        console.warn("Copy failed:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = editor.getText();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    }
  }, [editor]);

  const pasteText = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && editor) {
        editor.chain().focus().insertContent(text).run();
      }
    } catch (err) {
      console.warn("Paste failed:", err);
    }
  }, [editor]);

  // Fixed code functionality - toggles between code view and preview
  const toggleCodeView = useCallback(() => {
    setIsCodeView(!isCodeView);
  }, [isCodeView]);

  // Toolbar button component
  const ToolbarButton = ({
    icon: Icon,
    onClick,
    active,
    disabled: buttonDisabled,
    title,
    children,
  }) => (
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={buttonDisabled}
      title={title}
      className={cn(
        "h-8 w-8 p-0 transition-all duration-200 text-white ",
        active && "bg-[#1a2c30] text-white hover:bg-[#132023]",
        !active && "hover:bg-[#132023] hover:text-brand-700 text-white"
      )}
      icon={false}
    >
      {Icon ? <Icon className="h-4 w-4" /> : children}
    </Button>
  );

  if (!editor) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-md  border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 text-center">
          <div className="animate-spin h-8 w-8 text-brand-500 mx-auto mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#091011] rounded-md  border border-[#142226] overflow-hidden text-editor text-white mt-5">
      {/* Toolbar */}
      <div className=" z-40 flex flex-wrap items-center gap-1 p-3 bg-[#0d171a] border-b border-[#142226]">
        {/* Undo/Redo */}
        <ToolbarButton
          icon={Undo}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        />
        <ToolbarButton
          icon={Redo}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        />
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Font Family */}
        <div className="relative" ref={fontFamilyMenuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFontFamilyMenuOpen(!isFontFamilyMenuOpen)}
            className={cn(
              "h-8 px-2 text-sm min-w-[90px]",
              isFontFamilyMenuOpen && "bg-[#1a2c30]"
            )}
            title="Font Family"
          >
            <FileText className="h-4 w-4 mr-1" />
            {activeFontFamily}
          </Button>
          {isFontFamilyMenuOpen && (
            <div className="absolute top-10 left-0 z-50 bg-[#091012] rounded-lg shadow-lg border sideBar border-[#18282b] p-2 min-w-[200px] max-h-60 overflow-y-auto">
              {fontFamilies.map((font) => (
                <button
                  key={font.value}
                  className={cn(
                    "w-full text-left px-3 py-2 mb-1 rounded text-sm hover:bg-[#132023] flex flex-col gap-1",
                    activeFontFamily === font.label &&
                      "bg-[#132023] text-brand-700"
                  )}
                  onClick={() => applyFontFamily(font.value, font.label)}
                  style={{ fontFamily: font.value }}
                >
                  <span className="font-medium">{font.label}</span>
                  <span className="text-xs text-gray-500">{font.preview}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font Size */}
        <div className="relative" ref={fontSizeMenuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
            className={cn(
              "h-8 px-2 text-sm min-w-[70px]",
              isFontSizeMenuOpen && "bg-[#1a2c30]"
            )}
            title="Font Size"
          >
            <Type className="h-4 w-4 mr-1" />
            {activeFontSize}
          </Button>
          {isFontSizeMenuOpen && (
            <div className="absolute top-10 left-0 z-50 bg-[#091012]  rounded-lg shadow-lg border border-[#18282b] sideBar p-2 min-w-[120px] max-h-60 overflow-y-auto">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={cn(
                    "w-full text-left px-3 py-3  rounded text-sm hover:bg-[#132023]",
                    activeFontSize === size.value &&
                      "bg-[#132023] text-brand-700"
                  )}
                  onClick={() => applyFontSize(size.value)}
                  style={{ fontSize: size.value }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Text Formatting */}
        <ToolbarButton
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        />
        <ToolbarButton
          icon={UnderlineIcon}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        />
        <ToolbarButton
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        />
        <ToolbarButton
          icon={Code}
          onClick={toggleCodeView}
          active={editor.isActive("code")}
          title="Code"
        />
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Color Picker */}
        <div className="relative" ref={colorMenuRef}>
          <ToolbarButton
            icon={Palette}
            onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
            title="Text Color"
          />
          {isColorMenuOpen && (
            <div className="absolute top-10 left-0 z-50 bg-[#091012] rounded-lg shadow-lg border border-[#111e21] p-3 w-64">
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-600">
                    Text Color
                  </p>
                  <button
                    className="text-xs text-blue-500 hover:text-blue-700"
                    onClick={() => editor.chain().focus().unsetColor().run()}
                  >
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {colors.map((color) => (
                    <button
                      key={`text-${color}`}
                      className={cn(
                        "w-8 h-8 rounded border-2 hover:scale-110 transition-transform",
                        editor.isActive("textStyle", { color })
                          ? "border-blue-500"
                          : "border-[#132226]"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-600">Highlight</p>
                  <button
                    className="text-xs text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      editor.chain().focus().unsetHighlight().run()
                    }
                  >
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {colors.slice(0, 12).map((color) => (
                    <button
                      key={`highlight-${color}`}
                      className={cn(
                        "w-8 h-8 rounded border-2 hover:scale-110 transition-transform",
                        editor.isActive("highlight", { color })
                          ? "border-blue-500"
                          : "border-gray-300"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => applyHighlight(color)}
                      title={`Highlight ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Alignment */}
        <ToolbarButton
          icon={AlignLeft}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        />
        <ToolbarButton
          icon={AlignCenter}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        />
        <ToolbarButton
          icon={AlignRight}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        />
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Lists */}
        <ToolbarButton
          icon={List}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        />
        <ToolbarButton
          icon={ListOrdered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        />
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Insert */}
        <ToolbarButton
          icon={ImageIcon}
          onClick={() => fileInputRef.current?.click()}
          title="Insert Image (Full Width, Resizable)"
        />
        {/* Link */}
        <div className="relative">
          <ToolbarButton
            icon={LinkIcon}
            onClick={openLinkMenu}
            active={editor.isActive("link") || isLinkMenuOpen}
            title="Insert Link"
          />
          {isLinkMenuOpen && (
            <div className="absolute top-10 right-0 z-50 bg-[#091012] rounded-lg shadow-lg border border-[#111e22] p-3 w-72">
              <div className="flex flex-col gap-2">
                {selectedText && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    Selected:{" "}
                    <span className="font-medium">{selectedText}</span>
                  </div>
                )}
                <label className="text-xs font-medium text-gray-600">URL</label>
                <div className="flex">
                  <input
                    ref={linkInputRef}
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-2 py-1.5 text-sm border bg-transparent border-[#1f363b] rounded-l focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLinkInsert();
                      }
                    }}
                  />
                  <button
                    onClick={handleLinkInsert}
                    disabled={!linkUrl}
                    className="px-3 py-1.5 bg-[#1f363b] border border-[#1f363b] text-white rounded-r hover:bg-[#2d5058] disabled:opacity-50 cursor-pointer"
                  >
                    ✓
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  {editor.isActive("link") && (
                    <button
                      onClick={handleLinkRemove}
                      className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Remove Link
                    </button>
                  )}
                  <button
                    onClick={() => setIsLinkMenuOpen(false)}
                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 ml-auto "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToolbarButton
          icon={Quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        />
        <ToolbarButton
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        />
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Copy/Paste */}
        <ToolbarButton icon={Copy} onClick={copyText} title="Copy (Ctrl+C)" />
        <ToolbarButton
          icon={Clipboard}
          onClick={pasteText}
          title="Paste (Ctrl+V)"
        />
        {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}
        <div className="h-6 mx-1 w-[1px] bg-[#2d4e58]"></div>
        {/* Help */}
        <KeyboardShortcuts />
      </div>

      {/* Editor Content */}
      <div
        className="relative cursor-text max-h-[70vh] overflow-auto sideBar"
        onClick={() => {
          if (editor && !isCodeView) {
            editor.commands.focus();
          }
        }}
      >
        {isCodeView ? (
          <div className="min-h-[500px] p-5 py-[1.50rem] ">
            <pre>
              <code>{editor.getHTML()}</code>
            </pre>
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="min-h-[500px] px-1 focus-within:outline-none"
          />
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Status Bar Footer */}
      <div className="flex justify-between items-center px-6 py-2 bg-[#0D171A] border-t border-[#142226] text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Words: {editor?.storage?.characterCount?.words() || 0}</span>
          <span>
            Characters: {editor?.storage?.characterCount?.characters() || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Reusable TinyMCE rich text editor with theme support.
 * Uses self-hosted TinyMCE (no API key required).
 */
export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start writing...",
  height = 300,
}) {
  const editorRef = useRef(null);
  const { theme } = useTheme();

  return (
    <Editor
      tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js"
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height,
        menubar: false,
        branding: false,
        promotion: false,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        content_css: theme === "dark" ? "dark" : "default",
        placeholder,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | " +
          "removeformat code",
        content_style: `
          body {
            font-family: Inter, -apple-system, sans-serif;
            font-size: 14px;
            color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"};
            background: ${theme === "dark" ? "#1a1a1a" : "#ffffff"};
            padding: 8px;
            line-height: 1.7;
          }
          a { color: ${theme === "dark" ? "#a78bfa" : "#7c3aed"}; }
          img { max-width: 100%; height: auto; border-radius: 8px; }
        `,
      }}
    />
  );
}

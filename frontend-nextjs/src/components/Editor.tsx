"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Undo2, Redo2, Bold, Italic, List, Trash2 } from "lucide-react";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "✍️ Start writing your IELTS essay here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        IELTS Writing Editor
      </h1>

      {/* Upload buttons */}
      <div className="flex gap-4 justify-center mb-4">
        <button className="flex items-center gap-2 border border-green-500 text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 transition shadow-sm">
          📋 Paste text
        </button>
        <button className="flex items-center gap-2 border border-green-500 text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 transition shadow-sm">
          ☁️ Upload document
        </button>
      </div>

      {/* Editor area */}
      <div className="flex-1 bg-gray-50 rounded-xl shadow-inner mb-4 min-h-[500px]">
        <EditorContent
          editor={editor}
          className="ProseMirror prose max-w-none w-full h-full p-4 text-gray-800 text-base leading-relaxed focus:outline-none"
        />
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center text-gray-600 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive("bold") ? "bg-green-500 text-white" : ""
            }`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive("italic") ? "bg-green-500 text-white" : ""
            }`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive("bulletList") ? "bg-green-500 text-white" : ""
            }`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Undo2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Redo2 size={16} />
          </button>
          <button
            onClick={() => editor.commands.clearContent()}
            className="p-2 rounded hover:bg-red-50 text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Word count */}
        <span className="text-sm">
          {editor.getText().trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>

      {/* Submit button */}
      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
        Submit Essay
      </button>
    </div>
  );
}

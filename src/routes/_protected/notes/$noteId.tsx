import { getNote, editNote } from "@/features/notes";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/_protected/notes/$noteId")({
  loader: ({ params }) => getNote({ data: { noteId: params.noteId } }),
  component: Page,
});

function Page() {
  const note = Route.useLoaderData();
  const titleRef = useRef(note.title);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const save = (title: string, content: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      editNote({ data: { noteId: note.id, title, content } });
    }, 500);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: (() => {
      try {
        const parsed = JSON.parse(note.content);
        return parsed.type === "doc" ? parsed : undefined;
      } catch {
        return undefined;
      }
    })(),
    onUpdate: ({ editor }) => {
      save(titleRef.current, JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div>
      <input
        defaultValue={note.title}
        onChange={(e) => {
          titleRef.current = e.target.value;
          save(titleRef.current, editor ? JSON.stringify(editor.getJSON()) : note.content);
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

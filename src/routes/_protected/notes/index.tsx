import { authClient } from "@/features/auth/client";
import { createNote, listNotes } from "@/features/notes";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_protected/notes/")({
  loader: async () => await listNotes(),
  component: Page,
});

function Page() {
  const notes = Route.useLoaderData();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      setError(error.message ?? "An error occurred while signing out.");
      return;
    }
    router.navigate({ to: "/" });
  };

  const handleCreateNote = async () => {
    const { id } = await createNote({ data: { title: "Untitled", content: "" } });
    router.navigate({ to: "/notes/$noteId", params: { noteId: id } });
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={handleCreateNote}>Create Note</button>
      {error && <p className="text-red-500">{error}</p>}
      {notes.map((note) => (
        <Link key={note.id} to="/notes/$noteId" params={{ noteId: note.id }}>
          {note.title}
        </Link>
      ))}
    </div>
  );
}

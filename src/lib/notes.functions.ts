import { createServerFn } from "@tanstack/react-start";
import { ensureSession } from "./auth.functions";
import { fetchNotes, insertNote } from "./notes.server";

export const getNotes = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();
  const result = await fetchNotes(session.user.id);
  return result;
});

export const createNote = createServerFn({ method: "POST" })
  .validator((data: { title: string; content: string }) => data)
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const result = await insertNote({
      userId: session.user.id,
      ...data,
    });
    return result;
  });

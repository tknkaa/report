import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { ensureSession } from "@/features/auth/service";
import { selectNoteById, selectNotes, insertNote, updateNote } from "./repository";
import { GetNoteSchema, CreateNoteSchema, EditNoteSchema } from "./schema";

export const getNote = createServerFn({ method: "GET" })
  .validator(v.parser(GetNoteSchema))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const note = await selectNoteById(session.user.id, data.noteId);
    if (!note) throw new Error("Note not found");
    return note;
  });

export const listNotes = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();
  return selectNotes(session.user.id);
});

export const createNote = createServerFn({ method: "POST" })
  .validator(v.parser(CreateNoteSchema))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    return insertNote({ userId: session.user.id, ...data });
  });

export const editNote = createServerFn({ method: "POST" })
  .validator(v.parser(EditNoteSchema))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    return updateNote({ userId: session.user.id, ...data });
  });

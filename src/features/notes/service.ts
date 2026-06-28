import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { ensureSession } from "@/features/auth/service";
import { selectNotes, insertNote, updateNote } from "./repository";
import { CreateNoteSchema, EditNoteSchema } from "./schema";

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

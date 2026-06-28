import * as v from "valibot";

export const GetNoteSchema = v.object({
  noteId: v.string(),
});

export const CreateNoteSchema = v.object({
  title: v.string(),
  content: v.string(),
});

export const EditNoteSchema = v.object({
  noteId: v.string(),
  title: v.string(),
  content: v.string(),
});

export type CreateNoteInput = v.InferOutput<typeof CreateNoteSchema>;
export type EditNoteInput = v.InferOutput<typeof EditNoteSchema>;

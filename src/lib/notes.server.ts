import { getDb } from "#/db";
import { notes } from "#/db/schema";
import { desc, eq } from "drizzle-orm";
import { env } from "cloudflare:workers";

export const fetchNotes = async (userId: string) => {
	const db = getDb(env);
	const result = await db
		.select()
		.from(notes)
		.where(eq(notes.userId, userId))
		.orderBy(desc(notes.createdAt));
	return result;
};

export const insertNote = async (data: {
	userId: string;
	title: string;
	content: string;
}) => {
	const db = getDb(env);
	const [note] = await db
		.insert(notes)
		.values({
			id: crypto.randomUUID(),
			...data,
		})
		.returning();
	if (!note) {
		throw new Error("Failed to insert note");
	}
	return note;
};

import { getNotes } from "#/lib/notes.functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/notes/")({
	loader: async () => await getNotes(),
	component: Page,
});

function Page() {
	const notes = Route.useLoaderData();
	return (
		<div>
			{notes.map((note) => (
				<div key={note.id}>{note.title}</div>
			))}
		</div>
	);
}

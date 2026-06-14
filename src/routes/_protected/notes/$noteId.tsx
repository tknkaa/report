import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/notes/$noteId")({
  component: Page,
});

function Page() {
  const { noteId } = Route.useParams();
  return <div>{noteId}</div>;
}

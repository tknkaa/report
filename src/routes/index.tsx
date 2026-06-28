import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getSession } from "@/features/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw redirect({ to: "/notes" });
    }
  },
  component: Page,
});

function Page() {
  return (
    <div>
      <Link to="/signin">sign in</Link>
      <Link to="/signup">sign up</Link>
    </div>
  );
}

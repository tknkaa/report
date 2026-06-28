import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { getSession } from "@/features/auth";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
    return { user: session.user };
  },
  component: () => <Outlet />,
});

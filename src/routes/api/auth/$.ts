import { createFileRoute } from "@tanstack/react-router";
import { getAuth } from "@/features/auth";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => getAuth(env).handler(request),
      POST: ({ request }) => getAuth(env).handler(request),
    },
  },
});

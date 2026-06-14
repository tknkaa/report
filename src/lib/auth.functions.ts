import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getAuth } from "./auth";
import { env } from "cloudflare:workers";

const fetchSession = async () => {
  const headers = getRequestHeaders();
  const auth = getAuth(env);
  const session = await auth.api.getSession({ headers });
  return session;
};

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await fetchSession();
  return session;
});

export const ensureSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await fetchSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
});

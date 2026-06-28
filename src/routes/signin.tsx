import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState, type SubmitEvent } from "react";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/signin")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session) {
      throw redirect({ to: "/notes" });
    }
  },
  component: Page,
});

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setError(error.message ?? "サインインに失敗しました");
      return;
    }
    router.navigate({ to: "/notes" });
  };

  return (
    <div>
      <h1>サインイン</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        <button type="submit">サインイン</button>
      </form>
    </div>
  );
}

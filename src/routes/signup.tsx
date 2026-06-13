import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { getSession } from "#/lib/auth.functions";
import { authClient } from "#/lib/auth-client";
import { useState, type SubmitEvent } from "react";

export const Route = createFileRoute("/signup")({
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
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const { error } = await authClient.signUp.email({ name, email, password });
		if (error) {
			setError(error.message ?? "サインアップに失敗しました");
			return;
		}
		router.navigate({ to: "/notes" });
	};

	return (
		<div>
			<h1>サインアップ</h1>
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="名前"
				/>
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
				<button type="submit">サインアップ</button>
			</form>
		</div>
	);
}

import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
} from "react-router-dom"
import styles from "./signin.module.css"
import auth from "../lib/auth"
import { ActionData } from "../types"

export const action = async (args: ActionFunctionArgs) => {
	const { request } = args

	const formData = await request.formData()

	const username = formData.get("username")
	const password = formData.get("password")

	const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ username, password }),
	})

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	const { token, userId } = await response.json()

	auth.signIn(token, userId)

	return redirect("/")
}

const SignIn = () => {
	const error = useActionData() as ActionData

	return (
		<div>
			<h2>Sign in to your account</h2>
			<Form method="post">
				{error && (
					<p>
						<b>Error:</b> {error.message}
					</p>
				)}
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" required />
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="text" name="password" id="password" required />
				</div>

				<div>
					<button type="submit" className={styles.button}>
						Sign In
					</button>
				</div>
			</Form>
		</div>
	)
}

export default SignIn

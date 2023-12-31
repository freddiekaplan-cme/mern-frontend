import {
	ActionFunctionArgs,
	Form,
	Link,
	redirect,
	useActionData,
} from "react-router-dom"
import { ActionData } from "../types"
import styles from "./signup.module.css"

export const action = async (args: ActionFunctionArgs) => {
	const { request } = args

	const formData = await request.formData()

	const username = formData.get("username")
	const password = formData.get("password")
	const passwordConfirmation = formData.get("password_confirmation")

	if (password !== passwordConfirmation) {
		return { message: "Passwords don't match" }
	}

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL + "/register",
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ username, password }),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	return redirect("/sign-in")
}

const SignUp = () => {
	const error = useActionData() as ActionData

	return (
		<div>
			<h2>Create a new account</h2>
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
					<input
						type="password"
						name="password"
						id="password"
						required
					/>
				</div>
				<div>
					<label htmlFor="password_confirmation">
						Password Confirmation
					</label>
					<input
						type="password"
						name="password_confirmation"
						id="password_confirmation"
						required
					/>
				</div>
				<div>
					<button type="submit">Create User</button>
				</div>
			</Form>
			<div className={styles.signIn}>Already have an account?</div>
			<Link to="/sign-in">
				<button className={styles.button}>Sign in</button>
			</Link>
		</div>
	)
}

export default SignUp

import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
} from "react-router-dom"

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
	//fångar action, undefined innan action körs
	const error = useActionData() as { message: string } | undefined

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
					<input type="text" name="password" id="password" required />
				</div>
				<div>
					<label htmlFor="password_confirmation">
						Password Confirmation
					</label>
					<input
						type="text"
						name="password_confirmation"
						id="password_confirmation"
						required
					/>
				</div>
				<div>
					<button type="submit">Create User</button>
				</div>
			</Form>
		</div>
	)
}

export default SignUp

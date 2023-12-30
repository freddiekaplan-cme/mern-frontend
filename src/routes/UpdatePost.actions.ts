import { ActionFunctionArgs, redirect } from "react-router-dom"
import auth from "../lib/auth"

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const postId = params.postId
	const formData = await request.formData()

	const updatedData = Object.fromEntries(formData.entries())

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL + "/posts/" + postId,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.getJWT()}`,
			},
			body: JSON.stringify(updatedData),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	return redirect("/posts/" + postId)
}

import { ActionFunctionArgs, redirect } from "react-router-dom"
import auth from "../lib/auth"

export const action = async (args: ActionFunctionArgs) => {
	const { postId, commentId } = args.params

	try {
		const response = await fetch(
			import.meta.env.VITE_BACKEND_URL +
				"/posts/" +
				postId +
				"/comments/" +
				commentId,
			{
				headers: {
					Authorization: "Bearer " + auth.getJWT(),
				},
				method: "DELETE",
			},
		)

		if (!response.ok) {
			const { message } = await response.json()
			throw new Error(message)
		}

		return redirect("/posts/" + postId)
	} catch (error) {
		console.error("Error deleting comment: ", error)
		throw error
	}
}

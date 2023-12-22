import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
} from "react-router-dom"
import { ActionData } from "../types"
import auth from "../lib/auth"
import style from "./createpost.module.css"

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const postData = Object.fromEntries(formData.entries())

	const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth.getJWT()}`,
		},
		body: JSON.stringify(postData),
	})

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	return redirect("/")
}

const CreatePost = () => {
	const error = useActionData() as ActionData

	return (
		<div className={style.container}>
			<h2>Create post</h2>
			<Form method="post" encType="multipart/form-data">
				{error && (
					<p>
						<b>Error:</b> {error.message}
					</p>
				)}

				<div className={style.title}>
					<label htmlFor="title">Title</label>
					<input type="text" name="title" id="title" required />
				</div>
				<div className={style.link}>
					<label htmlFor="link">Link (optional)</label>
					<input type="text" name="link" id="link" />
				</div>
				<div className={style.body}>
					<label htmlFor="body">Body (optional)</label>
					<textarea name="body" id="body" />
				</div>
				<div className={style.image}>
					<label htmlFor="image">Image (optional)</label>
					<input
						type="file"
						name="image"
						id="image"
						accept="image/*"
					/>
				</div>
				<div>
					<button type="submit">Create post</button>
				</div>
			</Form>
		</div>
	)
}

export default CreatePost

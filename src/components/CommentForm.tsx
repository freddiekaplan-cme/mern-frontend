import { ActionFunctionArgs, useFetcher } from "react-router-dom"
import auth from "../lib/auth"
import { Post } from "../types"
import { useRef } from "react"
import style from "./comentform.module.css"

export const action = async (args: ActionFunctionArgs) => {
	const { postId } = args.params
	const formData = await args.request.formData()

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL + "/posts/" + postId + "/comments",
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.getJWT(),
			},
			method: "POST",
			body: JSON.stringify({ commentBody: formData.get("body") }),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	const post = (await response.json()) as Post

	return {
		comments: post.comments,
	}
}

export const updateComment = async (args: ActionFunctionArgs) => {
	const { postId, commentId } = args.params
	const formData = await args.request.formData()

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL +
			"/posts/" +
			postId +
			"/comments/" +
			commentId,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.getJWT(),
			},
			method: "PUT",
			body: JSON.stringify({ commentBody: formData.get("body") }),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()
		return { message }
	}

	const updatedPost = (await response.json()) as Post

	return {
		comments: updatedPost.comments,
	}
}

const CommentForm = ({ postId }: { postId: string }) => {
	const fetcher = useFetcher({ key: "comment-form-" + postId })
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	if (fetcher.data && textAreaRef.current) {
		textAreaRef.current.value = ""
	}

	return (
		<div>
			<h3 className={style.title}>Leave a comment</h3>
			<fetcher.Form method="post" action={`/posts/${postId}/comments`}>
				<div>
					<textarea
						className={style.textarea}
						ref={textAreaRef}
						name="body"
						id="body"
						required
					></textarea>
				</div>
				<div>
					<button className={style.button} type="submit">
						Post a comment
					</button>
				</div>
			</fetcher.Form>
		</div>
	)
}

export default CommentForm

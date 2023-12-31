import {
	ActionFunctionArgs,
	Form,
	redirect,
	useLocation,
} from "react-router-dom"
import { Post } from "../types"
import auth from "../lib/auth"
import style from "./vote.module.css"

export const action = async (args: ActionFunctionArgs) => {
	const { postId } = args.params
	const formData = await args.request.formData()

	const vote = formData.get("vote")

	const path =
		vote === "up" ? `/posts/${postId}/upvote` : `/posts/${postId}/downvote`

	const response = await fetch(import.meta.env.VITE_BACKEND_URL + path, {
		headers: {
			Authorization: "Bearer " + auth.getJWT(),
		},
		method: "post",
	})

	if (!response.ok) {
		const { message } = await response.json()
		return { message }
	}

	return redirect(formData.get("returnTo")?.toString() || "/")
}

const VoteComponent = ({ post }: { post: Post }) => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const returnTo = location.pathname + "?" + searchParams.toString()

	return (
		<div className={style.voteContainer}>
			<Form method="post" action={`/posts/${post._id}/vote`}>
				<input type="hidden" name="from" value={returnTo}></input>
				<input type="hidden" name="vote" value="up"></input>
				<button className={style.button} type="submit">
					↑
				</button>
			</Form>
			<div className={style.score}>{post.score || 0}</div>
			<Form method="post" action={`/posts/${post._id}/vote`}>
				<input type="hidden" name="from" value={returnTo}></input>
				<input type="hidden" name="vote" value="down"></input>
				<button className={style.button} type="submit">
					↓
				</button>
			</Form>
		</div>
	)
}

export default VoteComponent

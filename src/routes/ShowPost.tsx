import {
	Link,
	LoaderFunctionArgs,
	useLoaderData,
	redirect,
} from "react-router-dom"
import { Post } from "../types"
import CommentForm from "../components/CommentForm"
import style from "./showpost.module.css"
import auth from "../lib/auth"
import { deleteComment } from "../components/CommentForm"

export const loader = async (args: LoaderFunctionArgs) => {
	const { id } = args.params

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)

	const posts = await response.json()

	return posts
}

const handleDeleteComment = async (postId: string, commentId: string) => {
	try {
		await deleteComment(postId, commentId)
	} catch (error) {
		return console.error("Error deleting comment: " + error)
	}
	return redirect(`/posts/${postId}`)
}

const ShowPost = () => {
	const post = useLoaderData() as Post

	return (
		<>
			<div className={style.container}>
				<div className={style.link}>
					<div>{post.author.userName}</div>
					<h2 className={style.title}>{post.title}</h2>
					{post.link && (
						<Link className={style.link} to={post.link}>
							{post.link}
						</Link>
					)}
					{/* {image && (
					<div>
						
					</div>
)} */}
					{post.body && (
						<div className={style.link}>
							<p>{post.body}</p>
						</div>
					)}
				</div>
			</div>
			<CommentForm postId={post._id} />
			{post.comments?.map((comment) => (
				<div key={comment._id}>
					<div className={style.commentAuthor}>
						{comment.author.userName}
					</div>
					<div>{comment.body}</div>
					{comment.author._id === auth.getUserId() && (
						<div>
							<button
								className={style.deleteButton}
								onClick={() =>
									handleDeleteComment(post._id, comment._id)
								}
							>
								Delete comment
							</button>
						</div>
					)}
				</div>
			))}
		</>
	)
}

export default ShowPost

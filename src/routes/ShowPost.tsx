import { Form, Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Post } from "../types"
import CommentForm from "../components/CommentForm"
import style from "./showpost.module.css"
import auth from "../lib/auth"
// import { useState } from "react"

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

	if (!response.ok) {
		throw new Error(`Failed to fetch post: ${response.statusText}`)
	}

	return posts
}

const ShowPost = () => {
	const post = useLoaderData() as Post
	// const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false)

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
					{post.body && (
						<div className={style.link}>
							<p>{post.body}</p>
						</div>
					)}
				</div>
			</div>
			{post.author._id === auth.getUserId() && (
				<div className={style.updateDeleteButtonContainer}>
					<div>
						{/* {showUpdateForm && */}
						<div className={style.container}>
							<h2>Update post</h2>
							<Form
								method="PUT"
								encType="multipart/form-data"
								action={`/posts/${post._id}/update-post`}
							>
								<div className={style.title}>
									<label htmlFor="title">Title</label>
									<input
										type="text"
										name="title"
										id="title"
										required
									/>
								</div>
								<div className={style.link}>
									<label htmlFor="link">
										Link (optional)
									</label>
									<input type="text" name="link" id="link" />
								</div>
								<div className={style.body}>
									<label htmlFor="body">
										Body (optional)
									</label>
									<textarea name="body" id="body" />
								</div>
								<div className={style.image}>
									<label htmlFor="image">
										Image (optional)
									</label>
									<input
										type="file"
										name="image"
										id="image"
										accept="image/*"
									/>
								</div>
								<div>
									<button type="submit">Update post</button>
								</div>
							</Form>
						</div>
					</div>

					<div>
						{/* <Form
						method="put"
						action={`/posts/${post._id}/update-form`}
					>
						<button className={style.commentButton}>
							Update Post
						</button>
					</Form> */}
						{/* <Link to={`/posts/${post._id}/update-form`}>
						<button className={style.commentButton}>
							Update Post
						</button>
					</Link> */}
						<Form
							method="delete"
							action={`/posts/${post._id}/delete-post`}
						>
							<button className={style.commentButton}>
								Delete Post
							</button>
						</Form>
					</div>
				</div>
			)}
			<CommentForm postId={post._id} />
			{post.comments?.map((comment) => (
				<div key={comment._id}>
					<div className={style.commentAuthor}>
						{comment.author.userName}
					</div>
					<div>{comment.body}</div>
					{comment.author._id === auth.getUserId() && (
						<div>
							<Form
								method="delete"
								action={`/posts/${post._id}/comments/${comment._id}/delete-comment`}
							>
								<button className={style.commentButton}>
									Delete
								</button>
							</Form>
						</div>
					)}
				</div>
			))}
		</>
	)
}

export default ShowPost

import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Post } from "../types"

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

const ShowPost = () => {
	const post = useLoaderData() as Post

	return (
		<>
			<div className="">
				<div className="">
					{post.link ? (
						<Link to={post.link}>
							<h2>
								{post.title}
								<span className="">({post.link})</span>
							</h2>
						</Link>
					) : (
						<h2>{post.title}</h2>
					)}
					<p>by {post.author.userName}</p>
					{post.body && (
						<div className="">
							<p>{post.body}</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default ShowPost

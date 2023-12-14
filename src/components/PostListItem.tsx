import { Link } from "react-router-dom"
import { Post } from "../types"

const PostListItem = ({ post }: { post: Post }) => {
	return (
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
					<Link to={`/posts/${post._id}`}>
						<h2>{post.title}</h2>
					</Link>
				)}
				<p>by {post.author.userName}</p>
				{post.link && (
					<span>
						<Link to={`/posts/${post._id}`}>Show post</Link>
					</span>
				)}
			</div>
		</div>
	)
}

export default PostListItem

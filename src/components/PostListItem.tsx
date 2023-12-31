import { Link } from "react-router-dom"
import { Post } from "../types"
import VoteComponent from "./Vote"
import style from "./postlistitem.module.css"

const PostListItem = ({ post }: { post: Post }) => {
	return (
		<div className={style.page}>
			<div className={style.container}>
				<VoteComponent post={post} />
				<div>
					<Link to={`/posts/${post._id}`} className={style.noStyle}>
						<h2>{post.title}</h2>
					</Link>

					{post.link && (
						<span>
							<Link to={post.link}>{post.link}</Link>
						</span>
					)}
					<p>by {post.author.userName}</p>
				</div>
			</div>
		</div>
	)
}

export default PostListItem

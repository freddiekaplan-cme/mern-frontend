import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import auth from "./lib/auth.ts"
import RequireAuth from "./components/requireAuth.tsx"
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import ShowPost, { loader as showPostLoader } from "./routes/ShowPost.tsx"
import SignUp, { action as signUpAction } from "./routes/SignUp.tsx"
import SignIn, { action as signInAction } from "./routes/SignIn.tsx"
import Index, { loader as indexLoader } from "./routes/RoutesIndex.tsx"
import CreatePost from "./routes/CreatePost.tsx"
import { action as createPostAction } from "./routes/CreatePost.actions.ts"
import { action as deletePostAction } from "./routes/DeletePost.actions.ts"
import { action as createCommentAction } from "./components/CommentForm.tsx"
import { action as deleteCommentAction } from "./routes/DeleteComment.actions.ts"
import { action as voteAction } from "./components/Vote.tsx"
import "./index.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				loader: indexLoader,
				element: <Index />,
			},
			{
				path: "/posts/:id",
				loader: showPostLoader,
				element: <ShowPost />,
			},
			{
				path: "sign-in",
				action: signInAction,
				element: <SignIn />,
			},
			{
				path: "sign-up",
				action: signUpAction,
				element: <SignUp />,
			},
			{
				path: "sign-out",
				action: () => {
					auth.signOut()
					return redirect("/")
				},
			},
			{
				element: <RequireAuth />,
				children: [
					{
						path: "create-post",
						action: createPostAction,
						element: <CreatePost />,
					},
					{
						path: "/posts/:postId/delete-post",
						action: deletePostAction,
					},
					{
						path: "/posts/:postId/comments",
						action: createCommentAction,
					},
					{
						path: "/posts/:postId/comments/:commentId/delete-comment",
						action: deleteCommentAction,
					},
					{
						path: "/posts/:postId/vote",
						action: voteAction,
					},
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)

import { Link, useFetcher } from "react-router-dom"
import style from "./Header.module.css"
import auth from "../../lib/auth"

const Header = () => {
	const isAuthenticated = auth.isSignedIn()
	const fetcher = useFetcher()

	return (
		<div className={style.header}>
			<h1>Freddit</h1>
			<div className={style.headerActions}>
				{isAuthenticated ? (
					<>
						<div className={style.buttons}>
							<Link to="/create-post">
								<button>Post</button>
							</Link>
							<fetcher.Form method="post" action="/sign-out">
								<button type="submit">Sign Out</button>
							</fetcher.Form>
						</div>
					</>
				) : (
					<>
						<Link to="/sign-up">
							<button>Sign up</button>
						</Link>
						<Link to="/sign-in">
							<button>Sign in</button>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default Header

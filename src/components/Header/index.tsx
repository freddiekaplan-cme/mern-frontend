import { Link, useFetcher } from "react-router-dom"
import style from "./Header.module.css"
import auth from "../../lib/auth"
import logopic from "../../assets/freddie_small.png"

const Header = () => {
	const isAuthenticated = auth.isSignedIn()
	const fetcher = useFetcher()

	return (
		<div className={style.header}>
			<div className={style.logoTitleContainer}>
				<Link to="/" className={style.title}>
					<div className={style.logo}>
						<img src={logopic} className={style.img} />
					</div>
				</Link>
				<Link to="/" className={style.title}>
					<h1>freddit</h1>
				</Link>
			</div>

			<div className={style.headerActions}>
				{isAuthenticated ? (
					<>
						<div className={style.buttons}>
							<Link to="/create-post">
								<button className={style.button}>Post</button>
							</Link>
							<fetcher.Form method="post" action="/sign-out">
								<button className={style.button} type="submit">
									Sign Out
								</button>
							</fetcher.Form>
						</div>
					</>
				) : (
					<>
						<div className={style.buttons}>
							<Link to="/sign-up">
								<button className={style.button}>
									Sign up
								</button>
							</Link>
							<Link to="/sign-in">
								<button className={style.button}>
									Sign in
								</button>
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Header

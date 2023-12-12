import { Link } from "react-router-dom"
import style from "./Header.module.css"

const Header = () => (
	<div className={style.header}>
		<h1>Changedit</h1>
		<div className={style.headerActions}>
			<Link to="/sign-up">
				<button>Sign up</button>
			</Link>
			<Link to="/sign-in">
				<button>Sign in</button>
			</Link>
		</div>
	</div>
)

export default Header

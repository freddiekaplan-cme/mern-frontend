import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import style from "./app.module.css"

function App() {
	return (
		<>
			<Header />
			<div className={style.appContainer}>
				<Outlet />
			</div>
		</>
	)
}

export default App

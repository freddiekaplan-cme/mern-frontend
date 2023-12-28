const signIn = (jwt: string, userId: string) => {
	localStorage.setItem("jwt", jwt)
	localStorage.setItem("userId", userId)
}

// !! dubbel negation returnerar boolean
const isSignedIn = () => !!localStorage.getItem("jwt")

const getJWT = () => localStorage.getItem("jwt")
const getUserId = () => localStorage.getItem("userId")

const signOut = () => localStorage.clear()

export default {
	signIn,
	signOut,
	isSignedIn,
	getJWT,
	getUserId,
}

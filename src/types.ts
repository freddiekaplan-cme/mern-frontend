export type ActionData = { message: string } | undefined

export type Post = {
	_id: string
	title: string
	link?: string
	body?: string
	author: {
		_id: string
		userName: string
	}
}

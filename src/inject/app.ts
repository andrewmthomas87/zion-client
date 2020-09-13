import { action, computed, observable } from 'mobx'
import { singleton } from 'tsyringe'
import config from '~config'

interface IUser {
	id: number
	username: string
}

type AuthState = 'pending' | 'signed_out' | 'signed_in'

interface IApp {
	$authState: AuthState

	init(): void
}

@singleton()
class App implements IApp {
	@observable private _$user?: IUser | null

	@computed public get $authState(): AuthState {
		if (this._$user === undefined) {
			return 'pending'
		} else if (this._$user === null) {
			return 'signed_out'
		} else {
			return 'signed_in'
		}
	}

	@action
	public init() {
		const token = localStorage.getItem(config.auth.tokenKey)
		if (!token) {
			this._$user = null
			return
		}

		setTimeout(
			action(() => (this._$user = { id: 1, username: 'abc' })),
			1000
		)
	}
}

export { IApp, App }

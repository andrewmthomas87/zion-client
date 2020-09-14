import { action, computed, observable, when } from 'mobx'
import { inject, singleton } from 'tsyringe'
import config from '~config'
import { IRouter } from './router'

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
	private _router: IRouter

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

	public constructor(@inject('router') router: IRouter) {
		this._router = router
	}

	@action
	public init() {
		this._router.init()
		when(
			() => this.$authState === 'signed_out',
			() => {
				const disposers = [
					this._router.register('sign_in', '/sign-in/:*:'),
					this._router.register('redirect_sign_in', '/'),
					when(
						() => !!this._router.$routes.get('redirect_sign_in'),
						() => this._router.navigate('sign_in')
					),
				]
				this._router.refresh()
				when(
					() => this.$authState !== 'signed_out',
					() => disposers.forEach((disposer) => disposer())
				)
			}
		)
		when(
			() => this.$authState === 'signed_in',
			() => {
				const disposers = [
					this._router.register('home', '/home/:*:'),
					this._router.register('redirect_home', '/'),
					when(
						() => !!this._router.$routes.get('redirect_home'),
						() => this._router.navigate('home')
					),
				]
				this._router.refresh()
				when(
					() => this.$authState !== 'signed_in',
					() => disposers.forEach((disposer) => disposer())
				)
			}
		)

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

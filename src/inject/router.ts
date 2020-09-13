import { action, observable } from 'mobx'
import Navigo from 'navigo'
import { inject, singleton } from 'tsyringe'
import { IApp } from './app'

type Route = 'initial' | 'not_found' | 'sign_in' | 'home'

interface IRouter {
	$route: Route

	init(): void
	navigate(path: string, absolute?: boolean): void
}

@singleton()
class Router implements IRouter {
	private _app: IApp
	private _navigo: Navigo = new Navigo()

	@observable public $route: Route = 'initial'

	public constructor(@inject('app') app: IApp) {
		this._app = app
	}

	public init() {
		this._navigo.notFound(() => action(() => (this.$route = 'not_found')))
		this._navigo
			.on('/', () => this.navigate(this._app.$authState === 'signed_in' ? '/home' : '/sign-in', true))
			.on(
				'/sign-in*',
				action(() => {
					if (this._app.$authState === 'signed_out') {
						this.$route = 'sign_in'
					} else {
						this.navigate('/', true)
					}
				})
			)
			.on(
				'/home*',
				action(() => {
					if (this._app.$authState === 'signed_in') {
						this.$route = 'home'
					} else {
						this.navigate('/', true)
					}
				})
			)
			.resolve()
	}

	public navigate(path: string, absolute?: boolean): void {
		this._navigo.navigate(path, absolute)
	}
}

export { IRouter, Router }

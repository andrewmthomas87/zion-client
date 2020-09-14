import crossroads from 'crossroads'
import { action, autorun, observable } from 'mobx'
import { singleton } from 'tsyringe'

interface CrossroadsRoute {
	interpolate(replacements: any): string
}

interface IRouter {
	$pathname: string
	$routes: Map<string, boolean>

	init(): void
	refresh(): void
	register(name: string, pattern: string): () => void
	navigate(name: string, replacements?: { [propname: string]: any }): void
	replace(name: string, replacements?: { [propname: string]: any }): void
}

@singleton()
class Router implements IRouter {
	private _routes: Map<string, CrossroadsRoute> = new Map()

	@observable public $pathname: string = ''
	@observable public $routes: Map<string, boolean> = new Map()

	@action
	public init() {
		this.$pathname = window.location.pathname
		window.addEventListener(
			'popstate',
			action(() => (this.$pathname = window.location.pathname))
		)
		crossroads.greedy = true
		autorun(() => crossroads.parse(this.$pathname))
	}

	public refresh() {
		crossroads.resetState()
		crossroads.parse(this.$pathname)
	}

	public register(name: string, pattern: string): () => void {
		const route = crossroads.addRoute(pattern)
		route.matched.add(action(() => this.$routes.set(name, true)))
		route.switched.add(action(() => this.$routes.set(name, false)))
		this._routes.set(name, route)
		return action(() => {
			route.dispose()
			this.$routes.delete(name)
			this._routes.delete(name)
		})
	}

	@action
	public navigate(name: string, replacements: { [propname: string]: any } = {}) {
		const route = this._routes.get(name)
		if (!route) {
			throw new Error('invalid route name')
		}
		window.history.pushState(null, '', route.interpolate(replacements))
		this.$pathname = window.location.pathname
	}

	public replace(name: string, replacements: { [propname: string]: any } = {}) {
		const route = this._routes.get(name)
		if (!route) {
			throw new Error('invalid route name')
		}
		window.history.replaceState(null, '', route.interpolate(replacements))
		this.$pathname = window.location.pathname
	}
}

export { IRouter, Router }

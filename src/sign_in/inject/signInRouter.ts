import { inject, singleton } from 'tsyringe'
import { IRouter } from '~inject/router'

interface ISignInRouter {
	register(): () => void
}

@singleton()
class SignInRouter implements ISignInRouter {
	private _router: IRouter

	public constructor(@inject('router') router: IRouter) {
		this._router = router
	}

	public register(): () => void {
		const disposers = [
			this._router.register('sign_in.sign_in', '/sign-in'),
			this._router.register('sign_in.sign_up', '/sign-in/sign-up'),
		]
		this._router.refresh()
		return () => disposers.forEach((disposer) => disposer())
	}
}

export { ISignInRouter, SignInRouter }

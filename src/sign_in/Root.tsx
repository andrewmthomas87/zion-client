import { observer } from 'mobx-react'
import React from 'react'
import { IRouter } from '~inject/router'
import signInContainer from './inject/container'
import { ISignInRouter } from './inject/signInRouter'

const Root = observer(() => {
	const router = signInContainer.resolve<IRouter>('router')
	const signInRouter = signInContainer.resolve<ISignInRouter>('sign_in.router')

	React.useEffect(() => signInRouter.register(), [signInRouter])

	return (
		<>
			{router.$routes.get('sign_in.sign_in') && <h1>sign in</h1>}
			{router.$routes.get('sign_in.sign_up') && <h1>sign up</h1>}
		</>
	)
})

export default Root

import { observer } from 'mobx-react'
import React from 'react'
import { IRouter } from '~inject/router'
import signInContainer from '~sign_in/inject/container'
import { ISignInRouter } from '~sign_in/inject/signInRouter'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Root = observer(() => {
	const router = signInContainer.resolve<IRouter>('router')
	const signInRouter = signInContainer.resolve<ISignInRouter>('sign_in.router')

	React.useEffect(() => signInRouter.register(), [signInRouter])

	return (
		<>
			{router.$routes.get('sign_in.sign_in') && <SignIn />}
			{router.$routes.get('sign_in.sign_up') && <SignUp />}
		</>
	)
})

export default Root

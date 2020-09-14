import { CircularProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { observer } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { IApp } from '~inject/app'
import '~inject/container'
import { IRouter } from '~inject/router'

const HomeRoot = React.lazy(() => import('~home/Root'))
const SignInRoot = React.lazy(() => import('~sign_in/Root'))

const App = observer(() => {
	const app = container.resolve<IApp>('app')
	const router = container.resolve<IRouter>('router')

	React.useEffect(() => app.init(), [app])

	return (
		<React.Suspense fallback={<CircularProgress />}>
			{router.$routes.get('sign_in') && <SignInRoot />}
			{router.$routes.get('home') && <HomeRoot />}
		</React.Suspense>
	)
})

render(
	<>
		<CssBaseline />
		<App />
	</>,
	document.getElementById('app')
)

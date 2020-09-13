import CssBaseline from '@material-ui/core/CssBaseline'
import { when } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'
import 'reflect-metadata'
import { container } from 'tsyringe'
import HomeRoot from '~home/HomeRoot'
import { IApp } from '~inject/app'
import '~inject/container'
import { IRouter } from '~inject/router'
import SignInRoot from '~sign_in/SignInRoot'

const app = container.resolve<IApp>('app')
app.init()

const router = container.resolve<IRouter>('router')
when(
	() => app.$authState !== 'pending',
	() => router.init()
)

const App = observer(() => {
	switch (router.$route) {
		case 'initial':
			return null
		case 'not_found':
			return <h1>not found</h1>
		case 'sign_in':
			return <SignInRoot />
		case 'home':
			return <HomeRoot />
	}
})

render(
	<>
		<CssBaseline />
		<App />
	</>,
	document.getElementById('app')
)

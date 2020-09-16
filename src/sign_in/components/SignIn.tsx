import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined } from '@material-ui/icons'
import React from 'react'
import { IRouter } from '~inject/router'
import signInContainer from '~sign_in/inject/container'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const SignIn = () => {
	const router = signInContainer.resolve<IRouter>('router')

	const classes = useStyles()

	const usernameRef = React.useRef<HTMLInputElement>()
	const passwordRef = React.useRef<HTMLInputElement>()

	const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!(usernameRef.current && passwordRef.current)) {
			return
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSignIn}>
					<TextField
						ref={usernameRef}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						name="username"
						label="Username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						ref={passwordRef}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign in
					</Button>
					<Box textAlign="center">
						<Link variant="body2" onClick={() => router.navigate('sign_in.sign_up')}>
							Sign up
						</Link>
					</Box>
				</form>
			</div>
		</Container>
	)
}

export default SignIn

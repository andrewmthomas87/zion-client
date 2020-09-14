import { container } from 'tsyringe'
import { ISignInRouter, SignInRouter } from './signInRouter'

const signInContainer = container.createChildContainer()
signInContainer.registerSingleton<ISignInRouter>('sign_in.router', SignInRouter)

export default signInContainer

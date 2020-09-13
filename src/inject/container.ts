import { container } from 'tsyringe'
import { App, IApp } from './app'
import { IRouter, Router } from './router'

container.registerSingleton<IApp>('app', App)
container.registerSingleton<IRouter>('router', Router)

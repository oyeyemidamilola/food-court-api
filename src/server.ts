import 'reflect-metadata';
import path from 'path';
import { Application as ExpressApplication } from 'express';
import http, { Server } from 'http';
import { RoutingControllersOptions, createExpressServer } from 'routing-controllers';
import { configuration } from '@infrastructure/configurations';

export class Application {

    readonly app: ExpressApplication
    readonly server: Server

    constructor(){
        const options: RoutingControllersOptions = {
			cors: true,
			controllers: [path.join(__dirname, '/api/controllers/*.ts')],
			defaultErrorHandler: false,
			// middlewares: [GlobalErrorHandler],
			// authorizationChecker: async (action: Action, roles: any[]) => {
			// 	let scopes = action.request['scope'] as string[];
			// 	return roles.some(r => scopes.includes(r));
			// },
		};
		this.app = createExpressServer(options);


        this.server = http.createServer(this.app);
		this.server.listen(configuration.port, () =>
			console.log(
				`Foodcourt API running at http://${configuration.host}:${configuration.port}`
			)
		);
    }
}

new Application()
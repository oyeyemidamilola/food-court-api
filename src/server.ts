import 'reflect-metadata';
import path from 'path';
import knex from 'knex';

import { Application as ExpressApplication } from 'express';
import http, { Server } from 'http';
import { RoutingControllersOptions, createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers';
import { Model } from 'objection';
import { mediatorSettings } from 'mediatr-ts';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

const { defaultMetadataStorage } = require('class-transformer/cjs/storage');


import config from '@infrastructure/configurations/knexfile';
import { configuration } from '@infrastructure/configurations';
import Container from 'typedi';
import { IocResolver } from './infrastructure';
import { GlobalErrorHandler, LoggerHandler } from '@api/middlewares';



export class Application {

    readonly app: ExpressApplication
    readonly server: Server

    constructor(){
        const options: RoutingControllersOptions = {
			cors: true,
			controllers: [path.join(__dirname, '/api/controllers/*.ts')],
			defaultErrorHandler: false,
			middlewares: [GlobalErrorHandler, LoggerHandler],
			// authorizationChecker: async (action: Action, roles: any[]) => {
			// 	let scopes = action.request['scope'] as string[];
			// 	return roles.some(r => scopes.includes(r));
			// },
		};
		
		this.configureDb()
		this.configureServices()
		this.app = createExpressServer(options);
		this.configureSwagger(this.app, options)
        this.server = http.createServer(this.app);
		this.server.listen(configuration.port, () =>
			console.log(
				`Foodcourt API running at http://${configuration.host}:${configuration.port}`
			)
		);
    }

	configureDb(){
		const database = knex(config[configuration.environment])
		Model.knex(database)
	}

	configureServices() {
		useContainer(Container);
		mediatorSettings.resolver = new IocResolver();
	}

	configureSwagger(
		app: ExpressApplication,
		options: RoutingControllersOptions
	) {
		// Parse class-validator classes into JSON Schema:
		const schemas = validationMetadatasToSchemas({
			classTransformerMetadataStorage: defaultMetadataStorage,
			refPointerPrefix: '#/components/schemas/',
		}) as any;

		// Parse routing-controllers classes into OpenAPI spec:
		const storage = getMetadataArgsStorage();
		const spec = routingControllersToSpec(storage, options, {
			components: {
				schemas,
				securitySchemes: {
					bearerAuth: {
						scheme: 'bearer',
						type: 'http',
						bearerFormat: 'JWT',
					}
				},
			},
			info: {
				title: 'FoodCourt API',
				version: '1.0.0',
			},
		});
		app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
	}
}

new Application()
import { Response } from 'express';
import {
	Middleware,
	ExpressErrorMiddlewareInterface,
	UnauthorizedError,
	NotFoundError,
} from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
	error(error: any, _request: any, response: any, next: (err: any) => any) {
		const expressResponse = response as Response;

		if (error instanceof UnauthorizedError) {
			return expressResponse.status(401).send(error.message);
		}

		if (error.message.includes('Access is denied for request')) {
			return expressResponse.status(403).send('Access denied');
		}

		if(error instanceof NotFoundError){
			return expressResponse.status(404).send(error)
		}

		if (error.httpCode === 400) {
			return expressResponse.status(400).send(error);
		}

		if (error instanceof Error) {
			console.log(error)
			return expressResponse.sendStatus(500);
		}
	}
}
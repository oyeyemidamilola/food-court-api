
import { logger } from '@infrastructure/logger';
import { Request } from 'express';
import {
    Middleware,
    ExpressMiddlewareInterface,
} from 'routing-controllers';
import { Service } from 'typedi';


@Service()
@Middleware({ type: 'before' })
export class LoggerHandler implements ExpressMiddlewareInterface {
    use(request: any, _response: any, next: (err?: any) => any) {

        let expressReq = request as Request
        logger.log('info', `${expressReq.method} ${expressReq.url} ${expressReq.body ?? ''}`)
        next()
    }
}
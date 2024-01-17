import { Request, Response } from 'express';
import {
    Middleware,
    ExpressMiddlewareInterface,
} from 'routing-controllers';
import { Service } from 'typedi';
import { JwtPayload, decode } from 'jsonwebtoken';


@Service()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {

        let expressReq = request as Request
        let expressResponse = response as Response
        let token = expressReq?.headers?.authorization?.split(' ')[1]

        if(!token) return expressResponse.status(401).send("Unauthorized")

        let decoded = decode(token!) as JwtPayload
        let dateNow = new Date()
        console.log(decoded,new Date(decoded.exp!), new Date(dateNow.getTime()))
        if(decoded.exp! < dateNow.getTime()) return expressResponse.status(401).send("Token expired")
        next()
    }
}
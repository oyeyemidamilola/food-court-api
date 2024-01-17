import * as bcrypt from 'bcrypt'
import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { NotFoundError, UnauthorizedError } from "routing-controllers";
import { Service } from "typedi";
import { sign }from 'jsonwebtoken'

import { ResponseInterface } from "@application/common";
import { User } from "@domain/model/user";
import { configuration } from '@infrastructure/configurations';

export class AuthenticateUserCommand implements IRequest<AuthenticateUserResponse> {

    readonly email: string
    readonly password: string
    constructor(request:{
        email: string
        password: string
    }){
        this.email = request.email
        this.password = request.password
    }
}

export class AuthenticateUserResponse implements ResponseInterface<{ accessToken: string }> {

    status: boolean;
    data?: { accessToken: string; } | undefined;
    error?: { message: string; } | undefined;
}

@requestHandler(AuthenticateUserCommand)
@Service('AuthenticateUserCommand')
export class AuthenticateUserCommandHandler implements IRequestHandler<AuthenticateUserCommand, AuthenticateUserResponse>{
    
    
    async handle(value: AuthenticateUserCommand): Promise<AuthenticateUserResponse> {

        let user = (await User.query()
                             .where('email', value.email)).pop()

        if(!user) throw new NotFoundError(`user with ${value.email} not registered`)
        if(!bcrypt.compareSync(value.password, user.hashedPassword)) throw new UnauthorizedError('password not correct')

        let token = sign({ userId: user.id, exp: ((new Date()).getTime() + 3600 * 25) }, configuration.secret)
        return {
            status: true,
            data: { accessToken: token }
        }
    }
}
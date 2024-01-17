
import { Service } from 'typedi';
import { IMediator } from 'mediatr-ts';

import {
	Body,
	JsonController,
	Post,
} from 'routing-controllers';

import { MediatorInstance } from '@infrastructure/index';
import { UserDTO } from '@application/usecases/users/dtos';
import { AuthenticateUserCommand, AuthenticateUserResponse } from '@application/usecases/users';

@JsonController()
@Service()
// @OpenAPI({ security: [{ bearerAuth: [], ApiKeyAuth: [] }] })
export class UserController {

    constructor(
		@MediatorInstance()
		private readonly mediator: IMediator
	) {}
    
	@Post('/authenticate')
	async authenticateUser(@Body() request: UserDTO) {
		return this.mediator.send<AuthenticateUserResponse>(new AuthenticateUserCommand({ ...request }))
	}
}

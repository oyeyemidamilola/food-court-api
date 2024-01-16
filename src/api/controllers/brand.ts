
import { Service } from 'typedi';

import {
	Body,
	JsonController,
	Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { IMediator } from 'mediatr-ts';

import { MediatorInstance } from '@infrastructure/index';
import { CreateBrandDTO, CreateBrandRequest, CreateBrandResponse } from '@application/usecases/brands';


@JsonController()
@Service()
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class BrandController {

    constructor(
		@MediatorInstance()
		private readonly mediator: IMediator
	) {}

	@Post('/brand')
	// @UseBefore(AuthenticateClientMiddleware)
	// @Authorized(['payment:read'])
	async createBrand(@Body() request: CreateBrandDTO){
        let response = await this.mediator.send<CreateBrandResponse>(new CreateBrandRequest({...request }))
		return response;
	}
}
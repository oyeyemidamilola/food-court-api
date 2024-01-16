
import { Service } from 'typedi';

import {
	Body,
	Delete,
	Get,
	JsonController,
	Param,
	Post,
	Put,
	QueryParam,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { IMediator } from 'mediatr-ts';

import { MediatorInstance } from '@infrastructure/index';
import { CreateBrandDTO, CreateBrandCommand, CreateBrandResponse, GetBrandByIdResponse, GetBrandByIdQuery, UpdateBrandDTO, UpdateBrandResponse, UpdateBrandCommand, DeleteBrandResponse, DeleteBrandCommand, GetBrandsResponse, GetBrandsQuery } from '@application/usecases/brands';


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
        let response = await this.mediator.send<CreateBrandResponse>(new CreateBrandCommand({...request }))
		return response;
	}

	@Get('/brand/:id')
	async getBrandById(@Param('id') id: string){
		let reponse = await this.mediator.send<GetBrandByIdResponse>(new GetBrandByIdQuery({ brandId: id }))
		return reponse
	}

	@Get('/brand')
	async getBrands(
		@QueryParam('take') take?: number,
		@QueryParam('skip') skip?: number,
		@QueryParam('direction') direction?: 'asc' | 'desc' 
	){
		let reponse = await this.mediator.send<GetBrandsResponse>(new GetBrandsQuery({ take, skip, direction }))
		return reponse
	}


	@Put('/brand/:id')
	async updateBrand(@Param('id') id: string, @Body() request: UpdateBrandDTO){
		let reponse = await this.mediator.send<UpdateBrandResponse>(new UpdateBrandCommand({ id, ...request }))
		return reponse
	}

	@Delete('/brand/:id')
	async deleteBrand(@Param('id') id: string){
		let reponse = await this.mediator.send<DeleteBrandResponse>(new DeleteBrandCommand({ id }))
		return reponse
	}
}
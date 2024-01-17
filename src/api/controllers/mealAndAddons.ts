
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
import { AddonDTO, CreateMealAddonsCommand, CreateMealAddonsDTO, CreateMealAddonsResponse, CreateMealCommand, CreateMealDTO, CreateMealResponse, DeleteMealCommand, DeleteMealResponse, GetMealAddonsQuery, GetMealAddonsResponse, GetMealByIdQuery, GetMealByIdResponse, GetMealsQuery, UpdateMealAddonCommand, UpdateMealAddonResponse, UpdateMealCommand, UpdateMealDTO, UpdateMealResponse } from '@application/usecases/meals';
import { request } from 'express';



@JsonController()
@Service()
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class MealAndAddonsController {

    constructor(
		@MediatorInstance()
		private readonly mediator: IMediator
	) {}

	@Post('/meal')
	// @UseBefore(AuthenticateClientMiddleware)
	// @Authorized(['payment:read'])
	async createMeal(@Body() request: CreateMealDTO){
        let response = await this.mediator.send<CreateMealResponse>(new CreateMealCommand({...request }))
		return response;
	}

	@Get('/meal/:id')
	async getMealById(@Param('id') id: string, @QueryParam('isActive', { required: false }) isActive?: boolean){
		let reponse = await this.mediator.send<GetMealByIdResponse>(new GetMealByIdQuery({ mealId: id }))
		return reponse
	}

	@Get('/meal')
	async getMeals(
		@QueryParam('take') take?: number,
		@QueryParam('skip') skip?: number,
		@QueryParam('direction') direction?: 'asc' | 'desc' ,
		@QueryParam('isActive', { required: false }) isActive?: boolean
	){
		let reponse = await this.mediator.send<GetMealByIdResponse>(new GetMealsQuery({ take, skip, direction }))
		return reponse
	}


	@Put('/meal/:id')
	async updateMeal(@Param('id') id: string, @Body() request: UpdateMealDTO){
		let reponse = await this.mediator.send<UpdateMealResponse>(new UpdateMealCommand({ id, ...request }))
		return reponse
	}

	@Delete('/meal/:id')
	async deleteMeal(@Param('id') id: string){
		let reponse = await this.mediator.send<DeleteMealResponse>(new DeleteMealCommand({ id }))
		return reponse
	}

	@Post('/meal/:id/addons')
	async createdMealAddons(@Param('id') mealId: string, @Body() request: CreateMealAddonsDTO){
		let response = await this.mediator.send<CreateMealAddonsResponse>(new CreateMealAddonsCommand({ mealId, addOns: request.addons }))
		return response
	}

	@Get('/meal/:id/addons')
	async getMeadAddons(@Param('id') mealId: string, @QueryParam('isActive', { required: false }) isActive?: boolean){
		let response = await this.mediator.send<GetMealAddonsResponse>(new GetMealAddonsQuery({ mealId, isActive }))
		return response
	}

	@Put('/meal/:id/addons/:addOnId')
	async updateMealAddon(@Param('id') mealId: string, @Param('addOnId') addOnId: string, @Body() request: AddonDTO ){
		let response = await this.mediator.send<UpdateMealAddonResponse>(new UpdateMealAddonCommand({ mealId, addOn: { id: addOnId, ...request } }))
		return response
	}
}
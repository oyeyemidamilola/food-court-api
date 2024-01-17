
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
	UseBefore,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { IMediator } from 'mediatr-ts';

import { MediatorInstance } from '@infrastructure/index';
import { CreateOrderDTO, ProcessOrderDTO, UpdateOrderDTO } from '@application/usecases/orders/dtos';
import { CreateOrderCommand, CreateOrderResponse, DeleteOrderCommand, DeleteOrderResponse, GetOrderByIdQuery, GetOrderByIdResponse, GetOrdersQuery, GetOrdersResponse, ProcessOrderCommand, ProcessOrderCommandResponse, UpdateOrderCommand, UpdateOrderResponse } from '@application/usecases/orders';
import { AuthenticationMiddleware } from '@api/middlewares/authentication';


@JsonController()
@Service()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@UseBefore(AuthenticationMiddleware)
export class OrderController {

    constructor(
		@MediatorInstance()
		private readonly mediator: IMediator
	) {}

	@Post('/order')
	async createOrder(@Body() request: CreateOrderDTO){
        let response = await this.mediator.send<CreateOrderResponse>(new CreateOrderCommand({...request }))
		return response;
	}

    @Get('/order/:id')
	async getBrandById(@Param('id') id: string){
		let reponse = await this.mediator.send<GetOrderByIdResponse>(new GetOrderByIdQuery({ orderId: id }))
		return reponse
	}

	@Get('/order')
	async getBrands(
		@QueryParam('take') take?: number,
		@QueryParam('skip') skip?: number,
		@QueryParam('direction') direction?: 'asc' | 'desc' 
	){
		let reponse = await this.mediator.send<GetOrdersResponse>(new GetOrdersQuery({ take, skip, direction }))
		return reponse
	}


	@Put('/order/:id')
	async updateBrand(@Param('id') id: string, @Body() request: UpdateOrderDTO){
		let reponse = await this.mediator.send<UpdateOrderResponse>(new UpdateOrderCommand({ id, ...request }))
		return reponse
	}

	@Delete('/order/:id')
	async deleteBrand(@Param('id') id: string){
		let reponse = await this.mediator.send<DeleteOrderResponse>(new DeleteOrderCommand({ id }))
		return reponse
	}

	@Post('/process-order')
	async processOrder(@Body() request: ProcessOrderDTO){
		return this.mediator.send<ProcessOrderCommandResponse>(new ProcessOrderCommand({ selectedMeals: request }))
		{ status: true }
	}
}
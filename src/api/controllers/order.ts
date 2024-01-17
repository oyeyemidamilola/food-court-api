
import { Service } from 'typedi';

import {
	Body,
	JsonController,
	Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { IMediator } from 'mediatr-ts';

import { MediatorInstance } from '@infrastructure/index';
import { CreateOrderDTO } from '@application/usecases/orders/dtos';
import { CreateOrderCommand, CreateOrderResponse } from '@application/usecases/orders';


@JsonController()
@Service()
@OpenAPI({ security: [{ bearerAuth: [] }] })
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
}
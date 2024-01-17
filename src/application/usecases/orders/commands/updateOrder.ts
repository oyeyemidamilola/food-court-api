import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";
import { KitchenStatusEnum, OrderStatusEnum } from "@domain/enums";
import { Order } from "@domain/model/order";
import { KitchenStatus, OrderStatus } from "@domain/types";



export class UpdateOrderCommand implements IRequest<UpdateOrderResponse> { 

    readonly id: string
    readonly userId: string
    readonly orderCode: string
    readonly kitchenStatus: KitchenStatusEnum
    readonly orderStatus: OrderStatusEnum
    readonly isPaid: boolean
    readonly longitude: number
    readonly latitude: number
    readonly isSchduled: boolean
    readonly scheduledDeliveryDate?: Date
    readonly scheduledDeliveryTime?: string
    
    constructor(request: {
        id: string
        userId: string
        orderCode: string
        kitchenStatus: KitchenStatusEnum
        orderStatus: OrderStatusEnum
        isPaid: boolean
        longitude: number
        latitude: number
        isSchduled: boolean
        scheduledDeliveryDate?: Date
        scheduledDeliveryTime?: string
       
    }){
        this.id = request.id
        this.userId = request.userId
        this.orderCode = request.orderCode
        this.kitchenStatus = request.kitchenStatus
        this.orderStatus = request.orderStatus
        this.isPaid = request.isPaid
        this.longitude = request.longitude
        this.latitude = request.latitude
        this.isSchduled = request.isSchduled
        this.scheduledDeliveryDate = request.scheduledDeliveryDate
        this.scheduledDeliveryTime = request.scheduledDeliveryTime
    }

}

export class UpdateOrderResponse implements ResponseInterface<Order> {
    status: boolean;
    error?: { message: string; } | undefined;
}

@requestHandler(UpdateOrderCommand)
@Service('UpdateOrderCommand')
export class UpdateOrderRequestHandler implements IRequestHandler<UpdateOrderCommand, UpdateOrderResponse>{
    
    
    async handle(value: UpdateOrderCommand): Promise<UpdateOrderResponse> {

            await Order
                .query()
                .findById(value.id)
                .patch({ 
                    user_id: value.userId,
                    order_code: value.orderCode,
                    order_status: value.orderStatus as unknown as OrderStatus,
                    kitchen_status: value.kitchenStatus as unknown as KitchenStatus,
                    is_paid: value.isPaid,
                    is_scheduled: value.isSchduled,
                    latitude: value.latitude,
                    longitude: value.longitude
                })
        return {
            status: true
        }
    }
}
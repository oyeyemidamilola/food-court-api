import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Order } from "@domain/model/order";



export class GetOrderByIdQuery implements IRequest<GetOrderByIdResponse> { 

    readonly orderId: string
    
    constructor(request: {
        orderId: string
    }){
        this.orderId = request.orderId
    }

}

export class GetOrderByIdResponse implements ResponseInterface<Order> {
    status: boolean;
    data?: Order;
    error?: { message: string; } | undefined;
}

@requestHandler(GetOrderByIdQuery)
@Service('GetOrderByIdQuery')
export class GetOrderByIdQueryHandler implements IRequestHandler<GetOrderByIdQuery, GetOrderByIdResponse>{
    
    
    async handle(value: GetOrderByIdQuery): Promise<GetOrderByIdResponse> {

        let order = await Order
                        .query()
                        .findById(value.orderId)
                        .where('is_deleted', false)

        if(!order) throw new NotFoundError(`Order not found`)
                       
        return {
            data: order,
            status: true
        }
    }
}
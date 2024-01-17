import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { PaginatedResponseInterface, ResponseInterface } from "@application/common";
import { Order } from "@domain/model/order";


export class GetOrdersQuery implements IRequest<GetOrdersResponse> { 

    skip?: number
    take?: number
    direction?: 'asc' | 'desc'
    
    constructor(request: {
        skip?: number
        take?: number
        direction?: 'asc' | 'desc'
    }){
        this.skip = request.skip
        this.take = request.take
        this.direction = request.direction
    }

}

export class GetOrdersResponse implements ResponseInterface<PaginatedResponseInterface<'order',Order>> {
    status: boolean;
    data?: PaginatedResponseInterface<'order',Order>
    error?: { message: string; } | undefined;
}

@requestHandler(GetOrdersQuery)
@Service('GetOrdersQuery')
export class GetOrdersQueryHandler implements IRequestHandler<GetOrdersQuery, GetOrdersResponse>{
    
    
    async handle(value: GetOrdersQuery): Promise<GetOrdersResponse> {

        
        let orderQueryBuilder = Order
                                .knexQuery()
                                .where('is_deleted', false)
                                .orderBy('updated_at', value.direction ?? 'asc')
        
        let totalSelect = (await orderQueryBuilder.select() as Order[]).length

        if(value.skip) orderQueryBuilder.offset(value.skip!)
        if(value.take) orderQueryBuilder.limit(value.take!)

        let orders = await orderQueryBuilder as Order[]
                                       
        return {
            data: { order: orders, total: totalSelect },
            status: true
        }
    }
}
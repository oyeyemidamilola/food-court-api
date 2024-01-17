import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Order } from "@domain/model/order";


export class DeleteOrderCommand implements IRequest<DeleteOrderResponse> { 

    readonly id: string
    
    constructor(request: {
        id: string
    }){
        this.id = request.id
    }
}

export class DeleteOrderResponse implements ResponseInterface<Order> {
    status: boolean;
    data?: Order;
    error?: { message: string; } | undefined;
}

@requestHandler(DeleteOrderCommand)
@Service('DeleteOrderCommand')
export class DeleteOrderCommandHandler implements IRequestHandler<DeleteOrderCommand, DeleteOrderResponse>{
    

    async handle(value: DeleteOrderCommand): Promise<DeleteOrderResponse> {

         await Order
                .query()
                .findById(value.id)
                .patch({ is_deleted: true, deleted_at: new Date() })

        return {
            status: true
        }
    }
}
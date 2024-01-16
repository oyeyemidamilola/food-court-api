import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";


export class DeleteMealCommand implements IRequest<DeleteMealResponse> { 

    readonly id: string
    
    constructor(request: {
        id: string
    }){
        this.id = request.id
    }
}

export class DeleteMealResponse implements ResponseInterface<Meal> {
    status: boolean;
    data?: Meal;
    error?: { message: string; } | undefined;
}

@requestHandler(DeleteMealCommand)
@Service('DeleteMealCommand')
export class DeleteMealCommandHandler implements IRequestHandler<DeleteMealCommand, DeleteMealResponse>{
    

    async handle(value: DeleteMealCommand): Promise<DeleteMealResponse> {

         await Meal
                .query()
                .findById(value.id)
                .patch({ is_deleted: true, deleted_at: new Date() })

        return {
            status: true
        }
    }
}
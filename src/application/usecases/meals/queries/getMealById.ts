import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";



export class GetMealByIdQuery implements IRequest<GetMealByIdResponse> { 

    readonly mealId: string
    readonly isActive?: boolean

    constructor(request: {
        mealId: string
        isActiive?: boolean
    }){
        this.mealId = request.mealId
        this.isActive = request.isActiive
    }

}

export class GetMealByIdResponse implements ResponseInterface<Meal> {
    status: boolean;
    data?: Meal;
    error?: { message: string; } | undefined;
}

@requestHandler(GetMealByIdQuery)
@Service('GetMealByIdQuery')
export class GetMealByIdQueryHandler implements IRequestHandler<GetMealByIdQuery, GetMealByIdResponse>{
    
    
    async handle(value: GetMealByIdQuery): Promise<GetMealByIdResponse> {

        let meal = await Meal
                        .query()
                        .findById(value.mealId)
                        .where('is_deleted', false)
                        .where('is_active', value.isActive ?? true)

        if(!meal) throw new NotFoundError(`Meal not found`)
                       
        return {
            data: meal,
            status: true
        }
    }
}
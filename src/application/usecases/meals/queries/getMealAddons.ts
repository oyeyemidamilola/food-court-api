import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";
import { AddOn } from "@domain/model/addOn";



export class GetMealAddonsQuery implements IRequest<GetMealAddonsResponse> { 

    readonly mealId: string
    readonly isActive?: boolean
    
    constructor(request: {
        mealId: string
        isActive?: boolean
    }){
        this.mealId = request.mealId
        this.isActive = request.isActive
    }

}

export class GetMealAddonsResponse implements ResponseInterface<any> {
    status: boolean;
    data?: any;
    error?: { message: string; } | undefined;
}

@requestHandler(GetMealAddonsQuery)
@Service('GetMealAddonsQuery')
export class GetMealAddonsQueryHandler implements IRequestHandler<GetMealAddonsQuery, GetMealAddonsResponse>{
    
    
    async handle(value: GetMealAddonsQuery): Promise<GetMealAddonsResponse> {

        let meal = await Meal
                        .query()
                        .findById(value.mealId)
                        .where('is_deleted', false) as Meal

        let mealWithAddons = await meal?.$relatedQuery<AddOn>('addons')
                                        .where('is_deleted', false)
                                        .where('is_active', value.isActive ?? true)
                                        .select() 

        if(!mealWithAddons) throw new NotFoundError(`Meal not found`)
                       
        return {
            data: { addons: mealWithAddons, ...meal },
            status: true
        }
    }
}
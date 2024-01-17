import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { AddOn } from "@domain/model/addOn";
import { Meal } from "@domain/model/meal";


export class CreateMealAddonsCommand implements IRequest<CreateMealAddonsResponse> {

    readonly mealId: string
    readonly addOns: {
        amount: number
        name: string
        isActive: boolean
    }[]
    constructor(request: {
        mealId: string
        addOns: {
            amount: number
            name: string
            isActive: boolean
        }[]
    }){
        this.mealId = request.mealId
        this.addOns = request.addOns
    }
}

export class CreateMealAddonsResponse implements ResponseInterface<any>{
    
    status: boolean;
    error?: { message: string; } | undefined;
}

@requestHandler(CreateMealAddonsCommand)
@Service('CreateMealAddonsCommand')
export class CreateMealAddonsHandler implements IRequestHandler<CreateMealAddonsCommand, CreateMealAddonsResponse> {
    
    
    async handle(value: CreateMealAddonsCommand): Promise<CreateMealAddonsResponse> {

        let addOns: Partial<AddOn>[] = value.addOns.map<Partial<AddOn>>(({ name, amount, isActive }) => ({ name, amount, is_active: isActive, item_type: "FOOD" , meal_id: value.mealId })) 
        await Meal.relatedQuery('addons').for(value.mealId).insert(addOns)
        return {
            status: true
        } 
    }
}
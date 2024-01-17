import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { AddOn } from "@domain/model/addOn";
import { Meal } from "@domain/model/meal";


export class UpdateMealAddonCommand implements IRequest<UpdateMealAddonResponse> {

    readonly mealId: string
    readonly addOn: {
        id: string
        amount: number
        name: string
        isActive: boolean
    }
    constructor(request: {
        mealId: string
        addOn: {
            id: string
            amount: number
            name: string
            isActive: boolean
        }
    }){
        this.mealId = request.mealId
        this.addOn = request.addOn
    }
}

export class UpdateMealAddonResponse implements ResponseInterface<any>{
    
    status: boolean;
    error?: { message: string; } | undefined;
}

@requestHandler(UpdateMealAddonCommand)
@Service('UpdateMealAddonCommand')
export class UpdateMealAddonHandler implements IRequestHandler<UpdateMealAddonCommand, UpdateMealAddonResponse> {
    
    
    async handle(value: UpdateMealAddonCommand): Promise<UpdateMealAddonResponse> {

        let meal = await Meal
                        .query()
                        .findById(value.mealId)
                        .where('is_deleted', false) as Meal

        await  meal?.$relatedQuery<AddOn>('addons')
        .where('id', value.addOn.id)
        .patch({ 
            amount: value.addOn.amount, 
            name: value.addOn.name, 
            is_active: value.addOn.isActive
        })
        
        return {
            status: true
        } 
    }
}
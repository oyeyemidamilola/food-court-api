import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";



export class UpdateMealCommand implements IRequest<UpdateMealResponse> { 

    readonly id: string
    readonly name: string
    readonly description: string
    readonly images: string[]
    readonly mealTags: string[]
    readonly internalProfit: number
    readonly amount: number
    readonly isActive: boolean
    
    constructor(request: {
        id: string
        name: string
        description: string
        images: string[]
        mealTags: string[]
        internalProfit: number
        amount: number
        isActive: boolean
       
    }){
        this.id = request.id
        this.name = request.name
        this.description = request.description
        this.images  = request.images
        this.mealTags = request.mealTags
        this.internalProfit = request.internalProfit
        this.amount = request.amount
        this.isActive = request.isActive
    }

}

export class UpdateMealResponse implements ResponseInterface<{ id: string }> {
    status: boolean;
    data?: { id: string; };
    error?: { message: string; } | undefined;
}

@requestHandler(UpdateMealCommand)
@Service('UpdateMealCommand')
export class UpdateMealRequestHandler implements IRequestHandler<UpdateMealCommand, UpdateMealResponse>{
    
    
    async handle(value: UpdateMealCommand): Promise<UpdateMealResponse> {

        let meal = await Meal
                        .query()
                        .findById(value.id)
                        .patch({ 
                            name: value.name,
                            description: value.description,
                            is_active: value.isActive,
                            meal_tags: value.mealTags,
                            amount: value.amount,
                            internal_profit: value.internalProfit,
                            images: value.images
                        })
        return {
            status: true
        }
    }
}
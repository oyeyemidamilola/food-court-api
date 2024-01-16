import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";


export class CreateMealCommand implements IRequest<CreateMealResponse> { 

    readonly name: string
    readonly description: string
    readonly images: string[]
    readonly mealTags: string[]
    readonly internalProfit: number
    readonly amount: number
    readonly isActive: boolean
    
    constructor(request: {
        name: string
        description: string
        images: string[]
        mealTags: string[]
        internalProfit: number
        amount: number
        isActive: boolean
       
    }){
        this.name = request.name
        this.description = request.description
        this.images  = request.images
        this.mealTags = request.mealTags
        this.internalProfit = request.internalProfit
        this.amount = request.amount
        this.isActive = request.isActive
    }

}

export class CreateMealResponse implements ResponseInterface<{ id: string }> {
    status: boolean;
    data?: { id: string; };
    error?: { message: string; } | undefined;
}

@requestHandler(CreateMealCommand)
@Service('CreateMealCommand')
export class CreateMealRequestHandler implements IRequestHandler<CreateMealCommand, CreateMealResponse>{
    
    
    async handle(value: CreateMealCommand): Promise<CreateMealResponse> {

        let meal = await Meal
                        .query()
                        .insert({ 
                            name: value.name,
                            description: value.description,
                            is_active: value.isActive,
                            meal_tags: value.mealTags,
                            amount: value.amount,
                            internal_profit: value.internalProfit,
                            images: value.images
                        })
        return {
            data: { id: meal.id },
            status: true
        }
    }
}
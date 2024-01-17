import { ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";
import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";
import { ProcessOrderDTO } from "../dtos";
import { AddOn } from "@domain/model/addOn";

import { groupBy } from "lodash";
import { CalculatedOrder } from "@domain/model/calculatedOrder";





export class ProcessOrderCommand implements IRequest<any> {

    readonly selectedMeals: ProcessOrderDTO

    constructor(
        request: { selectedMeals: ProcessOrderDTO}
    ){
        this.selectedMeals = request.selectedMeals
    }
}


export class ProcessOrderCommandResponse implements ResponseInterface<any> {
    
    status: boolean;
    data?: any;
    error?: { message: string; } | undefined;
}


@requestHandler(ProcessOrderCommand)
@Service('ProcessOrderCommand')
export class ProcessOrderCommandHandler implements IRequestHandler<ProcessOrderCommand, ProcessOrderCommandResponse> {
    
    
    async handle(value: ProcessOrderCommand): Promise<ProcessOrderCommandResponse> {

        let { selectedMeals } = value.selectedMeals

        let meals = await Meal.query().for(selectedMeals.map(c => c.mealId))
        let addOns = await Meal.relatedQuery<AddOn>('addons')
                             .for(selectedMeals.map(c => c.mealId))

        let addOnsByMealId = groupBy(addOns, 'mealId')
        let total = 0
        for (const iterator of selectedMeals) {
            let selectedAddons = addOnsByMealId[iterator.mealId]
            let filteredAddons = selectedAddons.filter((c: any) =>  iterator.addOns?.includes(c.mealId))
            // total += filteredAddons.reduce((0 ,a, b) => a.amount + b.amount)

        }
        return { status: true }               
    }
}
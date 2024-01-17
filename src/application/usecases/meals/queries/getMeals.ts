import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { PaginatedResponseInterface, ResponseInterface } from "@application/common";
import { Meal } from "@domain/model/meal";


export class GetMealsQuery implements IRequest<GetMealsResponse> { 

    readonly skip?: number
    readonly take?: number
    readonly direction?: 'asc' | 'desc'
    readonly isActive?: boolean

    
    constructor(request: {
        skip?: number
        take?: number
        direction?: 'asc' | 'desc'
        isActive?: boolean
    }){
        this.skip = request.skip
        this.take = request.take
        this.direction = request.direction
        this.isActive = request.isActive
    }

}

export class GetMealsResponse implements ResponseInterface<PaginatedResponseInterface<'meals',Meal>> {
    status: boolean;
    data?: PaginatedResponseInterface<'meals',Meal>
    error?: { message: string; } | undefined;
}

@requestHandler(GetMealsQuery)
@Service('GetMealsQuery')
export class GetMealsQueryHandler implements IRequestHandler<GetMealsQuery, GetMealsResponse>{
    
    
    async handle(value: GetMealsQuery): Promise<GetMealsResponse> {

        
        let mealQueryBuilder = Meal
                                .knexQuery()
                                .where('is_deleted', false)
                                .where('is_active', value.isActive ?? true)
                                .orderBy('updated_at', value.direction ?? 'asc')
        
        let totalSelect = (await mealQueryBuilder.select() as Meal[]).length

        if(value.skip) mealQueryBuilder.offset(value.skip!)
        if(value.take) mealQueryBuilder.limit(value.take!)

        let meals = await mealQueryBuilder as Meal[]
                                       
        return {
            data: { meals: meals, total: totalSelect },
            status: true
        }
    }
}
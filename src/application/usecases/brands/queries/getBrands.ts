import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { PaginatedResponseInterface, ResponseInterface } from "@application/common";
import { Brand } from "@domain/model/brand";



export class GetBrandsQuery implements IRequest<GetBrandsResponse> { 

    skip?: number
    take?: number
    direction?: 'asc' | 'desc'
    
    constructor(request: {
        skip?: number
        take?: number
        direction?: 'asc' | 'desc'
    }){
        this.skip = request.skip
        this.take = request.take
        this.direction = request.direction
    }

}

export class GetBrandsResponse implements ResponseInterface<PaginatedResponseInterface<'brands',Brand>> {
    status: boolean;
    data?: PaginatedResponseInterface<'brands',Brand>
    error?: { message: string; } | undefined;
}

@requestHandler(GetBrandsQuery)
@Service('GetBrandsQuery')
export class GetBrandsQueryHandler implements IRequestHandler<GetBrandsQuery, GetBrandsResponse>{
    
    
    async handle(value: GetBrandsQuery): Promise<GetBrandsResponse> {

        
        let brandQueryBuilder = Brand
                                .knexQuery()
                                .where('is_deleted', false)
                                .orderBy('updated_at', value.direction ?? 'asc')
        
        let totalSelect = (await brandQueryBuilder.select() as Brand[]).length

        if(value.skip) brandQueryBuilder.offset(value.skip!)
        if(value.take) brandQueryBuilder.limit(value.take!)

        let brands = await brandQueryBuilder as Brand[]
                                       
        return {
            data: { brands: brands, total: totalSelect },
            status: true
        }
    }
}
import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Brand } from "@domain/model/brand";



export class GetBrandByIdQuery implements IRequest<GetBrandByIdResponse> { 

    readonly brandId: string
    
    constructor(request: {
        brandId: string
    }){
        this.brandId = request.brandId
    }

}

export class GetBrandByIdResponse implements ResponseInterface<Brand> {
    status: boolean;
    data?: Brand;
    error?: { message: string; } | undefined;
}

@requestHandler(GetBrandByIdQuery)
@Service('GetBrandByIdQuery')
export class GetBrandByIdQueryHandler implements IRequestHandler<GetBrandByIdQuery, GetBrandByIdResponse>{
    
    
    async handle(value: GetBrandByIdQuery): Promise<GetBrandByIdResponse> {

        let brand = await Brand
                        .query()
                        .findById(value.brandId)
                        .where('is_deleted', false)

        if(!brand) throw new NotFoundError(`Brand not found`)
                       
        return {
            data: brand,
            status: true
        }
    }
}
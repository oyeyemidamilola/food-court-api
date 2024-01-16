import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import {  ResponseInterface } from "@application/common";
import { Brand } from "@domain/model/brand";


export class CreateBrandCommand implements IRequest<CreateBrandResponse> { 

    readonly name: string
    readonly longitude: number
    readonly latitude: number
    
    constructor(request: {
        name: string
        longitude: number
        latitude: number
    }){
        this.name = request.name
        this.longitude = request.longitude
        this.latitude = request.latitude
    }

}

export class CreateBrandResponse implements ResponseInterface<{ id: string }> {
    status: boolean;
    data?: { id: string; };
    error?: { message: string; } | undefined;
}

@requestHandler(CreateBrandCommand)
@Service('CreateBrandCommand')
export class CreateBrandRequestHandler implements IRequestHandler<CreateBrandCommand, CreateBrandResponse>{
    
    
    async handle(value: CreateBrandCommand): Promise<CreateBrandResponse> {

        let brand = await Brand
                        .query()
                        .insert({ 
                            name: value.name, 
                            longitude: value.longitude, 
                            latitude: value.latitude 
                        })
        return {
            data: { id: brand.id },
            status: true
        }
    }

}
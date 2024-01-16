import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import {  ResponseInterface } from "@application/common";
import { Brand } from "@domain/model/brand";


export class UpdateBrandCommand implements IRequest<UpdateBrandResponse> { 

    readonly id: string
    readonly name: string
    readonly longitude: number
    readonly latitude: number
    
    constructor(request: {
        id: string
        name: string
        longitude: number
        latitude: number
    }){
        this.id = request.id
        this.name = request.name
        this.longitude = request.longitude
        this.latitude = request.latitude
    }
}

export class UpdateBrandResponse implements ResponseInterface<Brand> {
    status: boolean;
    data?: Brand;
    error?: { message: string; } | undefined;
}

@requestHandler(UpdateBrandCommand)
@Service('UpdateBrandCommand')
export class UpdateBrandCommandHandler implements IRequestHandler<UpdateBrandCommand, UpdateBrandResponse>{
    
    
    async handle(value: UpdateBrandCommand): Promise<UpdateBrandResponse> {

         await Brand
                .query()
                .findById(value.id)
                .patch({ 
                    name: value.name, 
                    longitude: value.longitude, 
                    latitude: value.latitude 
                })

        return {
            status: true
        }
    }
}
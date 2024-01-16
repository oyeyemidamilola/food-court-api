import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import {  ResponseInterface } from "@application/common";
import { Service } from "typedi";


export class CreateBrandRequest implements IRequest<CreateBrandResponse> { 

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

@requestHandler(CreateBrandRequest)
@Service('CreateBrandRequest')
export class CreateBrandRequestHandler implements IRequestHandler<CreateBrandRequest, CreateBrandResponse>{
    
    
    async handle(value: CreateBrandRequest): Promise<CreateBrandResponse> {
        return {
            data: { id: 'testing working '},
            status: true
        }
    }

}
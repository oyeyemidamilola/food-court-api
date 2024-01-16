import { IRequest, IRequestHandler, requestHandler } from "mediatr-ts";
import { Service } from "typedi";

import { ResponseInterface } from "@application/common";
import { Brand } from "@domain/model/brand";


export class DeleteBrandCommand implements IRequest<DeleteBrandResponse> { 

    readonly id: string
    
    constructor(request: {
        id: string
    }){
        this.id = request.id
    }
}

export class DeleteBrandResponse implements ResponseInterface<Brand> {
    status: boolean;
    data?: Brand;
    error?: { message: string; } | undefined;
}

@requestHandler(DeleteBrandCommand)
@Service('DeleteBrandCommand')
export class DeleteBrandCommandHandler implements IRequestHandler<DeleteBrandCommand, DeleteBrandResponse>{
    

    async handle(value: DeleteBrandCommand): Promise<DeleteBrandResponse> {

         await Brand
                .query()
                .findById(value.id)
                .patch({ is_deleted: true, deleted_at: new Date() })

        return {
            status: true
        }
    }
}
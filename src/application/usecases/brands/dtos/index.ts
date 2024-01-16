import { IsLatitude, IsLongitude, IsNotEmpty } from "class-validator"


export class CreateBrandDTO {

    @IsNotEmpty({ message: "Name not specified"})
    name: string

    @IsLatitude()
    longitude: number

    @IsLongitude()
    latitude: number
}

export class UpdateBrandDTO {

    @IsNotEmpty({ message: "Name not specified"})
    name: string

    @IsLatitude()
    longitude: number

    @IsLongitude()
    latitude: number
}

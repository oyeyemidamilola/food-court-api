import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty } from "class-validator"


export class CreateBrandDTO {

    @IsNotEmpty({ message: "Name not specified"})
    name: string

    @IsLatitude()
    longitude: number

    @IsLongitude()
    latitude: number
}

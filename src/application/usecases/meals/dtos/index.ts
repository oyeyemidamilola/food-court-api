import { ArrayMinSize, ArrayNotEmpty, IsBoolean, IsNotEmpty, MaxLength, Min } from "class-validator"

export class CreateMealDTO {

    @IsNotEmpty({ message: "Name not specified" })
    name: string

    @IsNotEmpty({ message: "Name not specified" })
    @MaxLength(255)
    description: string

    @ArrayMinSize(0)
    images: string[]

    @ArrayMinSize(0)
    mealTags: string[]

    @Min(0.00)
    internalProfit: number

    @Min(0.00, { message: "Amount can not be negative"})
    amount: number

    @IsBoolean()
    isActive: boolean

}

export class UpdateMealDTO {

    @IsNotEmpty({ message: "Name not specified" })
    name: string

    @IsNotEmpty({ message: "Name not specified" })
    @MaxLength(255)
    description: string

    @ArrayMinSize(0)
    images: string[]

    @ArrayMinSize(0)
    mealTags: string[]

    @Min(0.00)
    internalProfit: number

    @Min(0.00, { message: "Amount can not be negative"})
    amount: number

    @IsBoolean()
    isActive: boolean
}

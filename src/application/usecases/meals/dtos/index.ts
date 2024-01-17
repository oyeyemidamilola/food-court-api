import { Type } from "class-transformer"
import { ArrayMinSize, ArrayNotEmpty, IsBoolean, IsNotEmpty, IsPositive, IsUUID, MaxLength, Min, ValidateNested } from "class-validator"


export class AddonDTO {

    @IsPositive()
    amount: number

    @IsNotEmpty()
    name: string
    
    @IsBoolean()
    isActive: boolean
}

export class CreateMealAddonsDTO {

    @ValidateNested({ each: true })
    @Type(() => AddonDTO)
    addons: AddonDTO[]

}

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

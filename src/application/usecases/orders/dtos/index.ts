import { IsBoolean, IsDate, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsUUID, MaxLength, ValidateIf } from "class-validator"

import { KitchenStatusEnum, OrderStatusEnum } from "@domain/enums"

export class CreateOrderDTO {

    @IsUUID()
    userId: string

    @MaxLength(40)
    orderCode: string

    // @IsEnum(KitchenStatusEnum)
    @IsNotEmpty()
    kitchenStatus: KitchenStatusEnum

    @IsNotEmpty()
    // @IsEnum(OrderStatusEnum)
    orderStatus: OrderStatusEnum

    @IsBoolean()
    isPaid: boolean

    @IsLongitude()
    longitude: number

    @IsLatitude()
    latitude: number

    @IsBoolean()
    isSchduled: boolean

    @IsOptional()
    scheduledDeliveryDate?: Date

    @IsOptional()
    scheduledDeliveryTime?: string

}

export class UpdateOrderDTO {

    @IsUUID()
    userId: string

    @MaxLength(40)
    orderCode: string

    // @IsEnum(KitchenStatusEnum)
    @IsNotEmpty()
    kitchenStatus: KitchenStatusEnum

    // @IsEnum(KitchenStatusEnum)
    @IsNotEmpty()
    orderStatus: OrderStatusEnum

    @IsBoolean()
    isPaid: boolean

    @IsLongitude()
    longitude: number

    @IsLatitude()
    latitude: number

    @IsBoolean()
    isSchduled: boolean

    @ValidateIf(o => o.isSchduled)
    @IsDate()
    scheduledDeliveryDate?: Date

    @ValidateIf(o => o.isSchduled)
    @IsNotEmpty()
    scheduledDeliveryTime?: string
}

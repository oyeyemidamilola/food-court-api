import { Model } from "objection";


export class CalculatedOrder extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    total_amount: number
    free_delivery: boolean
    delivery_fee: number
    service_charge?: number
    address_details: { 
        building_no: string
        address_line: string
        name?: string
        city: string
    }

    static tableName: string = 'calculated_orders'
    static idColumn: string = 'id'
}
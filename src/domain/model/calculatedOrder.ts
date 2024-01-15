import { Model } from "objection";


export class CalculatedOrder extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    static tableName: string = 'calculated_orders'
    static idColumn: string = 'id'
}
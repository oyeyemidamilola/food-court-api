import { Model } from "objection";


export class OrderLog extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    description: string

    static tableName: string = 'order_logs'
    static idColumn: string = 'id'
}
import { Model } from "objection";


export class AddOn extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    static tableName: string = 'addons'
    static idColumn: string = 'id'

}
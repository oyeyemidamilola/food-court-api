import { Model } from "objection";

import { ItemType } from "@domain/types";


export class AddOn extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    amount: number
    name: string
    is_active: boolean
    item_type: ItemType

    meal_id: string

    static tableName: string = 'addons'
    static idColumn: string = 'id'

}
import { Model, RelationMapping } from "objection";

import { Brand } from "./brand";
import { AddOn } from "./addOn";


export class Meal extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    meal_tags: string[]
    is_active: boolean
    name: string
    amount: number 
    description: string
    internal_profit: number

    brand_id: string


    static tableName: string = 'meals'
    static idColumn: string = 'id'

    static get relationMappings(): Record<string, RelationMapping<Meal>>{
        return {
            brand: {
                relation: Model.HasOneRelation,
                modelClass: Brand,
                join: {
                    from: 'meals.brandId',
                    to: 'brands.id'
                }
            },
            addons: {
                relation: Model.HasManyRelation,
                modelClass: AddOn,
                join: {
                    from: 'meals.id',
                    to: 'addons.meal_id'
                }
            }
            
        }
    }
}
import { Model, ModelOptions, QueryContext, RelationMapping } from "objection";


export class Brand extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    name: string
    latitude: number
    longitude: number

    static tableName: string = 'brands'
    static idColumn: string = 'id'

    static get relationMappings(): Record<string, RelationMapping<Brand>>{

        return {
            meals: {
                relation: Model.HasManyRelation,
                modelClass: Brand,
                join: {
                    from: 'brands.id',
                    to: 'meals.brand_id'
                }
            }
        }
    }
}
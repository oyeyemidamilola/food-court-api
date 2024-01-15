import { Model, RelationMapping } from "objection";

import { CalculatedOrder } from "./calculatedOrder";
import { OrderLog } from "./orderLog";
import { Meal } from "./meal";


export class Order extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    static tableName: string = 'orders'
    static idColumn: string = 'id'

    static get relationMappings(): Record<string, RelationMapping<Order>>{
        return {
            calculated_order: {
                relation: Model.HasOneRelation,
                modelClass: CalculatedOrder,
                join: {
                    from: 'orders.id',
                    to: 'calculated_orders.order_id'
                }
            },
            order_logs: {
                relation: Model.HasManyRelation,
                modelClass: OrderLog,
                join: {
                    from: 'orders.id',
                    to: 'order_logs.order_id'
                }
            },
            meals: {
                relation: Model.ManyToManyRelation,
                modelClass: Meal,
                join: {
                    from: 'orders.id',
                    through: {
                        from: 'orders_meals.order_id',
                        to: 'orders_meals.meal_id'
                    },
                    to: 'meals.id'
                }
            }
        }
    }
}
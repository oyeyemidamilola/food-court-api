import { Model, RelationMapping } from "objection";

import { CalculatedOrder } from "./calculatedOrder";
import { OrderLog } from "./orderLog";
import { Meal } from "./meal";
import { KicthenStatus, OrderStatus } from "@domain/types";


export class Order extends Model {

    id: string
    is_deleted: boolean
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    user_id: string

    kitchen_status: KicthenStatus
    order_status: OrderStatus
    order_code: string
    completed_time?: Date
    is_paid: boolean
    longitude: number
    latitude: number

    is_scheduled: boolean
    scheduled_delivery_date?: Date
    scheduled_delivery_time?: Date

    rider_id: string
    rider_start_time: number
    rider_completed_time: number



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
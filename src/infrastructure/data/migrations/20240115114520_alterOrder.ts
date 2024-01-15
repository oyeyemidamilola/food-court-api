import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('orders', builder => {
        builder.enum('kitchenStatus', ['CANCELLED', 'ACCEPTED', 'DISPATCHED']).notNullable().index('idx_orders_kitchen_status')
        builder.enum('orderStatus', ['PENDING', 'CANCELLED', 'COMPLETED']).notNullable().index('idx_orders_order_status')
        builder.string('orderCode').unique().notNullable()
        builder.time('completedTime').nullable()
        builder.boolean('isPaid').notNullable()
        builder.float('latitude').notNullable()
        builder.float('longitude').notNullable()
        builder.boolean('isScheduled').notNullable()
        builder.date('scheduledDeliveryDate').nullable()
        builder.time('scheduledDeliveryTime').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('orders', builder => {
        builder.dropColumns(
            'kitchenStatus',
            'orderStatus',
            'orderCode',
            'completedTime',
            'isPaid',
            'latitude',
            'longitude',
            'isScheduled',
            'scheduledDeliveryDate',
            'scheduledDeliveryTime'
        )
    })
}


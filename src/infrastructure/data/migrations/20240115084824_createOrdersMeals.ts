import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema
    .alterTable('meals', builder => {
        builder.dropColumn('orderId')
    })
    .createTable('orders_meals', builder => {
        builder.uuid('id', { primaryKey: true })
        builder.uuid('orderId').references('orders.id');
        builder.uuid('mealId').references('meals.id');
    })
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .dropTableIfExists('orders_meals')
    .alterTable('meals', builder => {
        builder.uuid('orderId').references('id').inTable('orders')
    })
}


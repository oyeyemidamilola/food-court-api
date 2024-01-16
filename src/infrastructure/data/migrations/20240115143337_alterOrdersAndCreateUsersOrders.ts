import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema
    .createTable('users_orders', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.uuid('orderId').references('orders.id');
        builder.uuid('userId').references('users.id');
    })
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .dropTableIfExists('orders_meals')
}
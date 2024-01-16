import type { Knex } from "knex";

import { defaultHistoryFields } from "../../helpers";


export async function up(knex: Knex): Promise<void> {

    await knex.schema
    .createTable('orders', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        defaultHistoryFields(knex, builder);
    })
    .createTable('calculated_orders', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.uuid('orderId').unique().references('id').inTable('orders')
        defaultHistoryFields(knex, builder);
    })
    .createTable('order_logs', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.uuid('orderId').references('id').inTable('orders')
        defaultHistoryFields(knex, builder);
    })
    .createTable('brands', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        defaultHistoryFields(knex, builder);
    })
    .createTable('meals', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.uuid('orderId').references('id').inTable('orders')
        builder.uuid('brandId').references('id').inTable('brands')
        defaultHistoryFields(knex, builder);
    })
    .createTable('addons', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.uuid('mealId').references('id').inTable('meals')
        defaultHistoryFields(knex, builder);
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .dropTableIfExists('orders')
    .dropTableIfExists('calculated_orders')
    .dropTableIfExists('order_logs')
    .dropTableIfExists('brands')
    .dropTableIfExists('meals')
    .dropTableIfExists('addons')

}


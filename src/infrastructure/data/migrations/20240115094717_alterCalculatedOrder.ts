import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('calculated_orders', builder => {
        builder.decimal('totalAmount').notNullable().checkNegative()
        builder.boolean('freeDelivery').notNullable()
        builder.decimal('deliveryFee').notNullable().checkNegative()
        builder.decimal('serviceCharge').nullable().checkNegative()
        builder.json('addressDetails').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('calculated_orders', builder => {
        builder.dropColumns('totalAmount','freeDelivery', 'deliveryFee', 'serviceCharge', 'addressDetails')
    })
}


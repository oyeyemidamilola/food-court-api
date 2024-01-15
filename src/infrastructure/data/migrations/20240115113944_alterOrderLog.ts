import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('order_logs', builder => {
        builder.string('description').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('order_logs', builder => {
        builder.dropColumn('description')
    })
}


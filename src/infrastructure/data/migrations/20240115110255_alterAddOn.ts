import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('addons', builder => {
        builder.decimal('amount').notNullable()
        builder.string('name').notNullable()
        builder.boolean('isActive')
        builder.enum('itemType', ['FOOD'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('addons', builder => {
        builder.dropColumns('amount', 'name', 'isActive', 'itemType')
    })
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('meals', builder => {
        builder.boolean('isActive').notNullable()
        builder.string('name').notNullable()
        builder.decimal('amount').notNullable()
        builder.text('description').notNullable().checkLength('<', 300)
        builder.decimal('internalProfit').notNullable()
        builder.specificType('mealTags', 'text ARRAY').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('meals', builder => {
        builder.dropColumns('isActive', 'name', 'amount', 'description', 'internalProfit', 'mealTags')
    })
}


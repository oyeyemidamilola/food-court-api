import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('meals', builder => {
        builder.specificType('images', 'text ARRAY').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .alterTable('meals', builder => {
        builder.dropColumn('images')
    })
}


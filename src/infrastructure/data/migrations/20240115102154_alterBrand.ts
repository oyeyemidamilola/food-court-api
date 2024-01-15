import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('brands', builder => {
        builder.string('name').notNullable()
        builder.float('latitude').notNullable()
        builder.float('longitude').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('brands', builder => {
        builder.dropColumns('name', 'latitude', 'longitude')
    })
}


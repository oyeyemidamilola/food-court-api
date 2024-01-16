import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema
    .createTable('users', builder => {
        builder.uuid('id', { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"))
        builder.string('email').notNullable().unique()
        builder.string('hashedPassword').notNullable()
        builder.boolean('isConfirmed').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema
    .dropSchemaIfExists('users') 
}



import { Knex } from "knex";


const ON_UPDATE_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW."updated_at" = now();

    IF (NEW.is = false) THEN
      NEW."updated_at" = OLD."updated_at";
      NEW."deleted_at" = now();
    END IF;

    RETURN NEW;
  END;
$$ language 'plpgsql';
`;

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = 'DROP FUNCTION on_update_timestamp';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .raw(ON_UPDATE_TIMESTAMP_FUNCTION)
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION);
}

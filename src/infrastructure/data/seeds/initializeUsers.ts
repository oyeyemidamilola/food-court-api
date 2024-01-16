import { Knex } from 'knex';

import { User } from '@domain/model/user';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert<User>([{
    email: 'test@email.com',
    isConfirmed: true,
    hashedPassword: '$2a$12$ie7GgSkj6FJ3Vi7zwli5A.VA7Jb57Bn.NcpZ88VWchc50UH02fWH2'
  }]);
}
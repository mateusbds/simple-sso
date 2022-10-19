import { faker } from '@faker-js/faker';

import { Account } from '@domain/entities/Account';

export const mockAccount = (): Account => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const account: Account = {
  id: '93e689dd-c914-48e2-aa99-1e4274246258',
  email: 'clara_rocha@ortovip.com.br',
  password: 'right_password',
};

export const accounts = [account];

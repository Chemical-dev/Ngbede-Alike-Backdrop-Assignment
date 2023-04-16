import Account from '../src/model/acccount.js';
import resolvers from '../src/schema/resolvers';
jest.mock('../src/model/acccount');

describe('account resolver', () => {
  const accountsVault = [
   {
    accountName:'Mbadiwe',
    accountNumber:'00000000',
    bankCode:'000'
   }
  ]

  Account.mockResolvedValue(accountsVault)

  test('name should be the full name', async () => {
    const acccount = await resolvers.Query.accountDetail(

    )
    expect(acccount.accountName).toBe('Mbadiwe')
  })
})
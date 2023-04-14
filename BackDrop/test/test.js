import Account from '../src/model/acccount.js';
import resolvers from '../src/schema/resolvers';
jest.mock('../src/model/acccount');

// describe('Unit Testing GQL Resolvers in Node with TDD', () => {
//   test('TDD should be the professional standard', async () => {
//     expect(true).toBe(true)
//   })
// })

describe('account resolver', () => {
  // this should be a JSON fixture
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

//   test('position should be specific', async () => {
//     const players = await resolvers.Query.players()
//     expect(players[0].position).toBe('Shortstop')
//   })
})
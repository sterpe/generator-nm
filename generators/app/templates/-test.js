/* global
  jest
  describe
  it
  expect
*/

describe([
  '`jest`'
].join(' '), function () {
  it([
    'should test all',
    'the things'
  ].join(' '), function () {
    expect(jest).toBeTruthy()
  })
})

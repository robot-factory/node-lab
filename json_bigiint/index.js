const json = require('json-bigint')
const BN = require('bignumber.js')

const a = {
  value: json.parse('1234567890123456789')
}

console.log(json.stringify(json.parse('12345678901234567891234')))
import crypto from 'crypto'

let hash = crypto.createHash('sha1');
let hash1 = crypto.createHash('md5');
let sha2 = crypto.createHash('sha256').update('IloveYou');
// const argvElement = process.argv[1];
// console.log(argvElement)
hash.update('IloveYou');
hash1.update("IloveYou");
const hashResult = hash.digest('hex')
console.log(hashResult, typeof hashResult)
console.log(hash1.digest('hex'))
console.log(sha2.digest('hex'))
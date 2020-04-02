import {MAGIC_NUMBER_OFFSET} from './ReactFiberExpirationTime'
import {msToExpirationTime,expirationTimeToMs,computeAsyncExpiration} from './ReactFiberExpirationTime'

console.log("MAGIC_NUMBER_OFFSET", MAGIC_NUMBER_OFFSET)

let currentTime = 2000;
console.log(currentTime)
console.log(computeAsyncExpiration(currentTime))

currentTime = Date.now()/10000
console.log(msToExpirationTime(currentTime))

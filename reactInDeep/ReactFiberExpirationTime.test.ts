import {
  MAGIC_NUMBER_OFFSET,
  MAX_SIGNED_31_BIT_INT,
} from "./ReactFiberExpirationTime";
import {
  msToExpirationTime,
  expirationTimeToMs,
  computeAsyncExpiration,
} from "./ReactFiberExpirationTime";

console.log("MAGIC_NUMBER_OFFSET", MAGIC_NUMBER_OFFSET);

let currentTime = 2000;
console.log(currentTime);
console.log(computeAsyncExpiration(currentTime));

currentTime = 3000;
console.log(computeAsyncExpiration(msToExpirationTime(currentTime)), MAX_SIGNED_31_BIT_INT);

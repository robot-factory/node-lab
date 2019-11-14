import crypto from "crypto";

// 加密
function aesEncrypt(data: string, key: string) {
  let cipher = crypto.createCipheriv("aes256", key, "");
  let crypted = cipher.update(data, "utf8", "hex");
  return crypted + cipher.final("hex");
}

// 解码
function aesDecrypt(encrypt: string, key: string) {
  let decipher = crypto.createDecipheriv("aes256", key, "");
  let decrypted = decipher.update(encrypt, "hex", "utf8");
  return decrypted + decipher.final("utf8");
}

function encrypt(key: string, iv: string , data: string) {
  const decipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  // decipher.setAutoPadding(true);
  return decipher.update(data, "binary", "hex") + decipher.final("hex");
}

function decrypt(key: string, iv: string, crypted: string) {
  const cryptedBuf = Buffer.from(crypted, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  return decipher.update(cryptedBuf, "binary", "utf8") + decipher.final("utf8");
}

// let encrypt0 = encrypt(
//   "casino muffin zoo pool choice better ignore fiction reunion body play jar old pull scatter",
//   "abcdefg123456789",
//   Buffer.from("02117dc78866fe38", "hex")
// ); // 加密
// console.log(encrypt0); // 998118c1207f9e6fa5ee610c5bfd8ef0

// let data = decrypt(
//   encrypt0,
//   "abcdefg123456789",
//   Buffer.from("02117dc78866fe38", "hex")
// ); // 解密
// console.log(data); // data

const pubkey = '02117dc78866fe38b3831ff797172132b26d9ce43f6b8b0d0138799df46a8e9ec4'
let key = pubkey.substring(0,32);
console.log('加密的key:', key);
let iv = pubkey.substring(32,48);
console.log('加密的iv:', iv);
let data = "panel quote session strategy foot wall clever cover cup journey uniform lyrics lawn swap grunt";
console.log("需要加密的数据:", data);
let crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
let dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);
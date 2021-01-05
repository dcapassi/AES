const { encryptAES128,decryptAES128} = require("./AES_128")

const plainText = "This is secret!!"
const keyPlainText = "__myKey2020_!!!!"

let a = encryptAES128(plainText,keyPlainText)
let b = decryptAES128(a,keyPlainText)

console.log(b)


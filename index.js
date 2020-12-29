// AES 128bit Algorithm Study
//References:
//https://www.youtube.com/watch?v=X8whYEWoDSI
//https://kavaliro.com/wp-content/uploads/2014/03/AES.pdf
//https://www.youtube.com/watch?v=dRYHSf5A4lw

var start = new Date()
var hrstart = process.hrtime()
var simulateTime = 5

const rCon = [
  ["01", "02", "04", "08", "10", "20", "40", "80", "1b", "36"],
  ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00"],
];


const plainText = "Two One Nine Two"
const keyPlainText = "Thats my Kung Fu"

const state = plainToHex(plainText)
const key = plainToHex(keyPlainText)


/*
Only for Reference
const multMatrix = [
  ['2','3','1','1'],
  ['1','2','3','1'],
  ['1','1','2','3'],
  ['3','1','1','2'],
]*/

function plainToHex(plainText){
  let charArray = []
  let stateMatrix = []
  for ( let i = 0 ; i < plainText.length; i++){ 
    let char = (plainText[i])
    let hex = intToHex(char.charCodeAt(0))
    charArray.push(hex)
  }
  return stateMatrix = [
    [charArray[0],charArray[4],charArray[8],charArray[12]],
    [charArray[1],charArray[5],charArray[9],charArray[13]],
    [charArray[2],charArray[6],charArray[10],charArray[14]],
    [charArray[3],charArray[7],charArray[11],charArray[15]]
  ]
}

const mixCollums = (state) => {
  tempMatrix = []
  lineArray = []
  let hex1, hex2, hex3, hex4,tempIndex;

  //2 3 1 1   
  tempIndex = getHexIndex(state[0][0])
  hex1 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[1][0])
  hex2 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex3 = state[2][0]
  hex4 =  state[3][0]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][1])
  hex1 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[1][1])
  hex2 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex3 = state[2][1]
  hex4 =  state[3][1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][2])
  hex1 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[1][2])
  hex2 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex3 = state[2][2]
  hex4 =  state[3][2]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][3])
  hex1 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[1][3])
  hex2 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex3 = state[2][3]
  hex4 =  state[3][3]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  tempMatrix.push(lineArray)
  lineArray = []

  //1 2 3 1   
  hex1 = state[0][0]
  tempIndex = getHexIndex(state[1][0])
  hex2 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[2][0])
  hex3 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex4 =  state[3][0]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  hex1 = state[0][1]
  tempIndex = getHexIndex(state[1][1])
  hex2 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[2][1])
  hex3 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex4 =  state[3][1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)
  lineArray.push(intToHex(xor))

  hex1 = state[0][2]
  tempIndex = getHexIndex(state[1][2])
  hex2 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[2][2])
  hex3 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex4 =  state[3][2]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  hex1 = state[0][3]
  tempIndex = getHexIndex(state[1][3])
  hex2 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[2][3])
  hex3 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex4 =  state[3][3]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))



  tempMatrix.push(lineArray)
  lineArray = []

  //1 1 3 4
  hex1 = state[0][0]
  hex2 = state[1][0]
  tempIndex = getHexIndex(state[2][0])
  hex3 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[3][0])
  hex4 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  hex1 = state[0][1]
  hex2 = state[1][1]
  tempIndex = getHexIndex(state[2][1])
  hex3 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[3][1])
  hex4 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  hex1 = state[0][2]
  hex2 = state[1][2]
  tempIndex = getHexIndex(state[2][2])
  hex3 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  tempIndex = getHexIndex(state[3][2])
  hex4 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)


  lineArray.push(intToHex(xor))

  hex1 = state[0][3]
  hex2 = state[1][3]
  tempIndex = getHexIndex(state[2][3])
  hex3 = mul2[tempIndex[0]-1][tempIndex[1]-1]

  tempIndex = getHexIndex(state[3][3])

  hex4 = mul3[tempIndex[0]-1][tempIndex[1]-1]

  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))






  tempMatrix.push(lineArray)

  lineArray = []

    //3 1 1 2
  tempIndex = getHexIndex(state[0][0])
  hex1 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex2 = state[1][0]
  hex3 = state[2][0]
  tempIndex = getHexIndex(state[3][0])
  hex4 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][1])
  hex1 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex2 = state[1][1]
  hex3 = state[2][1]
  tempIndex = getHexIndex(state[3][1])
  hex4 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][2])
  hex1 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex2 = state[1][2]
  hex3 = state[2][2]
  tempIndex = getHexIndex(state[3][2])
  hex4 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  tempIndex = getHexIndex(state[0][3])
  hex1 = mul3[tempIndex[0]-1][tempIndex[1]-1]
  hex2 = state[1][3]
  hex3 = state[2][3]
  tempIndex = getHexIndex(state[3][3])
  hex4 = mul2[tempIndex[0]-1][tempIndex[1]-1]
  xor = stringToHex(hex1)^stringToHex(hex2)^stringToHex(hex3)^stringToHex(hex4)

  lineArray.push(intToHex(xor))

  

  tempMatrix.push(lineArray)


  return tempMatrix


}


const sBox = [
[null,	"0",	"1",	"2",	"3",	"4",	"5",	"6",	"7",	"8",	"9",	"a",	"b",	"c",	"d",	"e",	"f"],
["0",	"63",	"7c",	"77",	"7b",	"f2",	"6b",	"6f",	"c5",	"30",	"01",	"67",	"2b",	"fe",	"d7",	"ab",	"76"],
["1",	"ca",	"82",	"c9",	"7d",	"fa",	"59",	"47",	"f0",	"ad",	"d4",	"a2",	"af",	"9c",	"a4",	"72",	"c0"],
["2",	"b7",	"fd",	"93",	"26",	"36",	"3f",	"f7",	"cc",	"34",	"a5",	"e5",	"f1",	"71",	"d8",	"31",	"15"],
["3",	"04",	"c7",	"23",	"c3",	"18",	"96",	"05",	"9a",	"07",	"12",	"80",	"e2",	"eb",	"27",	"b2",	"75"],
["4",	"09",	"83",	"2c",	"1a",	"1b",	"6e",	"5a",	"a0",	"52",	"3b",	"d6",	"b3",	"29",	"e3",	"2f",	"84"],
["5",	"53",	"d1",	"00",	"ed",	"20",	"fc",	"b1",	"5b",	"6a",	"cb",	"be",	"39",	"4a",	"4c",	"58",	"cf"],
["6",	"d0",	"ef",	"aa",	"fb",	"43",	"4d",	"33",	"85",	"45",	"f9",	"02",	"7f",	"50",	"3c",	"9f",	"a8"],
["7",	"51",	"a3",	"40",	"8f",	"92",	"9d",	"38",	"f5",	"bc",	"b6",	"da",	"21",	"10",	"ff",	"f3",	"d2"],
["8",	"cd",	"0c",	"13",	"ec",	"5f",	"97",	"44",	"17",	"c4",	"a7",	"7e",	"3d",	"64",	"5d",	"19",	"73"],
["9",	"60",	"81",	"4f",	"dc",	"22",	"2a",	"90",	"88",	"46",	"ee",	"b8",	"14",	"de",	"5e",	"0b",	"db"],
["a",	"e0",	"32",	"3a",	"0a",	"49",	"06",	"24",	"5c",	"c2",	"d3",	"ac",	"62",	"91",	"95",	"e4",	"79"],
["b",	"e7",	"c8",	"37",	"6d",	"8d",	"d5",	"4e",	"a9",	"6c",	"56",	"f4",	"ea",	"65",	"7a",	"ae",	"08"],
["c",	"ba",	"78",	"25",	"2e",	"1c",	"a6",	"b4",	"c6",	"e8",	"dd",	"74",	"1f",	"4b",	"bd",	"8b",	"8a"],
["d",	"70",	"3e",	"b5",	"66",	"48",	"03",	"f6",	"0e",	"61",	"35",	"57",	"b9",	"86",	"c1",	"1d",	"9e"],
["e",	"e1",	"f8",	"98",	"11",	"69",	"d9",	"8e",	"94",	"9b",	"1e",	"87",	"e9",	"ce",	"55",	"28",	"df"],
["f",	"8c",	"a1",	"89",	"0d",	"bf",	"e6",	"42",	"68",	"41",	"99",	"2d",	"0f",	"b0",	"54",	"bb",	"16"]
]


const mul2 =
[
  ["00","02","04","06","08","0a","0c","0e","10","12","14","16","18","1a","1c","1e"],
  ["20","22","24","26","28","2a","2c","2e","30","32","34","36","38","3a","3c","3e"],
  ["40","42","44","46","48","4a","4c","4e","50","52","54","56","58","5a","5c","5e"],
  ["60","62","64","66","68","6a","6c","6e","70","72","74","76","78","7a","7c","7e"],
  ["80","82","84","86","88","8a","8c","8e","90","92","94","96","98","9a","9c","9e"],
  ["a0","a2","a4","a6","a8","aa","ac","ae","b0","b2","b4","b6","b8","ba","bc","be"],
  ["c0","c2","c4","c6","c8","ca","cc","ce","d0","d2","d4","d6","d8","da","dc","de"],
  ["e0","e2","e4","e6","e8","ea","ec","ee","f0","f2","f4","f6","f8","fa","fc","fe"],
  ["1b","19","1f","1d","13","11","17","15","0b","09","0f","0d","03","01","07","05"],
  ["3b","39","3f","3d","33","31","37","35","2b","29","2f","2d","23","21","27","25"],
  ["5b","59","5f","5d","53","51","57","55","4b","49","4f","4d","43","41","47","45"],
  ["7b","79","7f","7d","73","71","77","75","6b","69","6f","6d","63","61","67","65"],
  ["9b","99","9f","9d","93","91","97","95","8b","89","8f","8d","83","81","87","85"],
  ["bb","b9","bf","bd","b3","b1","b7","b5","ab","a9","af","ad","a3","a1","a7","a5"],
  ["db","d9","df","dd","d3","d1","d7","d5","cb","c9","cf","cd","c3","c1","c7","c5"],
  ["fb","f9","ff","fd","f3","f1","f7","f5","eb","e9","ef","ed","e3","e1","e7","e5"],
];

const mul3 = 
[
  ["00","03","06","05","0c","0f","0a","09","18","1b","1e","1d","14","17","12","11"],
  ["30","33","36","35","3c","3f","3a","39","28","2b","2e","2d","24","27","22","21"],
  ["60","63","66","65","6c","6f","6a","69","78","7b","7e","7d","74","77","72","71"],
  ["50","53","56","55","5c","5f","5a","59","48","4b","4e","4d","44","47","42","41"],
  ["c0","c3","c6","c5","cc","cf","ca","c9","d8","db","de","dd","d4","d7","d2","d1"],
  ["f0","f3","f6","f5","fc","ff","fa","f9","e8","eb","ee","ed","e4","e7","e2","e1"],
  ["a0","a3","a6","a5","ac","af","aa","a9","b8","bb","be","bd","b4","b7","b2","b1"],
  ["90","93","96","95","9c","9f","9a","99","88","8b","8e","8d","84","87","82","81"],
  ["9b","98","9d","9e","97","94","91","92","83","80","85","86","8f","8c","89","8a"],
  ["ab","a8","ad","ae","a7","a4","a1","a2","b3","b0","b5","b6","bf","bc","b9","ba"],
  ["fb","f8","fd","fe","f7","f4","f1","f2","e3","e0","e5","e6","ef","ec","e9","ea"],
  ["cb","c8","cd","ce","c7","c4","c1","c2","d3","d0","d5","d6","df","dc","d9","da"],
  ["5b","58","5d","5e","57","54","51","52","43","40","45","46","4f","4c","49","4a"],
  ["6b","68","6d","6e","67","64","61","62","73","70","75","76","7f","7c","79","7a"],
  ["3b","38","3d","3e","37","34","31","32","23","20","25","26","2f","2c","29","2a"],
  ["0b","08","0d","0e","07","04","01","02","13","10","15","16","1f","1c","19","1a"]
];

const hexIndex = [null,	"0",	"1",	"2",	"3",	"4",	"5",	"6",	"7",	"8",	"9",	"a",	"b",	"c",	"d",	"e",	"f"]
    

function getHexIndex (hexa) {
  const hexIndex = [null,	"0",	"1",	"2",	"3",	"4",	"5",	"6",	"7",	"8",	"9",	"a",	"b",	"c",	"d",	"e",	"f"]
  const hexIndexOutput = []
  hexIndexOutput.push(hexIndex.findIndex( entry => entry === hexa[0]))
  hexIndexOutput.push(hexIndex.findIndex( entry => entry === hexa[1]))
  return hexIndexOutput

}

function transpose(matrix){
  let transposedLine = []
  let transposedMatrix= []
  for (let i = 0; i < 4; i++){
    for (let k = 0; k < 4; k++){
      transposedLine.push(matrix[k][i])
    }
    transposedMatrix.push(transposedLine)
    transposedLine = []
  }
  return transposedMatrix
}



function subGeneration(matrix) {
  let subMatrix = [];
  subMatrix = matrix.map(entry => entry.map(item => subByte(item)))
  return subMatrix;
}

function keyGeneration(key,round) {
  let keyMatrix = [];
  let keyVector = [key[0][3],key[1][3],key[2][3],key[3][3]]
  let rotWordVector = rotWord(keyVector)
  let newVector = rotWordVector.map(entry => subByte(entry))

  let collumn = []

  let xor;

  for (i = 0; i <= 3; i++){

    xor = (stringToHex(key[i][0])^stringToHex(newVector[i])^stringToHex(rCon[i][round-1]))
    collumn.push(intToHex(xor))
  }

  keyMatrix.push(collumn)
  collumn = []

  for (i = 0; i <= 3; i++){

    xor = (stringToHex(keyMatrix[0][i])^stringToHex(key[i][1]))

    collumn.push(intToHex(xor))
  }

  keyMatrix.push(collumn)
  collumn = []

  for (i = 0; i <= 3; i++){

    xor = (stringToHex(keyMatrix[1][i])^stringToHex(key[i][2]))
    collumn.push(intToHex(xor))
  }

  keyMatrix.push(collumn)
  collumn = []

  for (i = 0; i <= 3; i++){

    xor = (stringToHex(keyMatrix[2][i])^stringToHex(key[i][3]))
    collumn.push(intToHex(xor))
  }

  keyMatrix.push(collumn)
  collumn = []

  return transpose(keyMatrix);
}



function shiftRowTransformation(matrix){
  let shiftMatrix = []
  return shiftMatrix = [
                       [matrix[0][0],matrix[0][1],matrix[0][2],matrix[0][3]],
                       [matrix[1][1],matrix[1][2],matrix[1][3],matrix[1][0]],
                       [matrix[2][2],matrix[2][3],matrix[2][0],matrix[2][1]],
                       [matrix[3][3],matrix[3][0],matrix[3][1],matrix[3][2]],
                       ]
}


function rotWord(vector) {
    newVector = []
    newVector.push(vector[1])
    newVector.push(vector[2])
    newVector.push(vector[3])
    newVector.push(vector[0])
    return newVector;
  }

  function subByte(byte) {
    const rowCollumArray = getHexIndex(byte)
    const row = rowCollumArray[1]
    const collum = rowCollumArray[0]
    return sBox[collum][row]
    }


  function generateKeyArray (key){

    let keyArray = []
    let newKey = key
    keyArray.push(key)

    for (let i = 1 ; i <= 10; i++){
      newKey = (keyGeneration(newKey,i))
      keyArray.push(newKey)
    }

    return keyArray

  }


keyArray = generateKeyArray(key)


function stringToHex(string) {
return Buffer.from(string, 'hex')[0]
}

function intToHex(int) {
  hexString = int.toString(16);
  if (hexString.length===1){
    hexString = '0'+hexString[0]
  }
  return hexString;
}


function xorMatrix(matrixA,matrixB){
  let xorMatrix = []
  let xorRow = []

  for(let i = 0; i < 4; i++){
    for (let k = 0; k < 4; k++){
      xor = intToHex(stringToHex(matrixA[i][k])^stringToHex(matrixB[i][k]))
      xorRow.push(xor)
    }
    xorMatrix.push(xorRow)
    xorRow = []
  }

return xorMatrix

}



// AES ALGORITHM //

//XOR of the State Matrix and Roundkey No.0 Matrix:
//Add Round Key
let newStateMatrix = xorMatrix(state,keyArray[0])



// ROUNDs

for (let i = 1; i <= 9; i++){

//SubBytes

let subBytesMatrix = subGeneration(newStateMatrix)



//ShiftRows
let shifRowMatrix = shiftRowTransformation(subBytesMatrix)


//Mix Collums
let mixCollumsMatrix = mixCollums(shifRowMatrix)


newStateMatrix = xorMatrix(mixCollumsMatrix,keyArray[i])

}

//Last Round

let subBytesMatrix = subGeneration(newStateMatrix)

let shifRowMatrix = shiftRowTransformation(subBytesMatrix)

newStateMatrix = xorMatrix(shifRowMatrix,keyArray[10])



var end = new Date() - start,
hrend = process.hrtime(hrstart)

console.info('Execution time: %dms', end)
console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)















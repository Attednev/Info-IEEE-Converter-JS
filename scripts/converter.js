
function getHexadecimalRepresentation(binString) {
    let binArray = Array.from(binString).map(Number);
    let hexSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexString = "";
    for (let i = binArray.length; i > 0; i-= 4) {
        let tmpArr = binArray.slice(i - 4, i);
        let index = binaryArrayToNum(tmpArr);
        hexString = hexSet[index] + hexString;
    }
    return "0x" + hexString;
}

function binaryArrayToNum(arr) {
    let num = 0;
    for (let i = arr.length - 1, exp = 0; i >= 0; i--, exp++) {
        num += arr[i] * (1 << exp);
    }
    return num;
}

function convert(num) {
    let wholeNumber = Math.floor(Math.abs(num));
    let decimalNumber = Math.abs(num) - wholeNumber;
    let wholeBinaryNumber = numToBinary(wholeNumber);
    let decimalBinaryNumber = decimalToBinary(decimalNumber);

    let mantissa = wholeBinaryNumber.slice(1).concat(decimalBinaryNumber);
    //let hidden = numberArray[0];

    let exponentWholeNumber = mantissa.length - decimalBinaryNumber.length;
    let biasWholeNumber = (1 << exponentWholeNumber - 1) - 1;
    let biasedExponent = exponentWholeNumber + biasWholeNumber;

    let exponentBinary = numToBinary(biasedExponent);
    let signBit = (num < 0 ? 1 : 0);
    exponentBinary = new Array(8 - exponentBinary.length).fill(0).concat(exponentBinary);
    mantissa = mantissa.concat(new Array(23 - mantissa.length).fill(0));

    return ([signBit].concat(exponentBinary).concat(mantissa)).join().replaceAll(",", "");
}

function numToBinary(num) {
    let arr = [];
    do {
        arr.push(num % 2);
    } while ((num = Math.floor(num / 2)) !== 0);
    return arr.reverse();
}

function decimalToBinary(num) {
    let arr = [];
    do {
        arr.push(Math.floor(num * 2));
    } while ((num = (num * 2) % 1) !== 0 && arr.length <= 16);
    return arr;
}


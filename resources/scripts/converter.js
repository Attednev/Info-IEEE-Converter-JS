
function convert() {
    let num = document.getElementById("userInput").value;
    let ieee = numToIEEE(num);
    let hex = ieeeToHex(ieee);
    document.getElementById("floatIEEE").innerHTML = ieee;
    document.getElementById("floatHex").innerHTML = hex;
}

function ieeeToHex(binString) {
    let hexSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexString = "";
    for (let i = 0; i < binString.length - 1; i += 4) {
        let index = binaryStringToNum(binString.substr(i, 4));
        hexString += hexSet[index];
    }
    return "0x" + hexString;
}

function numToIEEE(num) {
    let wholeNumber = Math.floor(Math.abs(num));
    let fraction = Math.abs(num) - wholeNumber;
    let binaryNumber = numToBinaryString(wholeNumber);
    let binaryFraction = fractionToBinaryString(fraction);

    let sig = num < 0 ? 1 : 0;
    let man = binaryNumber.substr(1).concat(binaryFraction).padEnd(23, "0");
    let exp = numToBinaryString(127 + (binaryNumber.length - 1));

    return (sig + exp + man);
}

function numToBinaryString(num) {
    let n = "";
    for (let i = num; i !== 0; i = Math.floor(i / 2)) {
        n = (i % 2) + n;
    }
    return n;
}

function fractionToBinaryString(num) {
    let n = "";
    for (let i = num; i !== 0 && n.length <= 16; i = (i * 2) % 1) {
        n += Math.floor(i * 2);
    }
    return n;
}

function binaryStringToNum(str) {
    let num = 0;
    for (let i = str.length - 1, exp = 0; i >= 0; i--, exp++) {
        num += str.charAt(i) * (1 << exp);
    }
    return num;
}



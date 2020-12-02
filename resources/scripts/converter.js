
function reverse() {
    let binaryString = "";
    let buttons = document.getElementsByClassName("box");
    for (let i = 0; i < buttons.length; i++) {
        binaryString += (buttons.item(i).classList.contains("filled") ? "1" : "0");
        if (i === 0 || i === 8) {
            binaryString += " ";
        }
    }
    document.getElementById("floatIEEE").innerHTML = binaryString;
    document.getElementById("floatHex").innerHTML = ieeeToHex(binaryString.replaceAll(" ", "")); // TODO CHECK IF THIS IS CORRECT
    document.getElementById("userInput").value = getNumberFromIee(binaryString);
}

function convert() {
    let num = document.getElementById("userInput").value;
    let ieee = numToIEEE(num);
    document.getElementById("floatHex").innerHTML = ieeeToHex(ieee.replaceAll(" ", ""));
    document.getElementById("floatIEEE").innerHTML = ieee;
    setButtonValues(ieee.replaceAll(" ", ""));
}

function getNumberFromIee(binaryString) {
    let parts = binaryString.split(" ");
    let shift = binaryStringToNum(parts[1]) - 127;
    let dec = binaryStringToNum("1" + parts[2].substring(0, shift));
    return (parts[0] === "0" ? dec : -dec);
}

function setButtonValues(binString) {
    let buttons = document.getElementsByClassName("box");
    for (let i = 0; i < buttons.length; i++) {
        if (binString.charAt(i) === '1') {
            buttons.item(i).classList.add("filled");
        } else {
            buttons.item(i).classList.remove("filled");
        }
    }
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
    let man = binaryNumber.substr(1).concat(binaryFraction).padEnd(23, '0').substring(0, 23);
    let exp = numToBinaryString(127 + (binaryNumber.length - 1)).padStart(8, '0').substring(0, 8);

    return (sig + " " + exp + " " + man);
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

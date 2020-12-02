function convert() {
    let num = document.getElementById("userInput").value;
    let ieee = numToIEEE(num); // TODO Weird stuff
    console.log(num + " -> " + ieee);
    setValues(ieee)
    setButtonStates(ieee.replaceAll(" ", ""));
}

function numToIEEE(num) {
    let binaryNum = num.toString(2).split(".");
    let number = binaryNum[0];
    let fraction = (binaryNum.length > 1 ? binaryNum[1] : "0");
    [fraction, bias] = shiftDecimalPoint(number, fraction, number === "0");

    let sig = num < 0 ? 1 : 0;
    let exponent = bias.toString(2).padStart(8, '0').substring(0, 8);
    let mantissa = fraction.padEnd(23, '0').substring(0, 23);

    return (sig + " " + exponent + " " + mantissa);
}

function shiftDecimalPoint(number, fraction, mode) {
    let arr = (mode ? fraction : number);
    for (let i = 0; i < arr.length; i++) {
        if (arr.charAt(i) === '1') {
            let retArr = (mode ? arr.substr(i + 1) : arr.substring(i + 1) + fraction);
            let retBias = 127 + (mode ? -(i + 1) : number.length - i - 1);
            return [retArr, retBias];
        }
    }
    return [fraction, 127];
}

function setValues(value) {
    document.getElementById("floatIEEE").innerHTML = value;
    document.getElementById("floatHex").innerHTML = ieeeToHex(value.replaceAll(" ", ""));
}



function reverse() {
    let binaryString = "";
    let buttons = document.getElementsByClassName("box");
    for (let i = 0; i < buttons.length; i++) {
        binaryString += (buttons.item(i).classList.contains("filled") ? "1" : "0");
        if (i === 0 || i === 8) {
            binaryString += " ";
        }
    }
    setValues(binaryString);
    document.getElementById("userInput").value = ieeeToNum(binaryString);
}

function ieeeToNum(binaryString) {
    let parts = binaryString.split(" ");
    let sign = Math.pow(-1, parseInt(parts[0], 2));
    let exponentValue = parseInt(parts[1], 2);
    let mantissaValue = parseInt(parts[2], 2);
    let bias = exponentValue - 127;

    // Check for special values
    if (exponentValue === 0 && mantissaValue === 0) {
        return 0;
    }  else if (exponentValue === 0) {
        return (sign * getDenormalizedNumber(parts[2]));
    } else if (exponentValue === 255 && mantissaValue === 0) {
        return Infinity;
    } else if (exponentValue === 255) {
        return NaN;
    }
    return (sign * getNormalizedNumber(bias, parts[2]));

}

function getNormalizedNumber(bias, mantissa) {
    let m = 0;
    for (let i = 0; i < mantissa.length; i++) {
        if (mantissa.charAt(i) === '1') {
            m += Math.pow(2, -(i + 1));
        }
    }
    return ((1 + m) * Math.pow(2, bias));
}

function getDenormalizedNumber(mantissa) {
    let num = 0;
    for (let i = 0; i < mantissa.length; i++) {
        if (mantissa.charAt(i) === '1') {
            num += Math.pow(2, -(127 + i));
        }
    }
    return num;
}

function setButtonStates(binString) {
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
        let index = parseInt(binString.substr(i, 4), 2);
        hexString += hexSet[index];
    }
    return "0x" + hexString;
}

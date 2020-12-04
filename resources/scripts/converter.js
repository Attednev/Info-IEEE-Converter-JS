function convert() {
    let num = document.getElementById("userInput").value;
    const regex = /(-|\+)?((Infinity)|(NaN)|(\d+)(\.\d+)?(e(-|\+)?\d+(\.\d+)?)?)/;
    if (regex.test(num)) {
        let ieee = numToIEEE(parseFloat(num));
        setValues(ieee)
        setButtonStates(ieee.replaceAll(" ", ""));
    } else {
        alert("Not a valid number");
    }
}

function numToIEEE(num) {
    if (num === 0) {
        return "0 00000000 00000000000000000000000";
    } else if (num === Infinity) {
        return "0 11111111 00000000000000000000000";
    } else if (isNaN(num)) {
        return "0 11111111 11111111111111111111111";
    }
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
    let parts = value.split(" ");
    let decs = $(".visualDecimalBox");
    for (let i = 0; i < decs.length; i++) {
        decs[i].innerHTML = parseInt(parts[i], 2);
    }
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
        return (sign * transformNumber(127, parts[2]));
    } else if (exponentValue === 255 && mantissaValue === 0) {
        return Infinity;
    } else if (exponentValue === 255) {
        return "NaN";
    }
    return (sign * (1 + transformNumber(1, parts[2])) * Math.pow(2, bias));

}

function transformNumber(biasedExponent, mantissa) {
    let num = 0;
    for (let i = 0; i < mantissa.length; i++) {
        if (mantissa.charAt(i) === '1') {
            num += Math.pow(2, -(biasedExponent + i));
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
    for (let i = 0; i < binString.length; i += 4) {
        let index = parseInt(binString.substr(i, 4), 2);
        hexString += hexSet[index];
    }
    return "0x" + hexString;
}

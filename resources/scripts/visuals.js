
function showConversionResult() {
    let num = convert();
    if (num === undefined) {
        $("#errorPopup").animate({ opacity: 1 }, 300, "swing", () => {
            $("#errorPopup").delay(4000).animate({opacity: 0}, 300);
        });
    } else {
        setVisualValues(num)
        setButtonStates(num.replaceAll(" ", ""));
    }
}

function showReverseResult() {
    let str = reverse();
    setVisualValues(str);
    document.getElementById("userInput").value = ieeeToNum(str);
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

function setVisualValues(value) {
    document.getElementById("floatIEEE").innerHTML = value;
    document.getElementById("floatHex").innerHTML = ieeeToHex(value.replaceAll(" ", ""));
    let parts = value.split(" ");
    let decs = $(".visualDecimalBox");
    for (let i = 0; i < decs.length; i++) {
        decs[i].innerHTML = parseInt(parts[i], 2);
    }
}

<div class="position-relative">
    <table class="table table-dark input">
        <tr>
            <td class="caption">Decimal number</td>
            <td class="inputDiv">
                <input id="userInput" type="text" placeholder="Enter your number">
                <button onclick="showConversionResult()">Start</button>
            </td>
        <tr>
            <td class="caption">Binary representation</td>
            <td id="floatIEEE"></td>
        </tr>
        <tr>
            <td class="caption">Hexadecimal representation</td>
            <td id="floatHex"></td>
        </tr>
    </table>
    <div id="errorPopup" class="alert alert-primary" role="alert">
        Not a valid input. Please enter: a number, "Infinity", "-Infinity" or "NaN
    </div>
</div>

<div class="d-flex justify-content-center align-content-center flex-wrap">
    <div class='text-light boxContainer'>
        <div>Sign</div>
        <div class="visualDecimalBox">0</div>
        <div class='box'></div>
    </div>
    <div class='text-light boxContainer'>
        <div>Exponent</div>
        <div class="visualDecimalBox">0</div>
        <div class='d-flex'>
            <?php
            $html = "";
            for ($j = 0; $j < 8; $j++) {
                $html .= "<div class='box'></div>";
            }
            echo $html;
            ?>
        </div>
    </div>
    <div class='text-light boxContainer'>
        <div>Mantissa</div>
        <div class="visualDecimalBox">0</div>
        <div class='d-flex'>
            <?php
            $html = "";
            for ($j = 0; $j < 23; $j++) {
                $html .= "<div class='box'></div>";
            }
            echo $html;
            ?>
        </div>
    </div>
    <script>
        $(".box").on("click", (e) => {
            $(e.target).toggleClass("filled");
            showReverseResult();
        });
    </script>
</div>

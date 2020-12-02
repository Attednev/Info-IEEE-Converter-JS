<table class="table table-dark input">
    <tr>
        <td class="caption">Decimal number</td>
        <td class="inputDiv">
            <input id="userInput" type="number" placeholder="Enter your number">
            <button onclick="convert()">Start</button>
        </td>
    </tr>
    <tr>
        <td class="caption">Binary representation</td>
        <td id="floatIEEE"></td>
    </tr>
    <tr>
        <td class="caption">Hexadecimal representation</td>
        <td id="floatHex"></td>
    </tr>
</table>
<div class="container d-flex flex-row justify-content-center align-content-center">
    <?php
    $names = ["Sign", "Exponent", "Mantissa"];
    $numberBoxes = [1, 8, 23];
    $html = "";
    for ($i = 0; $i < 3; $i++) {
        $class = 'text-light boxContainer' . ($i == 1 ? ' borderLeftNone borderRightNone' : '');
        $html .= "<div class='" . $class . "'> <div>" . $names[$i] . "</div> <div class='d-flex'>";
        for ($j = 0; $j < $numberBoxes[$i]; $j++) {
            $html .= "<div class='box'></div>";
        }
        $html .= "</div></div>";
    }
    echo $html;
    ?>
    <script>
        $(".box").on("click", (e) => {
            $(e.target).toggleClass("filled");
            reverse();
        });
    </script>
</div>

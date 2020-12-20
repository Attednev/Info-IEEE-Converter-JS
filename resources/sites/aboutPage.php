<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=default'></script>

<div class="accordion mt-5" id="aboutBoxes">
    <?php
    $header = ["What is IEEE-754", "Why should you use IEEE-754", "How IEEE-754 works", "Special values",     "Floating point number to IEEE-754 representation", "IEEE-754 representation to Floating point number"];
    $files =  ["WhatIsIEEE.html",  "WhyIEEE.html",                "HowItWorks.html",    "SpecialValues.html", "NumToIEEE.html",                                   "IEEEToNum.html"];
    $id =     ["what",             "why",                         "how",                "sv",                 "nTi",                                              "iTn"];
    for ($i = 0; $i < min(count($files), count($header)); $i++) {
        echo "
            <button style='background-color: #2b2b2b; font-size: 1.5rem; color: #4b93ff' type='button' class='btn w-100 text-left' data-toggle='collapse' data-target='#" . $id[$i] . "'>" . $header[$i] . "</button>
            <div id='" . $id[$i] . "' class='collapse collapseBox'></div>
            <script>$('#" . $id[$i] . "').load('resources/texts/" . $files[$i] . "')</script>
        ";
    }
    echo "<div style='margin: 10vh 0' />";
    ?>
</div>

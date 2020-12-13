<div class="accordion mt-5" id="accordionExample">
    <?php
    $header = ["What is IEEE-754", "Why should you use IEEE-754", "How IEEE-754 works", "Special values",     "Floating point number to IEEE-754 representation", "IEEE-754 representation to Floating point number"];
    $files =  ["WhatIsIEEE.html",  "WhyIEEE.html",                "HowItWorks.html",    "SpecialValues.html", "NumToIEEE.html",                                    "IEEEToNum.html"];
    for ($i = 0; $i < min(count($files), count($header)); $i++) {
        echo "
    <div class='card' style='background-color: #2b2b2b'>
        <div class='card-header' id='heading" . $i . "'>
            <h2 class='mb-0 text-light'>
                <button class='btn btn-link btn-block text-left text-light collapsed font25' type='button' data-toggle='collapse'
                        data-target='#collapse" . $i . "' aria-expanded='false' aria-controls='collapse" . $i . "'>
                    " . $header[$i] . "
                </button>
            </h2>
        </div>
        <div id='collapse" . $i . "' class='collapse' aria-labelledby='heading" . $i . "' data-parent='#accordionExample'>
            <div class='card-body text-light' style='height: 300px'>
                <embed src='resources/texts/" . $files[$i] . "' />
            </div>
        </div>
    </div>";
    }
    echo "<div style='margin: 10vh 0' />";
    ?>
</div>

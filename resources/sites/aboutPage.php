<div class="accordion mt-5" id="accordionExample">
    <?php
    $header = ["What it IEEE-754", "Why should you use IEEE-754", "Floating point number to IEEE-754 representation", "IEEE-754 representation to Floating point number"];
    $files = ["WhatIsIEEE.txt", "WhyIEEE.txt", "NumToIEEE.txt", "IEEEToNum.txt"];
    for ($i = 0; $i < min(count($files), count($header)); $i++) {
        echo "
    <div class='card bg-secondary'>
        <div class='card-header' id='heading" . $i . "'>
            <h2 class='mb-0 text-light'>
                <button class='btn btn-link btn-block text-left text-light collapsed font25' type='button' data-toggle='collapse'
                        data-target='#collapse" . $i . "' aria-expanded='false' aria-controls='collapse" . $i . "'>
                    " . $header[$i] . "
                </button>
            </h2>
        </div>
        <div id='collapse" . $i . "' class='collapse' aria-labelledby='heading" . $i . "' data-parent='#accordionExample'>
            <div class='card-body text-light'>
                <embed src='resources/texts/" . $files[$i] . "'>
            </div>
        </div>
    </div>";
    }
    ?>
</div>
var time_limit = 60;

var content_array = [
    "What are the core technologies used in web development?",
    "The core technologies used in web development are HTML, CSS, and JavaScript.",
    "CSS, or Cascading Style Sheets, is used to control the presentation of web pages, including layouts, colors, fonts, and other visual elements",
    "JavaScript is a powerful scripting language that enables interactive features on web pages, such as form validation, dynamic content updates, and animations.",
    "Responsive design ensures that websites and applications work well on a variety of devices, from desktops to smartphones, using techniques like media queries, flexible grids, and responsive images.",
    "Continuous learning is important because technology evolves rapidly. Web developers must stay updated with the latest trends and best practices to create effective, efficient, and engaging online experiences."
];

var wpm_Text = document.querySelector(".wpm-content");
var cpm_Text = document.querySelector(".cpm-content");
var error_Text = document.querySelector(".error-content");
var accuracy_Text = document.querySelector(".accuracy-content");
var timer_Text = document.querySelector(".timer-content");
var content_Text = document.querySelector(".content");
var inputBox = document.querySelector(".input-box");
var wpm_Group = document.querySelector(".wpm");
var cpm_Group = document.querySelector(".cpm");
var error_Group = document.querySelector(".error");
var timer_Group = document.querySelector(".timer");
var start_btn = document.querySelector(".start");
var restart_btn = document.querySelector(".restart");
var accuracy_Group = document.querySelector(".accuracy");

var timeLeft = time_limit;
var timeElapsed = 0;
var errors = 0;
var totalErrors = 0;
var accuracy = 0;
var charactersTyped = 0;
var currentContent = "";
var contentNo = 0;
var timer = null;

function updateContent() {
    content_Text.textContent = "";
    currentContent = content_array[contentNo];

    currentContent.split('').forEach(character => {
        var characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        content_Text.appendChild(characterSpan);
    });

    if (contentNo < content_array.length - 1) {
        contentNo++;
    } else {
        contentNo = 0;
    }
}

function inputText() {
    var input = inputBox.value;
    var inputArray = input.split('');

    charactersTyped++;

    errors = 0;

    var quoteSpanArray = content_Text.querySelectorAll('span');

    quoteSpanArray.forEach((char, index) => {
        var typed = inputArray[index];
        if (typed == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        } else if (typed === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });

    error_Text.textContent = totalErrors + errors;

    var correctCharacters = (charactersTyped - (totalErrors + errors));
    var accuracyValue = ((correctCharacters / charactersTyped) * 100);
    accuracy_Text.textContent = Math.round(accuracyValue);

    if (input.length == currentContent.length) {
        updateContent();
        totalErrors += errors;
        inputBox.value = "";
    }
}

function startGame() {
    content_Text.style.display = "block";
    // restart_btn.style.display = "none";
    // start_btn.style.display = "block";

    resetGame();
    updateContent();
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetGame() {
    timeLeft = time_limit;
    timeElapsed = 0;
    errors = 0;
    totalErrors = 0;
    accuracy = 100;
    charactersTyped = 0;
    contentNo = 0;
    inputBox.disabled = false;
    inputBox.value = "";
    // content_Text.textContent = "";
    accuracy_Text.textContent = 100;
    timer_Text.textContent = timeLeft + "s";
    error_Text.textContent = 0;
    restart_btn.style.display = "block";
    start_btn.style.display = "none";
    wpm_Group.style.display = "none";
    cpm_Group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timer_Text.textContent = timeLeft + "s";
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    inputBox.disabled = true;
    content_Text.style.display = "none";
    var wpm = Math.round(((charactersTyped / 5) / timeElapsed) * 60);
    var cpm = Math.round((charactersTyped / timeElapsed) * 60);
    cpm_Text.textContent = cpm;
    wpm_Text.textContent = wpm;
    restart_btn.style.display = "none";
    start_btn.style.display = "block";
    wpm_Group.style.display = "block";
    cpm_Group.style.display = "block";
}


start_btn.addEventListener("click", startGame);
restart_btn.addEventListener("click", resetGame);
inputBox.addEventListener("input", inputText);

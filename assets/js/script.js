//variables declarations
let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
var introEl = document.querySelector("#intro");
var questionsEl = document.querySelector("#quizs");
let questionEl = document.querySelector("#quiz");
let questionCount = 0;
var hrEl = document.querySelector("#hr");
var finalEl = document.querySelector("#my_score");
let initialsInput = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];
var ansBtn = document.querySelectorAll("button.ansBtn")
var ans1Btn = document.querySelector("#ans_1");
var ans2Btn = document.querySelector("#ans_2");
var ans3Btn = document.querySelector("#ans_3");
var ans4Btn = document.querySelector("#ans_4");
var submitScrBtn = document.querySelector("#submit-score");
var goBackBtn = document.querySelector("#goback");
var clearScrBtn = document.querySelector("#clearscores");
var viewScrBtn = document.querySelector("#scores");var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", questions_start);

//create variariable quizes in an array
var questions = [ // array of objects
    {
        question: "Which will return True for variables y=3 and var x='2'?",
        answers: ["1. x>y", "1. x<y", "3. x==y", "4. x===y"],
        correctAnswer: "2"
    },
    {
        question: "____operator when used to add two numbers, outputs a number. The same operator when used to add two strings, outputs the concatenated string.",
        answers: ["1. +", "2. -", "3. *", "4. /"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "The ______ operator compares values and not types",
        answers: ["1. =", "2. ==", "3. ===", "4. !="],
        correctAnswer: "2"
    },
    {
        question: "which one is not a method in javascript?",
        answers: ["1. call()", "2. apply()", "3. bind()", "4. function{}"],
        correctAnswer: "3"
    }
];
//create questions start function for the timer and question counter
function questions_start() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    scroll_quiz(questionCount);
}

//function to scroll through questions
function scroll_quiz(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

//add timer 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

//check the answer if wrong or right then jump to next
function checkAnswer(event) {
    event.preventDefault();

    // show section for wrong/right
    hrEl.style.display = "block";
    let p = document.createElement("p");
    hrEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    scroll_quiz(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Add to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});

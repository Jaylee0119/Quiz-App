var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", questions_start);

//create variariable quizes in an array
const questions = [ // array of objects
    {
        // question 0
        question: "Which will return True if var y=3 and var x='2' ?",
        answers: ["1. x>y", "1. x<y", "3. x==y", "4. x===y"],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "____operator when used to add two numbers, outputs a number. The same operator when used to add two strings, outputs the concatenated string.",
        answers: ["1. +", "2. -", "3. *", "4. /"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "The ______ operator compares values and not types",
        answers: ["1. =", "2. ==", "3. ===", "4. !="],
        correctAnswer: "2"
    },
    {
        // question 4
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
    setQuestion(questionCount);
}
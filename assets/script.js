let questionDisplay = document.getElementById("question");
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
const questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts",
    },
    {
        question: "The condition in an if/else statement is enclosed with __.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: "parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store __.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above",
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correct: "quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["javascript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log",
    }
]
let question;

function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    document.querySelector(".answers").style.display = "block";
    displayQuestion();
}

function displayQuestion() {
    // selects a random question from the questions array
    question = questions[Math.floor(Math.random() * questions.length)];
    // assigns the question text to the questionDisplay element
    questionDisplay.textContent = question.question;

    // itterates through the answers to the question
    for (let i = 0; i < question.answers.length; i++) {
        // finds our button elements and assigns them to a variable
        let btn = document.getElementById("btn" + (i + 1));
        // assigns the button text to the answers for the question
        btn.textContent = question.answers[i];
        // adds an event listener to the button
        btn.addEventListener("click", checkAnswer);
    }
}

function checkAnswer() {
    // hide the correct and wrong display
    correctDisplay.style.display = "none";
    wrongDisplay.style.display = "none";
    // checks if the user clicked on the correct answer
    if (question.correct === this.textContent) {
        correctDisplay.style.display = "block";
    } else {
        wrongDisplay.style.display = "block";
    }
}
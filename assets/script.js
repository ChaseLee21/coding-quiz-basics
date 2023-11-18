let questionDisplay = document.getElementById("question");
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
let timeDisplay = document.getElementById("timeDisplay");
let leaderBoard = document.getElementById("leaderBoard");
let quiz = document.getElementById("quiz");
let submitScore = document.getElementById("submitScore");
let submitScoreBtn = document.getElementById("submitScoreBtn");
let scoresDisplay = document.getElementById("scores");
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
let timer;
let timeLeft = 75;

function startQuiz() {
    //remove the start button
    document.getElementById("startButton").style.display = "none";
    //display the answer buttons
    document.querySelector(".answers").style.display = "block";
    //start the timer
    timeDisplay.textContent = "Time: " + timeLeft;
    timer = setInterval(function (){
        timeLeft--;
        timeDisplay.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            showScore();
        }
    }, 1000);
    //display the first question
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
        timeLeft -= 10;
    }

    // removes the question from the questions array
    questions.splice(questions.indexOf(question), 1);

    // checks if there are any questions left
    if (questions.length === 0) {
        // if not, end the quiz
        showScore();
    } else {
        // displays a new question
        displayQuestion();
    }
}

function showScore() {
    clearInterval(timer);
    submitScore.style.display = "flex";
    quiz.style.display = "none";
}

function showLeaderBoard() {
    clearInterval(timer);
    quiz.style.display = "none";
    submitScore.style.display = "none";
    leaderBoard.style.display = "flex";
    let scores = JSON.parse(localStorage.getItem("scores"));
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    scoresDisplay.innerHTML = "";
    for (let score of scores) {
        let li = document.createElement("li");
        li.textContent = score.initials + ": " + score.score;
        scoresDisplay.appendChild(li);
    }
}

function startScreen() {
    window.location.reload();
}

function resetLeaderBoard() {
    localStorage.removeItem("scores");
    scoresDisplay.innerHTML = "";
}

submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let score = {
        score: timeLeft,
        initials: document.getElementById("initials").value
    }
    let scores = JSON.parse(localStorage.getItem("scores"));
    if (scores === null) {
        scores = [];
    } 
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
    showLeaderBoard();
});
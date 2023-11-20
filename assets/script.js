// Global variables
let questionDisplay = document.getElementById("question");
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
let timeDisplay = document.getElementById("timeDisplay");
let leaderBoard = document.getElementById("leaderBoard");
let quiz = document.getElementById("quiz");
let submitScore = document.getElementById("submitScore");
let submitScoreBtn = document.getElementById("submitScoreBtn");
let scoresDisplay = document.getElementById("scores");
// Array of questions - once the question is answered, it is removed from the array - when the array is empty, the quiz is over
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

// event listener is in the index page which calls this function when the start button is clicked
function startQuiz() {
    //removes the start button
    document.getElementById("startButton").style.display = "none";
    //displays the answer buttons
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
    // displays the question
    questionDisplay.textContent = question.question;

    // itterates through the possible answers to the question
    for (let i = 0; i < question.answers.length; i++) {
        // assign each button element to a variable
        let btn = document.getElementById("btn" + (i + 1));
        // gives each btn var a text content of the possible answer
        btn.textContent = question.answers[i];
        // adds an event listener to the button var which calls the checkAnswer function
        btn.addEventListener("click", checkAnswer);
    }
}

// checks if the user clicked on the correct answer
function checkAnswer() {
    // hide the correct and wrong display
    correctDisplay.style.display = "none";
    wrongDisplay.style.display = "none";

    // checks if the user clicked on the correct answer
    if (question.correct === this.textContent) {
        // if so, display the correct display
        correctDisplay.style.display = "block";
    } else {
        // if not, display the wrong display and subtract 10 seconds from the timer
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

//ends the quiz and displays the user's score and a form to submit their score
function showScore() {
    //stops the timer
    clearInterval(timer);
    //adds the user's score to the dom
    document.querySelector("#userScore").innerHTML = "Your score is: " + timeLeft;
    //shows the submit score section
    submitScore.style.display = "flex";
    //hides the quiz section
    quiz.style.display = "none";
}

//shows the leader board section and sorts the scores from highest to lowest
function showLeaderBoard() {
    //stops the timer incase the user clicks on the view high scores button while taking the quiz
    clearInterval(timer);
    //hides the quiz and submit score sections
    quiz.style.display = "none";
    submitScore.style.display = "none";
    //shows the leaderboard section
    leaderBoard.style.display = "flex";
    //gets the scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores"));
    //sorts the scores from highest to lowest
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    //resets the scores display
    scoresDisplay.innerHTML = "";
    //itterates through the scores and adds them to the dom
    for (let score of scores) {
        let li = document.createElement("li");
        li.textContent = score.initials + ": " + score.score;
        scoresDisplay.appendChild(li);
    }
}

// called by event listener - refreshes the page which starts the quiz over
function startScreen() {
    window.location.reload();
}

// called by event listener - erases the leader board from local storage and resets the scores display
function resetLeaderBoard() {
    localStorage.removeItem("scores");
    scoresDisplay.innerHTML = "";
}

// To be consistent with the rest of the code, I would normally add the event listener in the index page,
// But I wanted to show that I know how to add event listeners in the script page as well
// this event listener is called when the user clicks on the submit score button after the quiz is over
submitScoreBtn.addEventListener("click", function (event) {
    // prevents the page from refreshing
    event.preventDefault();
    // creates an object with the user's score and initials
    let score = {
        score: timeLeft,
        initials: document.getElementById("initials").value
    }
    // checks if the user entered their initials
    if (score.initials === "") {
        alert("Please enter your initials");
        return;
    }
    // gets the scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores"));
    // creates an empty array if there are no scores in local storage
    if (scores === null) {
        scores = [];
    } 
    // adds the new score to the array
    scores.push(score);
    // saves the array to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    // displays the leader board
    showLeaderBoard();
});
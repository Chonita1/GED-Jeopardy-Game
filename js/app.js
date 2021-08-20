console.log('Welcome to GED Jeopardy!')
console.log(questions.a);

// player_name = prompt("Enter your name and press Start Game to begin!")
// document.getElementById('playerName').innerHTML = player_name

// I tried to wrap all of the game logic into this function, now
//the questions don't show up
const game = () => {}
let player1Score = 0;
let player2Score = 0;
let playerID = 1;

let timeInterval = 45;
let timer;
let timeLeft = timeInterval;

function playOver() {
    cancelInterval(timer);
    $('#playAgainButton').showNextSlide();
}
function roundOver() {
    alert('Round Over. Next Player is Up');
    clearInterval(timer);
    timeLeft = timeInterval;
    // if statement to switch players
    if (playerID === 1) {
        playerID = 2;
    } else {
        playerID = 1;
    }
}
function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0)
        document.querySelector('#timer').innerHTML = timeLeft;
    else {
        roundOver();
    }
}
function start() {
    buildQuiz();
    slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);
    showSlide(currentSlide);
    slides = document.querySelectorAll(".slide");
    //document.querySelector('#quiz > div.slide').classList.add('active-slide');
    timer = setInterval(updateTimer, 1000);
    updateTimer();
    //document.querySelector('#playAgainButton').showSlide();
}

// consts to access these HTML elements:
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const chooseButton = document.getElementById('choose');

// function to build quiz & show results
function buildQuiz(){
    const output = [];

    //forEach statement to callback & execute once for each array element
    questions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
        // adds question & its answers to the output
        output.push(
            `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
        }
    );
    // showQuestion(questions, quizContainer);
    // combine output list into one HTML string & place on the page
    quizContainer.innerHTML = output.join('');
}

// function to loop over the answers, check them, & show results.
function showResults(){

    // collect answer containers from game
    let answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    //the forEach method
    questions.forEach( (currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct add to the number of correct answers
        if(userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        // color the answers green
        answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong color answer red
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    if (playerID === 1) {
        player1Score = numCorrect * 100;
        document.querySelector('#player1Score').innerHTML = player1Score;
    } else {
        player2Score = numCorrect * 100;
        document.querySelector('#player2Score').innerHTML = player2Score;
    }


    //  show number of correct answers from total
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
    // select all of the answer containers in game's HTML and create variables to 
    // keep track of player’s current answer & the total number of correct answers.

    answerContainers = quizContainer.querySelectorAll('.answers');
    numCorrect = 0;

    // loop through each question & check answers
    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = answerContainer.querySelector(selector) || {}.value;

        // if answer is correct add to number of correct answwers
        if(userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;

            // if answer is correct color answers green
            answerContainers[questionNumber].style.color = 'green';
        }
            // if answer is incorrect or blank color it red
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });
 
}
// display quiz right away
buildQuiz();
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);
showSlide(currentSlide);

function showSlide(n) {
    // remove active slide hides the current slide
    slides[currentSlide].classList.remove('active-slide');
    // show new slide
    slides[n].classList.add('active-slide');
    // update the current slide number
    currentSlide = n;
    // If we’re on first slide, hide Previous Slide button. Otherwise, show the button.
    // If we’re on last slide, hide  Next Slide button & show the Submit button. 
    // Otherwise, show the Next Slide button and hide the Submit button.
    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);    
}

function showPreviousSlide() {
    showSlide(currentSlide -1);
}

//addEventListener to show question on click of choose button
// chooseButton.addEventListener('click', showQuestion);

// addEventListener to show results on click of submit button
submitButton.addEventListener('click', showResults);

//  hook nav buttons to the shownext and showprevious slide funciton
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

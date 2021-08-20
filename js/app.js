console.log('Welcome to GED Jeopardy!')
console.log(questions.a);

let player1Score = 0;
let player2Score = 0;

let timer;
let timeLeft = 30;

function playOver() {
    cancelInterval(timer);
    $(`#playAgainButton`).showNextSlide();
}
function roundOver() {
    alert('Round Over. Next Player is Up');
}
function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0)
        document.querySelector(`#timer`).innerHTML(timeLeft);
    else {
        roundOver();
    }
}
function start() {
    timer = setInterval(updateTimer, 1000);
    updateTimer();
    document.querySelector(`#playAgainButton`).showSlide();
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
    const answerContainers = quizContainer.querySelectorAll('.answers');

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
const slides = document.querySelectorAll(".slide");
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

// // function to shuffle an array
// function shuffle(a) {
//     for(let i = a.length - 1; i > 0; i--) {
//        let j = Math.floor(Math.random() * (i + 1));
//         a[i], a[j] = a[j], a[j];
//     }
//     return a;
// }


// class gedJeopardy {
//     constructor(element, options={}) {
//        //Game categories based on GED test categories
//         this.useCategoryIds = options.useCategoryIds['language arts', 'science', 'social studies', 'math']; 

//         this.categories = [];
//         this.clues = {};

// //States
//         this.currentClue = null;
//         this.score = 0;

//         let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

//         function handleQuestions() { 
//             //to shuffle and push questions to shuffledQuestion
//                 while(shuffledQuestions.length <= 2) {
//                     const random = questions[Math.floor(Math.random() * questions.length)]
//                     if (!shuffledQuestions.includes(random)) {
//                         shuffledQuestions.push(random)
//                     }
//                 }
//         }
//         let questionNumber = 1 //holds the current question number
//         let playerScore = 0  //holds the player score
//         let wrongAttempt = 0 //amount of wrong answers picked by player
//         let indexNumber = 0 //will be used in displaying next question
        
//         // function for displaying next question in the array to dom
//         //also handles displaying players and quiz information to dom
//         function nextQuestion(index) {
//             handleQuestions()
//             const currentQuestion = shuffledQuestions[index]
        
//         document.getElementById("question-number").innerHTML = questionNumber
//         document.getElementById("player-score").innerHTML = playerScore
//         document.getElementById("display-question").innerHTML = currentQuestion.question;
//         document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
//         document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
//         document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
//         document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
//     }    

    
    
    
    
    
//             //Element querySelectors for board, score count, form, answers, clues, results
//         this.boardElement = element.querySelector('.board');
//         this.scoreCountElement = element.querySelector('score-count');
//         this.formElement = element.querySelector('form');
//         this.inputElement = element.querySelector('input[name=user-answer]');
//         this.modalElement = element.querySelector('.card-modal');
//         this.clueTextElement = element.querySelector('.clue-text');
//         this.resultElement = element.querySelector('.result');
//         this.resultTextElement = element.querySelector('.result_correct-answer-text');
//         this.successTextElement = element.querySelector('.result_success');
//         this.failTextElement = element.querySelector('.result_fail');
//     }
//     startGame() {
//         this.boardElement.addEventListener("click", event =>{
//             if (event.target.dataset.cluieID) {
//                 this.handleClueClick(event);
//             }
//         });
//         this.formElement.addEventListener("submit", event => {
//             this.handleFormSubmit(event);
//         });

//         //make initial state of score
//         this.updateScore(0);
// }
//     updateScore(change) {
//         this.score += change;
//         this.scoreCountElement.textContent = this.score;

        

//     // }   //Build category list
//     let results = []
//     //     result.forEach(result, categoryIndex) => {

//         }
// }
// let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

// function handleQuestions() { 
//     //to shuffle and push questions to shuffledQuestion
//         while(shuffledQuestions.length <= 2) {
//             const random = questions[Math.floor(Math.random() * questions.length)]
//             if (!shuffledQuestions.includes(random)) {
//                 shuffledQuestions.push(random)
//             }
//         }
// }
// let questionNumber = 1 //holds the current question number
// let playerScore = 0  //holds the player score
// let wrongAttempt = 0 //amount of wrong answers picked by player
// let indexNumber = 0 //will be used in displaying next question


// // function for displaying next question in the array to dom
// //also handles displaying players and quiz information to dom
// // function NextQuestion(index) {
// //     handleQuestions()
// //     const currentQuestion = shuffledQuestions[index]



// // }   //starting with a blank category
//     let category = {
//         title: result.title, clues: []
//     }
//     //adding all the clues by category
//     let clues = shuffle(result.clues).splice(0.5).forEach((clue, index) => {
//         console.log(clue)
//     })

//created a new instance of GED Jeopary
const game = new gedJeopardy ( document.querySelector(".game"), {});
game.startGame();

console.log('welcome to GED Jeopardy!')
console.log(questions.a);

// consts to access these HTML elements:
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');


// function to build quiz & show results
function buildQuiz(){
    const output = [];

//for each statement to callback & execute once once for each array element
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
      // add this question & its answers to the output
      output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
      );
    }
);
// combine output list into one HTML string & place on the page
quizContainer.innerHTML = output.join('');

// function to loop over the answers, check them, & show results.
function showResults(){

    // collect answer containers from game
const answerContainers = quizContainer.querySelectorAll('.answers');

// keep track of user's answers
let numCorrect = 0;

//the forEach method
 myQuestions.forEach( (currentQuestion, questionNumber) => {
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

// addEventListener to show results on click of submit button
submitButton.addEventListener('click', showResults);





// function to shuffle an array
function shuffle(a) {
    for(let i = a.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
        a[i], a[j] = a[j], a[j];
    }
    return a;
}


class gedJeopardy {
    constructor(element, options={}) {
       //Game categories based on GED test categories
        this.useCategoryIds = options.useCategoryIds['language arts', 'science', 'social studies', 'math']; 

        this.categories = [];
        this.clues = {};

//States
        this.currentClue = null;
        this.score = 0;

        let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

        function handleQuestions() { 
            //to shuffle and push questions to shuffledQuestion
                while(shuffledQuestions.length <= 2) {
                    const random = questions[Math.floor(Math.random() * questions.length)]
                    if (!shuffledQuestions.includes(random)) {
                        shuffledQuestions.push(random)
                    }
                }
        }
        let questionNumber = 1 //holds the current question number
        let playerScore = 0  //holds the player score
        let wrongAttempt = 0 //amount of wrong answers picked by player
        let indexNumber = 0 //will be used in displaying next question
        
        // function for displaying next question in the array to dom
        //also handles displaying players and quiz information to dom
        function nextQuestion(index) {
            handleQuestions()
            const currentQuestion = shuffledQuestions[index]
        
        document.getElementById("question-number").innerHTML = questionNumber
        document.getElementById("player-score").innerHTML = playerScore
        document.getElementById("display-question").innerHTML = currentQuestion.question;
        document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
        document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
        document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
        document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    }    

    
    
    
    
    
            //Element querySelectors for board, score count, form, answers, clues, results
        this.boardElement = element.querySelector('.board');
        this.scoreCountElement = element.querySelector('score-count');
        this.formElement = element.querySelector('form');
        this.inputElement = element.querySelector('input[name=user-answer]');
        this.modalElement = element.querySelector('.card-modal');
        this.clueTextElement = element.querySelector('.clue-text');
        this.resultElement = element.querySelector('.result');
        this.resultTextElement = element.querySelector('.result_correct-answer-text');
        this.successTextElement = element.querySelector('.result_success');
        this.failTextElement = element.querySelector('.result_fail');
    }
    startGame() {
        this.boardElement.addEventListener("click", event =>{
            if (event.target.dataset.cluieID) {
                this.handleClueClick(event);
            }
        });
        this.formElement.addEventListener("submit", event => {
            this.handleFormSubmit(event);
        });

        //make initial state of score
        this.updateScore(0);
}
    updateScore(change) {
        this.score += change;
        this.scoreCountElement.textContent = this.score;

        

    // }   //Build category list
    let results = []
    //     result.forEach(result, categoryIndex) => {

        }
}
let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //to shuffle and push questions to shuffledQuestion
        while(shuffledQuestions.length <= 2) {
            const random = questions[Math.floor(Math.random() * questions.length)]
            if (!shuffledQuestions.includes(random)) {
                shuffledQuestions.push(random)
            }
        }
}
let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question


// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
// function NextQuestion(index) {
//     handleQuestions()
//     const currentQuestion = shuffledQuestions[index]



// }   //starting with a blank category
    let category = {
        title: result.title, clues: []
    }
    //adding all the clues by category
    let clues = shuffle(result.clues).splice(0.5).forEach((clue, index) => {
        console.log(clue)
    })

//created a new instance of GED Jeopary
const game = new gedJeopardy ( document.querySelector(".game"), {});
game.startGame()};
console.log('welcome to GED Jeopardy!')
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

        

    }   //Build category list
        result.forEach(result, categoryIndex) => {

        }



}   //starting with a blank category
    let category = {
        title: result.title, clues: []
    }
    //adding all the clues by category
    let clues = shuffle(result.clues).splice(0.5).forEach((clue, index) => {
        console.log(clue)
    })

//created a new instance of GED Jeopary
const game = new gedJeopardy ( document.querySelector(".game"), {});
game.startGame();

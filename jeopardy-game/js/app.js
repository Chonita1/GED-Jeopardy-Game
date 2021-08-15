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
        this.useCategoryIds = options.useCategoryIds[];  //do I need this or is this where my categories shld go?

//The GED categories patterned on GED test categories

this.categories = ['language arts', 'science', 'social studies', 'math'];
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
}
//created a new instance of ged Jeopary
const game = new gedJeopardy ( document.querySelector(".game"), {});
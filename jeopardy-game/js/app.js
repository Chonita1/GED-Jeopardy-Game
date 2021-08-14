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
        this.useCategoryIds = options.useCategoryIds

//The GED categories patterned on GED test categories

this.categories = ['language arts', 'science', 'social studies', 'math'];
this.clues = {};


    }
}
//created a new instance of ged Jeopary
const game = new gedJeopardy ( document.querySelector(".game"), {});
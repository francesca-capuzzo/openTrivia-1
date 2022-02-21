'use strict'





function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=10')
        .then(resp => resp.json())
        .then(createTrivias)
        .catch(err => console.log(err));
}





function createTrivias(data) {
    const result = data.results;

    const triviaArray = [];

    for (const res of result) {
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers);
        triviaArray.push(trivia);
    }


    displayTrivia(triviaArray);
}

function displayTrivia(triviaArray) {
    const list = document.getElementById('trivia-list');
    for (const trivia of triviaArray) {
        let liElement = createTriviaListElement(trivia);
        list.appendChild(liElement);
    }

    // const title = document.getElementsByClassName('main-title');

    // const body = document.getElementsByTagName('body')[0];

    //  con query selector tra le parentesi e le virgolette bisogna mettere quello che cerchiamo come se lo mettessimo in css  e prende solo il primo che trova 

    // const list2 = document.querySelector('#trivia-list');

    // const title2 = document.querySelector('.main-title');

    // const body2 = document.querySelector('body');


}

function createTriviaListElement(trivia) {
    let liElement = document.createElement('div');
    let span = document.createElement('span')
    let textNode = document.createTextNode(trivia.question);
    span.appendChild(textNode);
    liElement.appendChild(span);

    let answerList = createAnswersList(trivia.getallAnswewrs());
    liElement.appendChild(answerList);




    return liElement;
}

function createAnswersList(answers) {
   
    let answersList;
    for (const answer of answers) {
        
        let liElement = createAnswerListElement(answer);
        answersList.appendChild(liElement);
    }

    return answersList;
}



function createAnswerListElement(answ) {
    let liElement = document.createElement('button');
    let span = document.createElement('span')
    let textNode = document.createTextNode(answ);
    span.appendChild(textNode);
    liElement.appendChild(span);
    return liElement;
}
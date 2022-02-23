function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .then(createTrivias)
    .catch(error => console.log(error));
}


function createTrivias(data) {                     
    const results = data.results;                  
    const triviaArray = [];                        
    for (const res of results) {                  
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers); 
        triviaArray.push(trivia);
    }
    displayTrivia(triviaArray);                      
}


function createDivQuestion(trivia) {
    let question = document.createElement('div');
    question.className = 'question-div'

    let span = document.createElement('span');
    span.className = 'question-span';
    span.style.display = 'block';

    let textNode = document.createTextNode(trivia.question.replace(/&quot/g, '"').replace(/&#039/g, "'").replace(/;/g, "").replace(/&rsquo/g,"'"));
    
    span.appendChild(textNode);
    question.appendChild(span);

    for (const answer of trivia.getAllAnswers()) {
        let buttonAnswer = createButtonAnswer(answer);
        question.appendChild(buttonAnswer);
    }
    return question;
}


function displayTrivia(triviaArray) {
    let mainDiv = document.getElementById('main-container');

    for (const question of triviaArray) {
        let divQuestion = createDivQuestion(question);
        mainDiv.appendChild(divQuestion);
    }
    return mainDiv;
}


function createButtonAnswer(answer) {
    let answerButton = document.createElement('button');
    let textNode = document.createTextNode(answer.replace(/&quot/g, '"').replace(/&#039/g, "'").replace(/;/g, "").replace(/&rsquo/g,"'"));
    answerButton.appendChild(textNode);

    return answerButton;
}



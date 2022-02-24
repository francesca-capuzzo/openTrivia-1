function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .then(createTrivias)
    .catch(error => console.log(error));
}

let points = 0;

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

    let textNode = document.createTextNode(trivia.question.replace(/&quot/g, '"').replace(/&#039/g, '"').replace(/;/g, "").replace(/&rsquo/g, "'").replace(/&amp/g, ' & ').replace(/&egrave/g, 'è').replace(/&eacute/g, 'é').replace(/&rdquo/g, '"').replace(/&aacute/g, 'à').replace(/&uacute/g, 'ù').replace(/&ouml/g,'ö' ));
    
    span.appendChild(textNode);
    question.appendChild(span);

    for (const answer of trivia.getAllAnswers()) {
        let buttonAnswer = createButtonAnswer(answer, trivia, question);
        question.appendChild(buttonAnswer);
    }
    return question;
}


function displayTrivia(triviaArray) {
    let mainDiv = document.getElementById('main-container');
    const userPoints = document.createElement('div');
    userPoints.className = 'points'
    let textNode = document.createTextNode('User Points:'+ " " + points + " / 10");
    
    

    for (const question of triviaArray) {
        let divQuestion = createDivQuestion(question);
        mainDiv.appendChild(divQuestion);
    }
    userPoints.appendChild(textNode);
    mainDiv.appendChild(userPoints);
    return mainDiv;
}



// let flag = false;

function createButtonAnswer(answer, trivia, question) {
    let answerButton = document.createElement('button');
    answerButton.className = 'button'
    let textNode = document.createTextNode(answer.replace(/&quot/g, "'").replace(/&#039/g, "'").replace(/;/g, "").replace(/&rsquo/g, "'").replace(/&amp/g, ' & ').replace(/&egrave/g, 'è').replace(/&eacute/g, 'é').replace(/&rdquo/g, '"').replace(/&aacute/g, 'à').replace(/&uacute/g, 'ù').replace(/&ouml/g,'ö' ));
    answerButton.appendChild(textNode);
    
    // if (flag === false) {
    //     answerButton.addEventListener('click',(event) => buttonClick(event, trivia, question));
    // }else {
    //     answerButton.removeEventListener('click',(event) => buttonClick(event, trivia));
    // }
    
    answerButton.addEventListener('click',(event) => buttonClick(event, trivia, question));

    return answerButton;
}




function buttonClick(event, trivia, question) {
    let text = event.originalTarget.firstChild.textContent;
    
    let correct = trivia.checkAnswer(text);
   
    if (correct) {
        points + 1;
        event.originalTarget.style.backgroundImage = 'linear-gradient(to left, rgb(238, 130, 238), rgb(75, 0, 130), rgb(0, 0, 255), rgb(0, 128, 0), rgb(255, 165, 0), rgb(255, 0, 0))';
        // event.originalTarget.style.backgroundColor = 'green';
        event.originalTarget.style.color = 'white';
        // flag = true;
        //event.originalTarget.removeEventListener('click', (event) => buttonClick(event, trivia));
      points = points + 1 
    }
    else{
        points = points;
        event.originalTarget.style.backgroundColor = 'red';
        event.originalTarget.style.color = 'black';
        // flag = true;
        //event.originalTarget.removeEventListener('click', (event) => buttonClick(event, trivia)); 
    }
    console.log(points);
    const buttons = question.getElementsByTagName('button');

    
    for (let i = 0; i < buttons.length; i++) {
        
        buttons[i].outerHTML = buttons[i].outerHTML; //removEventListener non funziona quindi prendo outerHTML che è l'elemento senza funzioni (solo html e css) e lo metto uguale a se stesso
    }
}



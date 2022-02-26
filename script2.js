
const triviaArray = []; 
const button = document.getElementById('button')
const amountText = document.getElementById('amount')
const tempAmount = document.getElementById('trivia_amount');
const amount = tempAmount.value;
const tempCateg = document.getElementById('triviaCategory');
const category = tempCateg.value;
const tempDiffi = document.getElementById('difficultyTrivia');
const difficulty = tempDiffi.value;



function selectCategory(category) {
    let tempLink = '';
    if (category === 'any') {
        return tempLink;
    } else {
        tempLink= '&category=' + category
    }
    ;
    return tempLink
}

function selectDifficulty(difficulty) {
   
    let tempDif = '';

    if (difficulty === 'any') {

        return tempDif;

    } else {

        tempDif= '&difficulty=' + difficulty
    }
    ;
    return tempDif
}

function createLink() {
    let link = '';
    console.log(link);
    const dif = selectDifficulty(difficulty);
    const cat = selectCategory(category);
    link = 'https://opentdb.com/api.php?amount=' + amount + cat + dif;
    console.log(link);
    return link
}
function hiddenAllInput() {
    tempAmount.style.display='none';
    tempCateg.style.display='none';
    tempDiffi.style.display='none';
    amountText.style.display='none';
    button.style.display='none';
}




function loadTrivia() {




    fetch(createLink())
    .then(hiddenAllInput())
    .then(response => response.json())
    .then(createTrivias)
    .catch(error => console.log(error));
    
}

let points = 0;

function createTrivias(data) {                     
    const results = data.results;                  
                           
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
    for (const question of triviaArray) {
        let divQuestion = createDivQuestion(question);
        mainDiv.appendChild(divQuestion);
    }
    
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



let questionsDone = 0
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
        if (!correct && text === trivia.correctAnswer) {
            answerButton.style.backgroundColor = 'green';
        }
        buttons[i].outerHTML = buttons[i].outerHTML; //removEventListener non funziona quindi prendo outerHTML che è l'elemento senza funzioni (solo html e css) e lo metto uguale a se stesso
    }
    questionsDone++;
    if (questionsDone === triviaArray.length) {
        //alert('Hai risposto a tutto!')
        this.showResult();
    }
}


function showResult() {
    // Get the modal
    const modal = document.getElementById("myModal");
    modal.style.display = 'flex';

    const modalContent = document.getElementById("modal-content");
    
    const image = document.getElementById('image-result');

    const pointsText = document.createElement('p');
    pointsText.className = 'points-done';

    const resultText = document.createElement('p');
    resultText.className = 'points-done';

    pointsText.innerHTML = '';
    resultText.innerHTML = '';

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    //modal.style.display = "block";

    let questionsNumber = triviaArray.length;
    if (points >=0 && points <= (questionsNumber / 3)) {
        image.src = './images/sad-face.png';
        pointsText.appendChild(document.createTextNode(points + ' / ' + (triviaArray.length)));
        resultText.appendChild(document.createTextNode('Sei proprio scarso!'));

        modalContent.appendChild(pointsText);
        modalContent.appendChild(resultText);
    }

    if (points >= (questionsNumber / 3)+1 && points <= (questionsNumber / 3)+(questionsNumber / 3)) {
        image.src = './images/neutral-face.jpg';
        pointsText.appendChild(document.createTextNode(points + ' / ' + (triviaArray.length)));
        resultText.appendChild(document.createTextNode('Potresti fare meglio...'));

        modalContent.appendChild(pointsText);
        modalContent.appendChild(resultText);
    }

    if (points >= (questionsNumber / 3)+(questionsNumber / 3) && points <= questionsNumber) {
        image.src = './images/happy-face.jpg';
        pointsText.appendChild(document.createTextNode(points + ' / ' + (triviaArray.length)));
        resultText.appendChild(document.createTextNode('Sei un campione!'));

        modalContent.appendChild(pointsText);
        modalContent.appendChild(resultText);
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";

        pointsText.innerHTML = '';
        resultText.innerHTML = '';
        location.reload();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

            pointsText.innerHTML = '';
            resultText.innerHTML = '';
            location.reload();
        }
    }
}
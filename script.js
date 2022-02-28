

// function createCategorySelect(data) {
//     const select = document.getElementById('category-select');
//     for (const category of data.trivia_categories) {
//         console.log(category);
//         const option = document.createElement('option');
//         option.value = category.id;
//         const text = document.createTextNode(category.name);
//         option.appendChild(text);
//         select.appendChild(option);
//     }
// }

///RENDO GENERICA LA FUNZIONE CREATECATEGORYSELECT() così da poter usare anche type e difficulty - aggiungo le fetch per difficulty e type

function loadCategories() {
    fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then((data) => createSelect(data.trivia_categories, 'category-select'))
    .catch(error => console.log(error));
}

function loadDifficulty() {
    fetch('./assets/settings/difficulty.json')
    .then(response => response.json())
    .then((data) => createSelect(data, 'difficulty-select'))
    .catch(error => console.log(error));
}

function loadType() {
    fetch('./assets/settings/type.json')
    .then(response => response.json())
    .then((data) => createSelect(data, 'type-select'))
    .catch(error => console.log(error));
}


function loadTrivia() {
    let category = document.getElementById('category-select').value;
    let difficulty = document.getElementById('difficulty-select').value;
    let type = document.getElementById('type-select').value;
    // console.log('cat', category);
    // console.log('dif', difficulty);
    // console.log('type', type);
    let stringUrl = 'https://opentdb.com/api.php?amount=10';

    //NB i valori devono essere in stringa perchè vengono restituiti così dal json e dall'API
    if (category !== '-1') {
        stringUrl += "&category=" + category;
    }
    if (difficulty !== '-1') {
        stringUrl += "&difficulty=" + difficulty;
    }
    if (type !== '-1') {
        stringUrl += "&type=" + type;
    }
    console.log(stringUrl);
    fetch(stringUrl)
        .then(response => response.json())
        .then(createTrivias)
        .catch(error => console.log(error));
}


function initQuiz() {
    loadCategories();
    loadDifficulty();
    loadType();
}



function createSelect(data, selectId) {
    const select = document.getElementById(selectId);
    for (const element of data) {
        const option = document.createElement('option');
        option.value = element.id;
        const text = document.createTextNode(element.name);
        option.appendChild(text);
        select.appendChild(option);
    }
}





//APRI LINK API PER VEDERE CONTENUTO E CAPIRE LE VARIABILI UTILIZZATE!!

function createTrivias(data) {                     //data per adesso è l'API in json all'url https://opentdb.com/api.php?amount=10
    const results = data.results;                  //metto tutti i risultati dell'API nella costante RESULTS
    const triviaArray = [];                        //creo un array vuoto per poi ciclare sulle domande e infilarle nell'array
    for (const res of results) {                   //ciclo sulla costante results che è un oggetto (vedi API)
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers); //creo un nuovo oggetto TRIVIA dalla classe TRIVIA (creata nello script)
        triviaArray.push(trivia);                  //pusho nell'array tutti gli oggetti creati 
    }

    // let firstTrivia = triviaArray[0];              //prendo il primo trivia dell'array
    // console.log(firstTrivia.question);             //loggo la domanda
    // console.log(firstTrivia.getAllAnswers());      //loggo tutte le risposte
    // console.log("All trivia objects",triviaArray); //loggo l'intero array con i 10 oggetti

    displayTrivia(triviaArray);                       //passo il parametro altrimenti non vede triviaArray (oppure metto triviaArray come variabile globale ma questo non è il metodo migliore)
}



function displayTrivia(triviaArray) {
    console.log("All trivia object",triviaArray);
    const list = document.getElementById("trivia-list");
    list.innerHTML = '';
    // const title = document.getElementsByClassName("main-title")[0]; //senza [0] restituisce una collection con tutti i tag appartenenti a quella classe
    // const title2 = document.getElementsByClassName("main-title")[1];
    // const body = document.getElementsByTagName("body")[0];
    // const list2 = document.querySelector("#trivia-list");           //utilizza il selezionatore del CSS (# per id)(. per classe) e poi il nome dato al tag!
    // const title3 = document.querySelector(".main-title");           //NON PRENDE UNA COLLECTION MA PRENDE SOLO IL PRIMO TAG CHE TROVA CON QUELLA CLASSE (quindi restituisce solo il primo)
    // const body2 = document.querySelector("body");

    // console.log("by ID",list);
    // console.log("by class Name",title);
    // console.log("by class Name",title2);
    // console.log("by tag",body);
    // console.log("query con ID",list2);
    // console.log("query con class",title3);
    // console.log("query con tag",body2);

    for (const trivia of triviaArray) {
        const liElement = createTriviaListElement(trivia)
        list.appendChild(liElement)                                 //metto l'elemento creato dentro alla lista "trivia list" che è un UL
    }
}



function createTriviaListElement(trivia) {
    let liElement = document.createElement("li")                   //create element ci da un HTML element e gli passo il nome del tag come paramento --> qui creo un li element
    let span = document.createElement("span");
    span.className += "question-text ";                            //do un nome alla classe span
    span.style.fontWeight = "bold";                                //do una proprietà con .style (come se fosse css);
    let textNode = document.createTextNode(trivia.question);       //ci sono 4 modi per creare un text node (vedi online) --> qui aggiungo al li la domanda
    span.appendChild(textNode);                                    //metto il text node dentro ad und uno SPAN che contiene il testo
    liElement.appendChild(span);                                   //metto il li element dentro lo span
    let answersList = createAnswersList(trivia.getAllAnswers())
    liElement.appendChild(answersList);
    return liElement;
}



function createAnswersList(answers) {
    let answerList = document.createElement("ul");           //creo un UL
    for (const answer of answers) {
        const liElement = createAnswerListElement(answer)    //creo un li per ogni answer
        answerList.appendChild(liElement)                               
    }
    return answerList;
}



function createAnswerListElement(answer) {
    let liElement = document.createElement("li")                   //create element ci da un HTML element e gli passo il nome del tag come paramento --> qui creo un li element
    let span = document.createElement("span");
    let textNode = document.createTextNode(answer)                 //ci sono 4 modi per creare un text node (vedi online) --> qui aggiungo al li la domanda
    span.appendChild(textNode);                                    //metto il text node dentro ad und uno SPAN che contiene il testo
    liElement.appendChild(span);                                   //metto il li element dentro lo span

    return liElement;
}
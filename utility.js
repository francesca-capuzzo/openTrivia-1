
class Utility{                                //non serve il costruttore visto che le funzioni qui dentro sono generiche(statiche) 
    static shuffleArray(array) {              //shuffleArray() è una funzione di shiffle per le risposte del trivia (presa da Stack Overflow)
        // const newArray = [...array];       //questi sono 2 modi per evitare di cambiare l'array di partenza ma invece clonarlo in un nuovo array che può essere tranquillamente manipolato senza cambiare l'oggetto di partenza
        const newArray = Array.from(array);
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;                 
            return newArray;
        }
    }
}


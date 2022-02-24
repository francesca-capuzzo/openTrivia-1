class Trivia {
  constructor(category, type, difficulty, question, correctAnswer, incorrectAnswer) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswer = incorrectAnswer;
  }


  //siccome nell'oggetto trivia le risposte giuste e sbagliate sono separate, le metto insieme.
  getAllAnswers() {
    const allAnswers = [];
    allAnswers.push(this.correctAnswer);
    allAnswers.push(...this.incorrectAnswer);             //perchè incorrect answers è già un array
    // for (const answ of this.incorrectAnwers) {         //questo è un altro modo per pushare l'array spreaddato nell'array allanswers ma è la stessa cosa --> volendo si può usare anche CONCAT per lo stesso purpose
    //   allAnswers.push(answ)
    // }
    const shuffleArray = Utility.shuffleArray(allAnswers);  //utilizzo lo shuffleArray che è nella classe Utility. --> per evitare che la risporta n^1 sia sempre la corretta.
    return shuffleArray;                                    //restituisce un array che contiene tutte le risposte, corrette e sbagliate
  }


  checkAnswer(answer){
    if (answer === this.correctAnswer) {
      return true;
    }
    else{
      return false;
    }
  }


}


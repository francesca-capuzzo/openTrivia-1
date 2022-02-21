class Utility {

    // static shuffleArray(array) {

    //     for (let i = array.length - 1; i > 0; i--) {

    //         const j = Math.floor(Math.random() * (i + 1));

    //         [array[i], array[j]] = [array[j], array[i]];

    //     }
    // }


    static shuffleArray(array) {
        const newArray = Array.from(array);
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = newArray[i];
           newArray[i] = newArray[j];
           newArray[j] = temp;
        }
        return newArray;
    }

}




























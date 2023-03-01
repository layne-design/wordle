const getURL = "https://words.dev-apis.com/word-of-the-day?random=1";
const postURL = "https://words.dev-apis.com/validate-word";
const guessLetters = document.querySelectorAll(".letter");
let currentId = 1;
let wordOfTheDay = "";
let enteredWord = "";
let validWord = "";

async function getWordOfTheDay() {
    const promise = await fetch(getURL);
    const processedResponse = await promise.json();
    wordOfTheDay = processedResponse.word;
    console.log("The word of the day is",wordOfTheDay);
    correctLetter1 = wordOfTheDay.substring(0,1);
    correctLetter2 = wordOfTheDay.substring(1,2);
    correctLetter3 = wordOfTheDay.substring(2,3);
    correctLetter4 = wordOfTheDay.substring(3,4);
    correctLetter5 = wordOfTheDay.substring(4,5);
    console.log("Letter 1 =",correctLetter1);
    console.log("Letter 2 =",correctLetter2);
    console.log("Letter 3 =",correctLetter3);
    console.log("Letter 4 =",correctLetter4);
    console.log("Letter 5 =",correctLetter5);
}

// returns true or false if the posted word is valid or not

async function postWord() {
    concWord();
    const promise = await fetch(postURL, {
        method:"POST",
        body: JSON.stringify({"word": enteredWord}),
    });
    const processedResponse = await promise.json();
    validWord = processedResponse.validWord;
}

async function showHints() {
    let letter1 = document.getElementById(currentId-5).value;
    let letter2 = document.getElementById(currentId-4).value;
    let letter3 = document.getElementById(currentId-3).value;
    let letter4 = document.getElementById(currentId-2).value;
    let letter5 = document.getElementById(currentId-1).value;

    //Letter 1

    if (letter1 === correctLetter1) {
        document.getElementById(currentId-5).style.backgroundColor = "Green";
        document.getElementById(currentId-5).style.color = "White";
    } else if(letter1 === correctLetter2 || letter1 === correctLetter3 || letter1 === correctLetter4 || letter1 === correctLetter5) {
        document.getElementById(currentId-5).style.backgroundColor = "goldenrod";
        document.getElementById(currentId-5).style.color = "White";
    } else {
        document.getElementById(currentId-5).style.backgroundColor = "Red";
        document.getElementById(currentId-5).style.color = "White";
    }

    //Letter 2

    if (letter2 === correctLetter2) {
        document.getElementById(currentId-4).style.backgroundColor = "Green";
        document.getElementById(currentId-4).style.color = "White";
    } else if(letter2 === correctLetter1 || letter2 === correctLetter3 || letter2 === correctLetter4 || letter2 === correctLetter5) {
        document.getElementById(currentId-4).style.backgroundColor = "goldenrod";
        document.getElementById(currentId-4).style.color = "White";
    } else {
        document.getElementById(currentId-4).style.backgroundColor = "Red";
        document.getElementById(currentId-4).style.color = "White";
    }

    //Letter 3

    if (letter3 === correctLetter3) {
        document.getElementById(currentId-3).style.backgroundColor = "Green";
        document.getElementById(currentId-3).style.color = "White";
    } else if(letter3 === correctLetter1 || letter3 === correctLetter2 || letter3 === correctLetter4 || letter3 === correctLetter5) {
        document.getElementById(currentId-3).style.backgroundColor = "goldenrod";
        document.getElementById(currentId-3).style.color = "White";
    } else {
        document.getElementById(currentId-3).style.backgroundColor = "Red";
        document.getElementById(currentId-3).style.color = "White";
    }

    //Letter 4

    if (letter4 === correctLetter4) {
        document.getElementById(currentId-2).style.backgroundColor = "Green";
        document.getElementById(currentId-2).style.color = "White";
    } else if(letter4 === correctLetter1 || letter4 === correctLetter2 || letter4 === correctLetter3 || letter4 === correctLetter5) {
        document.getElementById(currentId-2).style.backgroundColor = "goldenrod";
        document.getElementById(currentId-2).style.color = "White";
    } else {
        document.getElementById(currentId-2).style.backgroundColor = "Red";
        document.getElementById(currentId-2).style.color = "White";
    }

    //Letter 5

    if (letter5 === correctLetter5) {
        document.getElementById(currentId-1).style.backgroundColor = "Green";
        document.getElementById(currentId-1).style.color = "White";
    } else if(letter5 === correctLetter1 || letter5 === correctLetter2 || letter5 === correctLetter3 || letter5 === correctLetter4) {
        document.getElementById(currentId-1).style.backgroundColor = "goldenrod";
        document.getElementById(currentId-1).style.color = "White";
    } else {
        document.getElementById(currentId-1).style.backgroundColor = "Red";
        document.getElementById(currentId-1).style.color = "White";
    }
}

function winner() {
    let title=document.getElementById("title");
    title.classList.add("winner");
}

function concWord() {
    let letter1 = document.getElementById(currentId-5).value;
    let letter2 = document.getElementById(currentId-4).value;
    let letter3 = document.getElementById(currentId-3).value;
    let letter4 = document.getElementById(currentId-2).value;
    let letter5 = document.getElementById(currentId-1).value;
    enteredWord = enteredWord.concat(letter1,letter2,letter3,letter4,letter5);
    console.log(enteredWord);
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function goForward() {
    nextElement = document.getElementById(currentId+1);
    if (document.getElementById(currentId).disabled) {
        console.log("Character limit reached")
    } else if (currentId == 30) {
        currentId = currentId+1;
    } else {
        nextElement.focus();
        currentId = currentId+1;
    }
}

function goBack() {
        prevElement = document.getElementById(currentId-1);
        prevElement.focus();
        currentId = currentId-1;
    }

async function enter() {   
    await postWord();
    if(enteredWord==wordOfTheDay) {
        await showHints();
        winner();
    } else if (validWord===true && currentId !== 31) {
        for (let i = currentId; i <= currentId+4; i++) {
            document.getElementById(i).disabled=false;
            };
        document.getElementById(currentId).focus();
        console.log("Valid word");
        for (let i = currentId-1; i >= currentId-5; i--) {
            document.getElementById(i).disabled=true;
            };
        await showHints();
    } else if(validWord===true && currentId == 31) {
        await showHints();
        document.getElementById(26).disabled=true;
        document.getElementById(27).disabled=true;
        document.getElementById(28).disabled=true;
        document.getElementById(29).disabled=true;
        document.getElementById(30).disabled=true;
        const sentence = `The word was ${wordOfTheDay}. Maybe you'll have better luck tomorrow!`;
        alert(sentence);
    } else {
        console.log("Invalid word");
    }
    enteredWord = "";
}

for (let i = 6; i <= guessLetters.length; i++) {
    document.getElementById(i).disabled=true;
}

for (let i = 0; i < guessLetters.length; i++) {
    guessLetters[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            
            if (document.getElementById(currentId-1).disabled) {
                console.log("You can't go back there."); 
            
            } else if(currentId == 1) {
                console.log("Can't go back further.");

            } else if(currentId == 30 && document.getElementById(30).value !== "") { 
                document.getElementById(currentId).innerText == "";

            } else {
                goBack();
            };

        } else if (event.key === "Enter") {
            
            if (currentId == 6 || currentId == 11 || currentId == 16 || currentId == 21 || currentId == 26 || currentId == 31) {
                enter();
            } else {
                console.log("Finish your word first.");
            };

        } else if (!isLetter(event.key)) {
            event.preventDefault();
            console.log("Not a letter");
        }
    })
}

for (let i = 0; i < guessLetters.length; i++) {
    guessLetters[i].addEventListener("keyup", function (event) {
            
        if (isLetter(event.key)) {
                goForward();
        }
    })
}

getWordOfTheDay();
console.log(wordOfTheDay);
document.getElementById(currentId).focus();

//this note won't be here after rollback
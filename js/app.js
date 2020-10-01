// -------- TITLES ARRAY ------- //
const movieTitles = [
    ['Jurassic park'],
    ['Back to the future'],
    ['Saving private ryan']
];
// ---------------------------- //
// ------- VARIABLES ---------- //
const keyboard = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn_start');
const resetButton = document.querySelector('.btn_reset');
const overlay = document.querySelector('#overlay');
const heading =  document.querySelector('h2');
const message =  document.querySelector('p');
let movieTitle = document.querySelector('#movieTitle ul');
let lives = document.querySelectorAll('.tries');
let currentMovie = '';
let missed = -1;
let number;
let prevNumber;
// ------------------------------ //
// --------- FUNCTIONS ---------- //

/* -- Turns the selected movie into an array--  */
const getMovieAsArray = movie => String(movie).split('');

// ------------------------------ //

/* -- the movie array is then passed here, each letter is made into an
<li> element then appended to the page --*/
const addMovieToDisplay = movie => {
    for (let j = 0; j < movie.length; j += 1) {
    const li = document.createElement('li');
    const letter = `${movie[j]}`;
    li.append(letter);    
    if ( letter !== ' ' ) {
        li.classList.add('letter');
    } else {
        li.classList.add('space');
    }
    movieTitle.append(li);
    }
};
// -------------------------------- //

/* -- Math function creates number between 0 and 15 --*/
const createRandomTitle = () =>  {
    // do while loop prevents the same movie title twice in a row!
    do {
        number = Math.round(Math.random() * 2);
    } while (number === prevNumber)
    prevNumber = number;
    return number;
}
/*  --This function compares the text content of the button 'clicked', to each
letter in the movie title --*/
const checkLetter = (buttonPress) => {
    const letter  = document.querySelectorAll('.letter');
    let letterMatch = null;
    for ( let j = 0; j < letter.length; j += 1 ) {       
        if ( letter[j].textContent.toLowerCase() === buttonPress.textContent  ) {
            letter[j].classList.add('show');  
            letterMatch = letter[j].textContent;                                  
        }       
    };
    return letterMatch;    
};
// ------------------------------------- //

/*-- Game keyboard listener. Applies classes
to buttons that have been 'chosen' and selections that are 'wrong' and disables
the button pressed so it cannot be selected twice.
If  wrong, a life is made opaque and 'missed' is increased by +1 --*/

keyboard.addEventListener('click', (e) => { 
    if ( e.target.tagName === 'BUTTON' ) { 
    e.target.classList.add('chosen');
    e.target.setAttribute('disabled', '');
        if (checkLetter(e.target) === null) {
            e.target.classList.add('wrong');
            missed += 1;
            lives[missed].style.opacity = 0.2;
        }           
    }
    checkWin(); 
});
// ------------------------------------- //

/*-- Function checking if the user has won or lost --*/
const checkWin = () => {
    let titleLetters = document.querySelectorAll('.letter');
    let correctGuesses = document.querySelectorAll('.show');   
    if ( titleLetters.length === correctGuesses.length) {
        resultPage ('win','Well Done You Won!');
        hideShowButtons ();
        message.textContent = `${chosenMovie} was correct!`;
    } else if ( missed >= 4 ) {    
        resultPage ('lose','You Lost!');
        hideShowButtons ();
        message.textContent = `The answer was ${chosenMovie}!`;       
    }    
};
// ------------------------------------- //

/* --This function adds the correct class based on the result,
adds the lose or win message then displays the overlay-- */ 
const resultPage = (resultOverlay, message) => {
    overlay.classList.add(resultOverlay);
    heading.textContent = message;
    overlay.style.display = 'flex';    
}

/* --This function hides the 'start button and displays
the 'reset' button on the overlays-- */
const hideShowButtons =() => {
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
}

// ----------------------------------- //

// reset and start button listener and functions //
resetButton.addEventListener('click', () => {   
    pageReset(); 
    runProgram();  
})

startButton.addEventListener('click', () => {  
    runProgram();
});
// ----------------------------------- //

/* --This functions runs the program! a random movie is selected and 
passed through to be made into an array then displayed --*/
const runProgram = () => {
    chosenMovie = movieTitles[createRandomTitle()];   
    addMovieToDisplay(getMovieAsArray(chosenMovie));
    overlay.style.display = 'none';
}
// ----------------------------------- //

/*-- this function resets the page. classes and the previous movie title are removed,
 the users lives are restored and the missed variable is reset-- */
const pageReset = () => {
    let letters  = movieTitle.querySelectorAll('li');
    let keyboardButtons  = document.querySelectorAll('.keyrow button');
    for ( let j = 0; j < letters.length; j += 1 ) {       
        letters[j].remove();    
    }
    for ( let j = 0; j < lives.length; j += 1 ) {
        lives[j].style.opacity = 1;
    }
    for ( let j = 0; j < keyboardButtons.length; j += 1 ) {
        keyboardButtons[j].className = "";
        keyboardButtons[j].removeAttribute('disabled');
    }  
    overlay.className = '';
    missed = -1;
}
// ----------------------------------- //

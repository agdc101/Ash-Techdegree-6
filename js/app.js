// ------ TITLES ARRAY -------- //
const movieTitles = [
    ['Jurassic park'],
    ['Back to the future'],
    ['Saving private ryan'],
    ['Catch me if you can'],
    ['Forrest gump'],
    ['Slumdog millionaire'],
    ['The breakfast club'],
    ['Gangs of New York'],
    ['Casablanca'],
    ['Gladiator'],
    ['Ghostbusters'],
    ['The italian job'],
    ['Kill bill'],
    ['The blues brothers'],
    ['Blade runner']
];
// ---------------------------- //
// ------- VARIABLES ---------- //
const keyboard = document.querySelector('#qwerty');
let movieTitle = document.querySelector('#movieTitle ul');
let missed = -1;
let lives = document.querySelectorAll('.tries');
const startButton = document.querySelector('.btn_start');
const resetButton = document.querySelector('.btn_reset');
const overlay = document.querySelector('#overlay');
const heading =  document.querySelector('h2');
let currentMovie = '';

// ---------------------------- //
// ------- FUNCTIONS ---------- //
function getMovieAsArray (movie) {
    const film = String(movie);
    return film.split('');
};

function addMovieToDisplay (movie) {
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

function createRandomTitle () {
    return Math.round(Math.random() * 14);
};



function checkLetter (buttonPress) {
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
    
    setTimeout(function(){ checkWin(); }, 4500);
});

function resultPage (result) {
    overlay.classList.add(result);
    overlay.style.display = 'flex';
    
}

function checkWin () {
    let titleLetters = document.querySelectorAll('.letter');
    let correctGuesses = document.querySelectorAll('.show');
    
    
    if ( titleLetters.length === correctGuesses.length) {
        resultPage ('win');
        hideShowButtons ();
        heading.textContent = `Well Bloody Done! it was ${currentMovie}`;

    } else if ( missed >= 4 ) {    
        // console.log(currentMovie);
        resultPage ('lose');
        hideShowButtons ();
        heading.textContent = `You Silly Billy! it was ${currentMovie}`;
        
    }
    
};
function hideShowButtons () {
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
}


// ---------------------------- //
// Hide overlay on button click //
resetButton.addEventListener('click', () => {
    
    let letters  = document.querySelectorAll('#movieTitle ul li');
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
    overlay.style.display = 'none';
    currentMovie = movieTitles[createRandomTitle()];
    addMovieToDisplay(getMovieAsArray(currentMovie));
})


startButton.addEventListener('click', () => {  
    currentMovie = movieTitles[createRandomTitle()];
    overlay.style.display = 'none';   
    addMovieToDisplay(getMovieAsArray(currentMovie));
});
// ---------------------------- //

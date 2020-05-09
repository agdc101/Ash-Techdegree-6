// ------ TITLES ARRAY -------- //
const movieTitles = [
    ['Jurassic Park'],
    ['Back To The Future'],
    ['Saving Private Ryan'],
    ['Guardians Of The Galaxy'],
    ['Forrest Gump'],
    ['Slumdog Millionaire'],
    ['The Breakfast Club'],
    ['Gangs Of New York'],
    ['Casablanca'],
    ['Gladiator']
];
// ---------------------------- //
// ------- VARIABLES ---------- //
const keyboard = document.querySelector('#qwerty');
const movieTitle = document.querySelector('#movieTitle');
let missed = -1;
const lives = document.querySelectorAll('.tries');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const heading =  document.querySelector('h2');
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
    return Math.round(Math.random() * 10);
};


addMovieToDisplay(getMovieAsArray(movieTitles[createRandomTitle()]));

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
            alert('wrong');
            missed += 1;
            lives[missed].style.display = 'none';
        }   
        
    }
    
    setTimeout(function(){ checkWin(); }, 4000);
});

function checkWin () {
    let titleLetters = document.querySelectorAll('.letter');
    let correctGuesses = document.querySelectorAll('.show');
    
    if ( titleLetters.length === correctGuesses.length) {
        overlay.classList.add('win');
        overlay.style.display = 'flex';
        heading.textContent = 'Well Done You Won!';

    } else if ( missed === 4 ) {    
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
        heading.textContent = 'You Silly Bitch!';
    }
    
};



// ---------------------------- //
// Hide overlay on button click //


startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});
// ---------------------------- //

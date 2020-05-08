// ------ TITLES ARRAY -------- //
const movieTitles = [
    ['JURASSIC PARK'],
    ['BACK TO THE FUTURE'],
    ['SAVING PRIVATE RYAN'],
    ['GUARDIANS OF THE GALAXY'],
    ['FORREST GUMP'],
    ['SLUMDOG MILLIONAIRE'],
    ['THE BREAKFAST CLUB'],
    ['GANGS OF NEW YORK'],
    ['CASABLANCA'],
    ['GLADIATOR']
];
// ---------------------------- //
// ------- VARIABLES ---------- //
const letters = document.querySelector('#qwerty');
const movieTitle = document.querySelector('#movieTitle');
let missed = 0;
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
    }
    movieTitle.append(li);
    }
};

const test = getMovieAsArray(movieTitles[5]);
addMovieToDisplay(test);

function checkLetter (buttonPress) {
    const letter  = document.querySelectorAll('.letter');
    
    for ( let j = 0; j < letter.length; j += 1 ) {
        if ( letter[j].textContent === buttonPress.textContent  ) {
            letter[j].classList.add('show');
            let letterMatch = letter[j].textContent;
            return letterMatch;
        } else {
            return null;
        };

    };
};
console.log(checkLetter());
alert('poo');
// ---------------------------- //
// Hide overlay on button click //
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

startButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
});
// ---------------------------- //

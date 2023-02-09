// Your code here

fetch('http://localhost:3000/films')
    .then(resp => resp.json())
    .then(renderFilms)


function renderFilms(films) {
    films.forEach(film => {
        renderFilm(film)
    });
}


function renderFilm(film) {
    const ulFilmElement = document.getElementById('films');
    const liElement = document.createElement('li');
    liElement.textContent = film.title.toUpperCase();
    liElement.id = film.title;
    liElement.className = "film-item";
    ulFilmElement.append(liElement);


    const title = document.getElementById('title');
    title.textContent = film.title;

    const poster = document.getElementById('poster');
    poster.src = film.poster;

    const runtime = document.getElementById('runtime');
    runtime.textContent = film.runtime + " minutes";

    const description = document.getElementById('film-info');
    description.textContent = film.description;

    const showtime = document.getElementById('showtime');
    showtime.textContent = film.showtime;


    const ticketNumElement = document.getElementById('ticket-num');

    let remainingTickets = (film.capacity - film.tickets_sold).toString();
    ticketNumElement.textContent = remainingTickets;

    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', () => decrementAvailableTickets(film));

    liElement.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${film.id}`)
        .then(resp => resp.json())
        .then((newFilmData) => {
            renderFilm(newFilmData) 
        })
        
    
    })

}




function decrementAvailableTickets(film) {
   
    if ((film.capacity - film.tickets_sold) > 0) {
        film.tickets_sold++;

    }

    const ticketNumElement = document.getElementById('ticket-num');
    ticketNumElement.textContent = (film.capacity - film.tickets_sold).toString();

}
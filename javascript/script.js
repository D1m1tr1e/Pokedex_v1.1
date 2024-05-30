const description = [];
const pokemonDatabase = []; // Contains all data for each Pokemon from API
let pokemonRenderList = [];
let pokemonLoadEnd = 90;
let pokemonLoadStart = 0;
let isLoadingPokemons = false;
let scrollThreshold = window.innerHeight * 0.7;

async function fetchPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function loadPokemon() { // Fetches all statistical data of Pokemons from the API 
    isLoadingPokemons = true;
    const pokemonPromises = [];

    for (let i = pokemonLoadStart; i < pokemonLoadEnd; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        pokemonPromises.push(fetchPokemonData(url));
    }

    const pokemonList = await Promise.all(pokemonPromises);
    pokemonRenderList.push(...pokemonList);
    pokemonDatabase.push(...pokemonList);

    showPokemonsCard();
    await loadDescription();
    isLoadingPokemons = false;
}

async function loadDescription() { // Fetches the general description about each pokemon from the API 
    const descriptionPromises = [];

    for (let i = pokemonLoadStart; i < pokemonLoadEnd; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
        descriptionPromises.push(fetchPokemonData(url));
    }

    const descriptions = await Promise.all(descriptionPromises);
    description.push(...descriptions);
}

window.addEventListener('scroll', function () {
    if (!isLoadingPokemons && window.scrollY >= scrollThreshold) {
        pokemonLoadStart = pokemonLoadEnd;
        pokemonLoadEnd += 30;
        scrollThreshold += window.innerHeight * 0.7;
        loadPokemon();
    }
});

function formattedName(pokemonName) { // Forms the first letter in the name to capital letter 
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
}

function showPokemonsCard() {
    document.getElementById('pokemon_selection_cards').innerHTML = '';
    for (let i = 0; i < pokemonRenderList.length; i++) {
        let name = formattedName(pokemonRenderList[i]['name']);
        let id = pokemonRenderList[i]['id'];
        let img = pokemonRenderList[i]['sprites']['other']['official-artwork']['front_default'];

        document.getElementById('pokemon_selection_cards').innerHTML += templatePokemonCardHTML(name, id, img, i);
    }
}

function searchPokemon() {
    let search = document.getElementById('search_pokemon').value.toLowerCase();
    const inputValue = pokemonDatabase.filter(pk => pk.name.startsWith(search)); // Searches all matching entries for the search entry in the array pokemonDatabase
    pokemonRenderList = inputValue; // The found search entries are overwritten from array pokemonDatabase to pokemonRenderList         
    showPokemonsCard(); // Then displayed on the homepage via showPokemonCard
}

function getTypes(index) {
    let htmlText = "";
    let readAllTypes = pokemonRenderList[index]['types'];
    for (let i = 0; i < readAllTypes.length; i++) {
        htmlText += `<span class="pk_type_view">${readAllTypes[i]['type']['name']}</span>`;
    }
    return htmlText;
}

function openDetailsHTML(i) {
    document.getElementById('pk_details_view').classList.remove('d-none');
    document.body.style.overflow = 'hidden'; // Prevents the page from scrolling in the background
    document.getElementById('pk_details_view').innerHTML = templateDetailsCardHTML(i);
    document.getElementById('about').innerHTML = renderAboutInfoHTML(i);
}

function renderBaseStats(i) {
    document.getElementById('pk_stats_container').classList.remove('d-none');
    document.getElementById('moves_container').classList.add('d-none');
    document.getElementById('border_stats').classList.add('href_border');
    document.getElementById('border_moves').classList.remove('href_border');
    renderChart(i); // Render chart from statistics.js file 
}

function renderMoves(index) {
    document.getElementById('pk_stats_container').classList.add('d-none');
    document.getElementById('moves_container').classList.remove('d-none');
    document.getElementById('border_moves').classList.add('href_border');
    document.getElementById('border_stats').classList.remove('href_border');
    templatePokemonMovesHTML(index);
}

function templatePokemonMovesHTML(index) {
    let showMoves = document.getElementById('moves');
    showMoves.innerHTML = '';
    let moves = pokemonRenderList[index]['moves'];
    for (let i = 0; i < moves.length; i++) {
        document.getElementById('moves').innerHTML += ` • ${moves[i]['move']['name']}`;
    }
}

function closeWindow() {
    document.getElementById('pk_details_view').classList.add('d-none');
    document.body.style.overflow = 'visible';
}

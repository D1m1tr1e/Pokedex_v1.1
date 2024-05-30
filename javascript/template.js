// Displays miniature Pokemon cards 
function templatePokemonCardHTML(name, id, img, i) {
    return /*html*/`
        <div id="pk_card_${i}" class="pk_card_design bg_${pokemonRenderList[i]['types'][0]['type']['name']}" onclick="openDetailsHTML(${i})">
            <div class="name_layout">
                <h2>${name}</h2>
                <h2>#${id}</h2>
            </div>
            <div class="info_layout">
                <div id="pk_main_type_${i}">${getTypes(i)}</div>
                <img src="${img}" alt="Pokemon">
                <div class="bg_ball_lp"><img src="img/pokeball.png" alt="Pokeball"></div>
            </div>
        </div>
    `;
}

// Shows detail view of the clicked pokemon with statistics and moves
function templateDetailsCardHTML(i) {
    return /*html*/ `
    <div id="card_container">
        <div id="pokedex_${i}" class="pk_card_det_design bg_${pokemonRenderList[i]['types'][0]['type']['name']}">
            <i class="fa-regular fa-circle-xmark fa-rotate-90 fa-xl close_btn" onclick="closeWindow()"></i>
            <div class="pk_head_info">
                <h1 id="pk_name">${formattedName(pokemonRenderList[i]['name'])}</h1>
                <h1 id="pk_id"># ${pokemonRenderList[i]['id']}</h1>
                <img class="bg_ball_dp" src="img/pokeball.png" alt="Pokeball">
            </div>
            <div class="pk_type_container">
                <div id="pk_type_dets_view_${i}">${getTypes(i)}</div>
            </div>
        </div> 

        <!-- Pokemon stats area -->
        <div class="pk_info_container">
            <img id="pk_img" src="${pokemonRenderList[i]['sprites']['other']['official-artwork']['front_default']}">
        </div>
        <div class="nav_bar">
            <a onclick="renderBaseStats(${i})" href="#" id="border_stats">Base Stats</a>
            <a onclick="renderMoves(${i})" href="#" id="border_moves">Moves</a>
        </div>
        <div class="about_info">
            <span id="about"></span>
        </div>
        <div class="chart_box d-none" id="pk_stats_container">
            <canvas id="pk_stats"></canvas>
        </div>
        <div class="moves_bib d-none" id="moves_container">
            <span id="moves"></span>
        </div>
    </div>`;
}

// Shows the general information of the clicked pokemon
function renderAboutInfoHTML(i) {
    const pokemon = pokemonRenderList[i];
    const desc = description[i];

    return /*html*/`
    <div class="cont_direktion">
        <span>Height</span>
        <span>${pokemon.height * 10} cm</span>
    </div>
    <div class="cont_direktion">
        <span>Weight</span>
        <span>${pokemon.weight / 10} kg</span>
    </div>
    <div class="cont_direktion">
        <span>Ability</span>
        <span>${pokemon.abilities[0]?.ability.name}</span>
    </div>
    <div class="cont_direktion">
        <span>Growth rate</span>
        <span>${desc?.growth_rate?.name}</span>
    </div>
    <div class="cont_direktion">
        <span>Habitat</span>
        <span>${desc?.habitat?.name}</span>
    </div>
    `;
}

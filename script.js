const input = document.getElementsByTagName('input')[0];
const button = document.getElementById('btn');
const display = document.getElementsByClassName('display')[0];

button.addEventListener('click', () => {
    const name = input.value;
    searchPokemon(name);
});

async function searchPokemon() {
    const name = input.value.trim();
    if (!name) return;

    try {
        display.innerHTML = '<p>Cargando...</p>';
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        if (!response.ok) throw new Error(`Pokémon no encontrado: ${name}`);

        const data = await response.json();
        showPokemon(data);
    } catch (error) {
        display.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function showPokemon(pokemon) {
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };

    display.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
             alt="${pokemon.name}" width="150">
        <h2>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
        <div>${pokemon.types.map(t =>
        `<span style="background:${typeColors[t.type.name]}; 
                         padding:2px 8px; 
                         border-radius:10px;
                         color:white;
                         margin:0 5px;">
                ${t.type.name[0].toUpperCase() + t.type.name.slice(1)}
            </span>`
    ).join('')}</div>
        <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
        <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
        <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities
            .map(t => t.ability.name[0].toUpperCase() + t.ability.name.slice(1)).join(" | ")}</p>
    `;
}
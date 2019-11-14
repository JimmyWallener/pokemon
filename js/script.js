$(function () {

    const pokemonURL = "https://pokeapi.co/api/v2/generation/1";
    const pokemonByName = "https://pokeapi.co/api/v2/pokemon/";



    // Eventlisteners go here

    $(document).ready(function () {
        $.getJSON(pokemonURL).done(function (data) {
            $.each(data.pokemon_species, function (index, pokemon) {
                let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                // autocomp(pokemon); <-- callback till autocomplete

                $("#getmyPoke").click(function (event) {
                    event.preventDefault();

                    $.getJSON(pokemonByName + pokemon.name).done(function (details) {
                        let userInput = $("#Seek").val();
                        if (userInput.toLowerCase() == name.toLowerCase()) {
                            getPokemon(details);
                        }
                    })
                    $("#clear").click(function (event) {
                        event.preventDefault();
                        $pokemonDiv = $("#pokemon-details");
                        $pokemonDiv.empty();
                        $("#Seek").val('');

                    });
                });

            });
        }).fail(function () {
            console.log("Request failed");
        }).always(function () {
            console.log("Pokemon is Awesome ")
        });
    });
});
// Functions goes here

function getPokemon(details) {
    let detail = []; // Saves details data in javascript objet (since its a prerequisite for the assignment)
    let $pokemonDiv = $("#pokemon-details");

    $pokemonDiv.empty();
    $("#Seek").val('');
    detail = details;
    let moves = detail.abilities;
    $pokemonDiv.append(`<h2>${name}</h2>`);
    //pokemonDiv.append("<img src = ' "+ details.sprites.front_default + "'>")
    //pokemonDiv.append("<img src = ' "+ details.sprites.back_default + "'>")
    $pokemonDiv.append(`<img src = '${detail.sprites.front_shiny}'>`);
    $pokemonDiv.append(`<img src = '${detail.sprites.back_shiny}'>`);
    for (let i = 0; i < moves.length; i++) {
        let obj = moves[i].ability;
        $pokemonDiv.append(`<p>Abilities: ${obj.name}</p>`);
    }
}
// Autocomplete function - fungerar ej ännu.
/*
function autocomp(pokemon) {
    let auto = [];
    auto = pokemon;
    $("#Seek").autocomplete({
        minlength: 0,
        source: auto
    }); console.log(auto);
}
*/
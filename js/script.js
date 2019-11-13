$(function () {

    var pokemonURL = "https://pokeapi.co/api/v2/generation/1";
    var pokemonByName = "https://pokeapi.co/api/v2/pokemon/";

    //Autocomplete  

    $.getJSON(pokemonURL).done(function (data) {
        $.each(data.pokemon_species, function (index, pokemon) {
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            $("#getmyPoke").click(function (event) {
                event.preventDefault();

                $.getJSON(pokemonByName + pokemon.name).done(function (details) {

                    let userInput = $("#Seek").val();
                    let pokemonDiv = $("#pokemon-details");
                    let detail = []; // Saves details data in javascript objet (since its a prerequisite for the assignment)
                    detail = details;
                    let moves = detail.abilities;

                    if (userInput.toLowerCase() == name.toLowerCase()) {
                        pokemonDiv.empty();
                        pokemonDiv.append(`<h2>${name}</h2>`);
                        //pokemonDiv.append("<img src = ' "+ details.sprites.front_default + "'>")
                        //pokemonDiv.append("<img src = ' "+ details.sprites.back_default + "'>")
                        pokemonDiv.append(`<img src = '${detail.sprites.front_shiny}'>`)
                        pokemonDiv.append(`<img src = '${detail.sprites.back_shiny}'>`)
                        for (var i = 0; i < moves.length; i++) {
                            var obj = moves[i];
                            pokemonDiv.append(`<p>Abilities: ${obj.ability.name}</p>`);
                        }
                    }
                })
                $("#clear").click(function (event) {
                    pokemonDiv = $("#pokemon-details");
                    pokemonDiv.empty();
                    $("#userInput").val('');
                    event.preventDefault();
                });
            });

        });
    }).fail(function () {
        console.log("Request failed");
    }).always(function () {
        console.log("Pokemon is Awesome ")
    });
});






$(function () {

    const pokemonURL = "https://pokeapi.co/api/v2/generation/1";
    const pokemonByName = "https://pokeapi.co/api/v2/pokemon/";
    const pokemonImage = "data/data.json"

    //Min lösning till autocomplete- ni får gärna ta bort det om ni hittar bättre eller smidigare lösning
    var nameArray = [];
    $.getJSON(pokemonURL, function (data) {
        $.each(data.pokemon_species, function (index, pokemon) {
            if ($.inArray(pokemon.name, nameArray) === -1) {
                nameArray.push(pokemon.name)
            }
        })
    });
    $("#Seek").autocomplete({
        source: nameArray,
        autoFocus: true
    });

    // Eventlisteners go here

    $(document).ready(function () {
        $.getJSON(pokemonURL).done(function (data) {
            $.each(data.pokemon_species, function (index, pokemon) {
                let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                $("#getmyPoke").click(function (event) {
                    event.preventDefault();

                    $.getJSON(pokemonByName + pokemon.name).done(function (details) {
                        $.getJSON(pokemonImage).done(function (image) {
                            let userInput = $("#Seek").val();

                            if (userInput.toLowerCase() == name.toLowerCase()) {
                                let detail = [];
                                detail = details;
                                let moves = detail.abilities;
                                let $pokemonDiv = $("#pokemon-details");
                                let images = image[pokemon.name];

                                $pokemonDiv.empty();

                                $("#Seek").val('');
                                $pokemonDiv.append(`<h2>${details.name}</h2>`);
                                //pokemonDiv.append("</img src = ' "+ details.sprites.front_default + "'>")
                                //pokemonDiv.append("</img src = ' "+ details.sprites.back_default + "'>")
                                //$pokemonDiv.append(`<img src = '${detail.sprites.front_shiny}'>`);
                                //$pokemonDiv.append(`<img src = '${detail.sprites.back_shiny}'>`);
                                $pokemonDiv.append(`<img src = '${images}' alt = '${pokemon.name}'>`);
                                $pokemonDiv.append(`<ul class = 'list-ability'>Abilities</ul>`)
                                for (let i = 0; i < moves.length; i++) {
                                    let obj = moves[i].ability;
                                    $pokemonDiv.append(`<li> ${obj.name}</li>`);
                                } 

                            }
                        })
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

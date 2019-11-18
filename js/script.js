$(function () {

    // Setting url variables for API and local json.
    const pokemonURL = "https://pokeapi.co/api/v2/generation/1";
    const pokemonByName = "https://pokeapi.co/api/v2/pokemon/";
    const pokemonImage = "data/data.json"

    // Creating an array that will hold all pokemon, which will be used for autocomplete function
    //.getJson fetches data from api and .each sorts through object for all pokemon names and stores it in pokemon, while pokemon.name pulls actual name
    // if statement check if array holds pokemon.name, if not push it into the array.

    var nameArray = [];
    $.getJSON(pokemonURL, function (data) {
        $.each(data.pokemon_species, function (index, pokemon) {
            if ($.inArray(pokemon.name, nameArray) === -1) {
                nameArray.push(pokemon.name)
            }
        })
    });
    // attach autocomplete to input with a minimum of 3 character input required and an delay of 500ms. 
    $("#Seek").autocomplete({
        source: nameArray,
        minlength: 3,
        delay: 500
    });

    // Eventlisteners go here
    // repeat from above to get pokemon name data.
    $(document).ready(function () {
        $.getJSON(pokemonURL).done(function (data) {
            $.each(data.pokemon_species, function (index, pokemon) {
                // Add click eventlistener to button
                let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                $("#getmyPoke").click(function (event) {
                    event.preventDefault();
                    $("h5").hide();
                    // .getJSON sorting through next api with pokemon.name for objects
                    $.getJSON(pokemonByName + pokemon.name).done(function (details) {
                        // Getting data from local json file with image url for specific pokemon
                        $.getJSON(pokemonImage).done(function (image) {
                            let userInput = $("#Seek").val();

                            if (userInput.toLowerCase() == name.toLowerCase()) {
                                // adding an array to hold json objects to use in loop after abilities to show on page.
                                let detail = [];
                                detail = details;
                                let moves = detail.abilities;
                                let $pokemonDiv = $("#pokemon-details");
                                let images = image[pokemon.name];
                                let pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                                // We clear the div for each search
                                $pokemonDiv.empty();
                                $("#Seek").val('');
                                // Appending name, image and abilities to page
                                $pokemonDiv.append(`<h2>${pokeName}</h2>`);
                                $pokemonDiv.append(`<img src = '${images}' alt = '${pokemon.name}'>`);
                                $pokemonDiv.append(`<ul class = 'list-ability'>Abilities:</ul>`)
                                // looping through array for all abilites related to pokemon
                                for (let i = 0; i < moves.length; i++) {
                                    let obj = moves[i].ability;
                                    $pokemonDiv.append(`<li> ${obj.name}</li>`);
                                }

                            }
                        })
                    })
                    // clear function that resets page on pressing reset button
                    $("#clear").click(function (event) {
                        event.preventDefault();
                        $pokemonDiv = $("#pokemon-details");
                        $pokemonDiv.empty();
                        $("#Seek").val('');
                        $("h5").show();

                    });
                });

            });
            // Logging in console.log if api fails or success
        }).fail(function () {
            console.log("Request failed");
        }).always(function () {
            console.log("Pokemon is Awesome ")
        });
    });
});

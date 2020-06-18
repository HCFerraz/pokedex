// Executed on user's search
function pokemonSearch() {
  // Receives the user's input field value
  let receiveData = document.getElementById('getPokemon').value.toLowerCase();
  // Used as parameter of functions to replace commas for vertical bars
  let regex = /(,)/g;
  // Returns the image in the first slide
  pokeImage(receiveData);
  // Erases pre-existing text informations in the second slide
  document.querySelector('#secondSlide').textContent = '';
  // Returns the name in the second slide
  pokeName(receiveData);
  // Erases pre-existing text informations in the third slide
  document.querySelector("#thirdSlide").textContent = '';
  // Returns the types, using regex in the second slide 
  pokeTypes(receiveData, regex);
  /* Returns the abilities, using regex in the second slide
  and printing it's effects in the third */
  pokeAbilities(receiveData, regex);
};

// Allows search with 'ENTER' button
document.getElementById("getPokemon")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submitPokemon").click();
    }
  });

/* Returns the requisition of the API and allows data to be 
used in another functions */
const getPokemonData = async (receiveData) => {
  try {
    const pokemon = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${receiveData}`);
    return pokemon.data
  } catch (error) {
    console.log(error);
  };
};

let pokeImage = (receiveData) => {
  /* Here, the function getPokemonData receives it's parameter from pokeImage, 
  which receives it's parameters in the pokemonSearch function */
  getPokemonData(receiveData)
    // This allows that the getPokemonData returns the pokemon data
    .then(pokeData => {
      /* Then, the pokeData receives the pokemon data from the api
      used here for accessing the pokemon id */
      document.getElementById('firstSlide')
        .style
        .backgroundImage =
        `url(https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png)`;
    })
}

let pokeName = (receiveData) => {
  // Is remotely created the elements that will be printed in the second slide
  var pokeTitle = document.createElement('div')
  pokeTitle.classList.add('titleNAME')
  document.querySelector('#secondSlide').append(pokeTitle)
  var pokeName = document.createElement('p')
  pokeName.classList.add('pokeName')
  document.querySelector('#secondSlide').appendChild(pokeName)
  getPokemonData(receiveData)
    .then(pokeData => {
      // The title Name receives its text and is now seeing in the slide
      document.querySelector(".titleNAME").innerText = 'Name';
      // The pokemon name is received, with first letter capitalized
      document.querySelector('.pokeName')
        .innerText =
        `${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}`;
    })
}

let pokeAbilities = (receiveData, regex) => {
  // Is remotely created the elements that will be printed in the second slide
  var titleAbility = document.createElement('div')
  titleAbility.classList.add('titleABILITY')
  document.querySelector('#secondSlide').append(titleAbility)
  var abilityName = document.createElement('p')
  abilityName.classList.add('pokeAbilities')
  document.querySelector('#secondSlide').appendChild(abilityName)
  getPokemonData(receiveData)
    .then(pokeData => {
      // The title Ability receives its text and is now seeing in the slide
      document.querySelector(".titleABILITY").innerText = 'Ability';
      // An array to receive each ability name
      let abilitiesNames = [];
      // A new loop to push the names into the array
      pokeData.abilities.forEach(pokeAbilities => {
        abilitiesNames.push(pokeAbilities.ability.name)
        // A new API requisition to have access to each ability description
        axios.get(`https://pokeapi.co/api/v2/ability/${pokeAbilities.ability.name}/`)
          .then(nameOfTheAbility => {
            // An array to receive each ability effect
            let abilitiesEffects = [];
            // A new loop to push the effects descriptions into the array
            nameOfTheAbility.data.effect_entries.forEach(effectDescription => {
              // A conditional to use only english text
              if (effectDescription.language.name == "en") {
                abilitiesEffects.push(effectDescription.short_effect);
                /* Is remotely created the elements that will be printed 
                in the second slide */
                var ability = document.createElement('p');
                ability.classList.add('ability');
                document.querySelector("#thirdSlide").append(ability)
                /* The pokemon ability is received, 
                with first letter capitalized and the effect's descriptions */
                ability.textContent =
                  `${pokeAbilities.ability.name.charAt(0).toUpperCase()
                  + pokeAbilities.ability.name.slice(1)}
                  effect: ${abilitiesEffects}`;
              }
            })
          })
      })
      // The regex is used in the separation of the abilities
      let pokeAbilitiesEdited = abilitiesNames.join().replace(regex, ' | ')
      document.querySelector('.pokeAbilities').innerHTML = `${pokeAbilitiesEdited}`
    })
}

let pokeTypes = (receiveData, regex) => {
  // Is remotely created the elements that will be printed in the second slide
  var titleType = document.createElement('div')
  titleType.classList.add('titleTYPE')
  document.querySelector('#secondSlide').append(titleType)
  var typeName = document.createElement('p')
  typeName.classList.add('pokeType')
  document.querySelector('#secondSlide').appendChild(typeName)
  getPokemonData(receiveData)
    .then(pokeData => {
      // The title Type receives its text and is now seeing in the slide
      document.querySelector('.titleTYPE').innerText = `Type`;
      // An array to receive each type
      let typesNames = [];
      pokeData.types.forEach(pokeTypes => {
        typesNames.push(pokeTypes.type.name)
        // A new API requisition to have access to types effectiveness
        axios.get(`https://pokeapi.co/api/v2/type/${pokeTypes.type.name}/`)
          .then(nameOfTheType => {
            // For better reading (I guess) 
            const thisTypeData = nameOfTheType.data;
            let doubleDamageFrom = [];
            let doubleDamageTo = [];
            let halfDamageFrom = [];
            let halfDamageTo = [];
            // Each array receiving the it's loop requisition
            thisTypeData.damage_relations.double_damage_from.forEach(type => {
              doubleDamageFrom.push(type.name);
            });
            thisTypeData.damage_relations.double_damage_to.forEach(type => {
              doubleDamageTo.push(type.name);
            });
            thisTypeData.damage_relations.half_damage_from.forEach(type => {
              halfDamageFrom.push(type.name);
            });
            thisTypeData.damage_relations.half_damage_to.forEach(type => {
              halfDamageTo.push(type.name);
            });
          })
      })
      // The regex is used in the separation of the types
      let pokeTypesEdited = typesNames.join().replace(regex, ' | ')
      document.querySelector('.pokeType').innerText = `${pokeTypesEdited}`;
    })
}
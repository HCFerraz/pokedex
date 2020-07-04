// Executed on user's search
function pokemonSearch() {
  // Receives the user's input field value
  let receiveData = document.getElementById('getPokemon').value.toLowerCase();
  // Used as parameter of functions to replace commas
  let regex = /(,)/g;
  // Returns the image in the first slide
  pokeImage(receiveData);
  // Erases pre-existing text informations in the second slide
  document.querySelector('#secondSlide').textContent = '';
  // Returns the name in the second slide
  pokeName(receiveData);
  // Erases pre-existing text informations in the third slide
  document.querySelector("#thirdSlide").textContent = '';
  document.querySelector("#fourthSlide").textContent = '';
  document.querySelector("#fifthSlide").textContent = '';
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
      // Analyze the id so it can be used in the api requisition below
      let pokemonId = pokeData.id.toString()
      if (pokemonId.length == 2) {
        pokemonId = `0${pokemonId}`
      }
      if (pokemonId.length == 1) {
        pokemonId = `00${pokemonId}`
      }
      document.getElementById('firstSlide')
        .style
        .backgroundImage =
        `url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png)`;
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
  // Creation of elements to be printed in the second slide
  var titleAbility = document.createElement('div')
  titleAbility.classList.add('titleABILITY')
  document.querySelector('#secondSlide').append(titleAbility)
  var abilityName = document.createElement('p')
  abilityName.classList.add('pokeAbilities')
  document.querySelector('#secondSlide').appendChild(abilityName)
  getPokemonData(receiveData)
    .then(pokeData => {
      // The title Ability receives its text and is now seen in the slide
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
      // capitalizeNames is used to capitalize the first letter of each abilitie
      const capitalizeNames = abilitiesNamesArray => abilitiesNamesArray
        .map(abilitiesNames => abilitiesNames
          .split(' ').map(word => word[0]
            .toUpperCase() + word.slice(1).toLowerCase()).join(' '));
      // The regex is used in the separation of the abilities
      let pokeAbilitiesEdited = capitalizeNames(abilitiesNames)
        .join().replace(regex, ' | ')
      document.querySelector('.pokeAbilities').innerHTML = `${pokeAbilitiesEdited}`
    })
}

let pokeTypes = (receiveData, regex) => {
  // Are remotely created the elements that will be printed in the second slide
  var titleType = document.createElement('div')
  titleType.classList.add('titleTYPE')
  document.querySelector('#secondSlide').append(titleType)
  var typeName = document.createElement('p')
  typeName.classList.add('pokeType')
  document.querySelector('#secondSlide').appendChild(typeName)
  // Are remotely created the elements that will be printed in the fourth slide
  var titleDoubleDamageTo = document.createElement('div')
  titleDoubleDamageTo.classList.add('titleDoubleDamageTo')
  document.querySelector('#fourthSlide').append(titleDoubleDamageTo)
  var doubleDamageToNames = document.createElement('p')
  doubleDamageToNames.classList.add('doubleDamageToTypes')
  document.querySelector('#fourthSlide').appendChild(doubleDamageToNames)
  var titleHalfDamageTo = document.createElement('div')
  titleHalfDamageTo.classList.add('titleHalfDamageTo')
  document.querySelector('#fourthSlide').append(titleHalfDamageTo)
  var halfDamageToNames = document.createElement('p')
  halfDamageToNames.classList.add('halfDamageToTypes')
  document.querySelector('#fourthSlide').appendChild(halfDamageToNames)
  var titleNoDamageTo = document.createElement('div')
  titleNoDamageTo.classList.add('titleNoDamageTo')
  document.querySelector('#fourthSlide').append(titleNoDamageTo)
  var noDamageToNames = document.createElement('p')
  noDamageToNames.classList.add('noDamageToTypes')
  document.querySelector('#fourthSlide').appendChild(noDamageToNames)
  // Are remotely created the elements that will be printed in the fifth slide
  var titleHalfDamageFrom = document.createElement('div')
  titleHalfDamageFrom.classList.add('titleHalfDamageFrom')
  document.querySelector('#fifthSlide').append(titleHalfDamageFrom)
  var halfDamageFromNames = document.createElement('p')
  halfDamageFromNames.classList.add('halfDamageFromTypes')
  document.querySelector('#fifthSlide').appendChild(halfDamageFromNames)
  var titleDoubleDamageFrom = document.createElement('div')
  titleDoubleDamageFrom.classList.add('titleDoubleDamageFrom')
  document.querySelector('#fifthSlide').append(titleDoubleDamageFrom)
  var doubleDamageFromNames = document.createElement('p')
  doubleDamageFromNames.classList.add('doubleDamageFromTypes')
  document.querySelector('#fifthSlide').appendChild(doubleDamageFromNames)
  var titleNoDamageFrom = document.createElement('div')
  titleNoDamageFrom.classList.add('titleNoDamageFrom')
  document.querySelector('#fifthSlide').append(titleNoDamageFrom)
  var noDamageFromNames = document.createElement('p')
  noDamageFromNames.classList.add('noDamageFromTypes')
  document.querySelector('#fifthSlide').appendChild(noDamageFromNames)
  getPokemonData(receiveData)
    .then(pokeData => {
      // The title Type receives its text and is now seen in the slide
      document.querySelector('.titleTYPE').innerText = `Type`;
      document.querySelector('.titleDoubleDamageFrom')
        .innerText = `Double Damage From`;
      document.querySelector('.titleDoubleDamageTo')
        .innerText = `Double Damage To`;
      document.querySelector('.titleHalfDamageFrom')
        .innerText = `Half Damage From`;
      document.querySelector('.titleHalfDamageTo').innerText = `Half Damage To`;
      document.querySelector('.titleNoDamageFrom').innerText = `No Damage From`;
      document.querySelector('.titleNoDamageTo').innerText = `No Damage To`;
      // Arrays to receive each type
      /* The arrays doubleDamageTo, halfDamageTo and noDamageTo work based on 
      each pokémon type. That means that they don't respect the type of the attack */
      let typesNames = [];
      let doubleDamageFrom = [];
      let doubleDamageTo = [];
      let halfDamageFrom = [];
      let halfDamageTo = [];
      let noDamageFrom = [];
      let noDamageTo = [];
      pokeData.types.forEach(pokeTypes => {
        typesNames.push(pokeTypes.type.name)
        // A new API requisition to have access to types effectiveness
        axios.get(`https://pokeapi.co/api/v2/type/${pokeTypes.type.name}/`)
          .then(nameOfTheType => {
            // For better reading (I guess) 
            const thisTypeData = nameOfTheType.data;
            // Each array receiving it's loop requisition
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
            thisTypeData.damage_relations.no_damage_from.forEach(type => {
              noDamageFrom.push(type.name);
            });
            thisTypeData.damage_relations.no_damage_to.forEach(type => {
              noDamageTo.push(type.name);
            });
            // Loops for styling each type
            for (let a = 0; a < doubleDamageFrom.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (doubleDamageFrom[a] == allTypesVerifier[i]) {
                  doubleDamageFrom.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            for (let a = 0; a < doubleDamageTo.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (doubleDamageTo[a] == allTypesVerifier[i]) {
                  doubleDamageTo.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            for (let a = 0; a < halfDamageFrom.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (halfDamageFrom[a] == allTypesVerifier[i]) {
                  halfDamageFrom.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            for (let a = 0; a < halfDamageTo.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (halfDamageTo[a] == allTypesVerifier[i]) {
                  halfDamageTo.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            for (let a = 0; a < noDamageFrom.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (noDamageFrom[a] == allTypesVerifier[i]) {
                  noDamageFrom.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            for (let a = 0; a < noDamageTo.length; a++) {
              for (let i = 0; i < allTypesVerifier.length; i++) {
                if (noDamageTo[a] == allTypesVerifier[i]) {
                  noDamageTo.splice(a, 1, allTypesStylized[i])
                }
              }
            }
            // A filter to select types in the intersection
            let toIntersections = halfDamageTo
              .filter(types => doubleDamageTo.includes(types))
            // A loop to disjoint the filtered array
            for (let i = 0; i < toIntersections.length; i++) {
              if (!toIntersections == '') {
                let typeIndex = halfDamageTo.indexOf(toIntersections[i])
                halfDamageTo.splice(typeIndex, 1)
                toIntersections.shift()
                i--
              }
            }
            let fromIntersections = halfDamageFrom
              .filter(types => doubleDamageFrom.includes(types))
            for (let i = 0; i < fromIntersections.length; i++) {
              if (!fromIntersections == '') {
                let typeIndex = halfDamageFrom.indexOf(fromIntersections[i])
                halfDamageFrom.splice(typeIndex, 1)
                fromIntersections.splice(i, 1)
                i--
              }
            }
            let noDamageHalfFromIntersections = halfDamageFrom
              .filter(types => noDamageFrom.includes(types))
            for (let i = 0; i < noDamageHalfFromIntersections.length; i++) {
              if (!noDamageHalfFromIntersections == '') {
                let typeIndex = halfDamageFrom
                  .indexOf(noDamageHalfFromIntersections[i])
                halfDamageFrom.splice(typeIndex, 1)
                noDamageHalfFromIntersections.splice(i, 1)
                i--
              }
            }
            let noDamageHalfToIntersections = halfDamageTo
              .filter(types => noDamageTo.includes(types))
            for (let i = 0; i < noDamageHalfToIntersections.length; i++) {
              if (!noDamageHalfToIntersections == '') {
                let typeIndex = halfDamageTo
                  .indexOf(noDamageHalfToIntersections[i])
                halfDamageTo.splice(typeIndex, 1)
                noDamageHalfToIntersections.splice(i, 1)
                i--
              }
            }
            let noDamageDoubleFromIntersections = doubleDamageFrom
              .filter(types => noDamageFrom.includes(types))
            for (let i = 0; i < noDamageDoubleFromIntersections.length; i++) {
              if (!noDamageDoubleFromIntersections == '') {
                let typeIndex = doubleDamageFrom
                  .indexOf(noDamageDoubleFromIntersections[i])
                doubleDamageFrom.splice(typeIndex, 1)
                noDamageDoubleFromIntersections.splice(i, 1)
                i--
              }
            }
            let noDamageDoubleToIntersections = doubleDamageTo
              .filter(types => noDamageTo.includes(types))
            for (let i = 0; i < noDamageDoubleToIntersections.length; i++) {
              if (!noDamageDoubleToIntersections == '') {
                let typeIndex = doubleDamageTo
                  .indexOf(noDamageDoubleToIntersections[i])
                doubleDamageTo.splice(typeIndex, 1)
                noDamageDoubleToIntersections.splice(i, 1)
                i--
              }
            }
            // The types that appear more that one time are removed from the array
            let doubleDamageFromEdited = [...new Set(doubleDamageFrom)]
              .join().replace(regex, ' ')
            document.querySelector('.doubleDamageFromTypes')
              .innerHTML = `${doubleDamageFromEdited}`;
            let doubleDamageToEdited = [...new Set(doubleDamageTo)]
              .join().replace(regex, ' ')
            document.querySelector('.doubleDamageToTypes')
              .innerHTML = `${doubleDamageToEdited}`;
            let halfDamageFromEdited = [...new Set(halfDamageFrom)]
              .join().replace(regex, ' ')
            document.querySelector('.halfDamageFromTypes')
              .innerHTML = `${halfDamageFromEdited}`;
            let halfDamageToEdited = [...new Set(halfDamageTo)]
              .join().replace(regex, ' ')
            document.querySelector('.halfDamageToTypes')
              .innerHTML = `${halfDamageToEdited}`;
            let noDamageFromEdited = [...new Set(noDamageFrom)]
              .join().replace(regex, ' ')
            document.querySelector('.noDamageFromTypes')
              .innerHTML = `${noDamageFromEdited}`;
            let noDamageToEdited = [...new Set(noDamageTo)]
              .join().replace(regex, ' ')
            document.querySelector('.noDamageToTypes')
              .innerHTML = `${noDamageToEdited}`;
          })
      })
      // Each pokémon type that appears in the second slide are stylized
      for (let a = 0; a < typesNames.length; a++) {
        for (let i = 0; i < allTypesVerifier.length; i++) {
          if (typesNames[a] == allTypesVerifier[i]) {
            typesNames.splice(a, 1, allTypesStylized[i])
          }
        }
      }
      // The regex is used in the separation of the types
      let pokeTypesEdited = typesNames.join().replace(regex, ' | ')
      document.querySelector('.pokeType').innerHTML = `${pokeTypesEdited}`;
    })
}

// Contains each pokémon type to verify and relate with the styling loops above
var allTypesVerifier = ['water', 'normal', 'fire', 'electric', 'grass', 'bug',
  'flying', 'fighting', 'ice', 'rock', 'poison', 'psychic', 'ghost', 'dragon',
  'dark', 'steel', 'ground', 'fairy', 'none'];

// Contains each pokémon type stylized
var allTypesStylized = [`<span style="background: #6890F0; border-style: solid none; border-width: 1px; border-top-color: #98D8D8; border-bottom-color: #807870; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Water</span></span>`,
  `<span style="background: #A8A878; border-style: solid none; border-width: 1px; border-top-color: #D8D8D0; border-bottom-color: #705848; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Normal</span></span>`,
  `<span style="background: #F08030; border-style: solid none; border-width: 1px; border-top-color: #F8D030; border-bottom-color: #C03028; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fire</span></span>`,
  `<span style="background: #F8D030; border-style: solid none; border-width: 1px; border-top-color: #F8F878; border-bottom-color: #B8A038; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Electric</span></span>`,
  `<span style="background: #78C850; border-style: solid none; border-width: 1px; border-top-color: #C0F860; border-bottom-color: #588040; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Grass</span></span>`,
  `<span style="background: #A8B820; border-style: solid none; border-width: 1px; border-top-color: #D8E030; border-bottom-color: #A8B820; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Bug</span></span>`,
  `<span style="background: #A890F0; border-style: solid none; border-width: 1px; border-top-color: #C8C0F8; border-bottom-color: #705898; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Flying</span></span>`,
  `<span style="background: #C03028; border-style: solid none; border-width: 1px; border-top-color: #F08030; border-bottom-color: #484038; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fighting</span></span>`,
  `<span style="background: #98D8D8; border-style: solid none; border-width: 1px; border-top-color: #D0F8E8; border-bottom-color: #9090A0; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ice</span></span>`,
  `<span style="background: #B8A038; border-style: solid none; border-width: 1px; border-top-color: #E0C068; border-bottom-color: #886830; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Rock</span></span>`,
  `<span style="background: #A040A0; border-style: solid none; border-width: 1px; border-top-color: #D880B8; border-bottom-color: #483850; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Poison</span></span>`,
  `<span style="background: #F85888; border-style: solid none; border-width: 1px; border-top-color: #F8C0B0; border-bottom-color: #789010; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Psychic</span></span>`,
  `<span style="background: #705898; border-style: solid none; border-width: 1px; border-top-color: #A890F0; border-bottom-color: #483850; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ghost</span></span>`,
  `<span style="background: #7038F8; border-style: solid none; border-width: 1px; border-top-color: #B8A0F8; border-bottom-color: #483890; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Dragon</span></span>`,
  `<span style="background: #705848; border-style: solid none; border-width: 1px; border-top-color: #A8A878; border-bottom-color: #484038; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Dark</span></span>`,
  `<span style="background: #B8B8D0; border-style: solid none; border-width: 1px; border-top-color: #D8D8C0; border-bottom-color: #807870; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Steel</span></span>`,
  `<span style="background: #E0C068; border-style: solid none; border-width: 1px; border-top-color: #F8F878; border-bottom-color: #886830; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ground</span></span>`,
  `<span style="background: #F0B6BC; border-style: solid none; border-width: 1px; border-top-color: #F5CAD1; border-bottom-color: #905F63; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fairy</span></span>`,
  `<span style="background: #283d3d; border-style: solid none; border-width: 1px; border-top-color: #2f4f4f; border-bottom-color: #2f4f4f; border-radius: 5px; padding: 0.15em; font-size: 10pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">None</span></span>`];
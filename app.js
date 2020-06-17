function pokemonSearch() {
  let receiveData = document.getElementById('getPokemon').value.toLowerCase();
  returnPokemon(receiveData)
};

let input = document.getElementById("getPokemon");

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitPokemon").click();
  }
});

// <p class="titleNAME"></p>
// <p class="pokeName"></p>
// <p class="titleTYPE"></p>
// <p class="pokeType"></p>
// <p class="titleABILITY"></p>
// <p class="pokeAbilities"></p>

let returnPokemon = (receiveData) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${receiveData}`)
    .then((response) => {
      const pokemon = response.data;
      const ciclos = pokemon.abilities.length;
      let abilitiesNames = [];
      let typesNames = [];
      // var pokeTitle = document.createElement('div')
      // pokeTitle.classList.add('titleNAME')
      // document.querySelector('#secondSlide').append(pokeTitle)
      // var pokeName = document.createElement('p');
      // pokeName.classList.add('pokeName');
      // document.querySelector('.titleNAME').append(pokeName);


      pokemon.abilities.forEach(abilities => {
        abilitiesNames.push(abilities.ability.name);
        axios.get(`https://pokeapi.co/api/v2/ability/${abilities.ability.name}/`)
          .then(response => {
            const pokemon = response.data;
            let abilitiesEffects = [];
            pokemon.effect_entries.forEach(response => {
              if (response.language.name == "en") {
                abilitiesEffects.push(response.short_effect);
                if (ciclos == 1) {
                  var ability = document.createElement('p');
                  ability.classList.add('ability');
                  document.querySelector("#thirdSlide").append(ability)
                  ability.textContent = `${abilities.ability.name.charAt(0).toUpperCase() + abilities.ability.name.slice(1)} effect: ${abilitiesEffects}`
                }
                else {
                  var ability = document.createElement('p');
                  ability.classList.add('ability');
                  document.querySelector("#thirdSlide").append(ability)
                  ability.textContent = `${abilities.ability.name.charAt(0).toUpperCase() + abilities.ability.name.slice(1)} effect: ${abilitiesEffects}`
                  // var secondAbility = document.createElement('p');
                  // secondAbility.classList.add('secondAbility');
                  // document.querySelector("#thirdSlide").append(secondAbility)
                }
                // document.getElementById('thirdSlide').append(`${abilities.ability.name.charAt(0).toUpperCase() + abilities.ability.name.slice(1)} effect: ${abilitiesEffects}\n`);
              }
            });
          })
          .catch(error => console.log(error));
      })
      pokemon.types.forEach(pkmType => {
        typesNames.push(pkmType.type.name);
        axios.get(`https://pokeapi.co/api/v2/type/${pkmType.type.name}/`)
          .then(response => {
            const pokemon = response.data;
            let doubleDamageFrom = [];
            let doubleDamageTo = [];
            let halfDamageFrom = [];
            let halfDamageTo = [];
            pokemon.damage_relations.double_damage_from.forEach(response => {
              doubleDamageFrom.push(response.name);
            });
            pokemon.damage_relations.double_damage_to.forEach(response => {
              doubleDamageTo.push(response.name);
            });
            pokemon.damage_relations.half_damage_from.forEach(response => {
              halfDamageFrom.push(response.name);
            });
            pokemon.damage_relations.half_damage_to.forEach(response => {
              halfDamageTo.push(response.name);
            });
            document.getElementById('fourthSlide').innerText = `
            Receives double damage from: ${doubleDamageFrom}
            Receives half damage from: ${halfDamageFrom}
            Deals double damage against: ${doubleDamageTo}
            Deals half damage against: ${halfDamageTo}
            `
          })
      })
      document.getElementById('firstSlide').style.backgroundImage = `url(https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png)`;
      document.querySelector(".titleNAME").innerText = 'Name';
      document.querySelector('.pokeName').innerText = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
      document.querySelector('.titleTYPE').innerText = `Type`;
      let regex = /(,)/g;
      let pokeTypesEdited = typesNames.join().replace(regex, ' | ')
      let pokeAbilitiesEdited = abilitiesNames.join().replace(regex, ' | ')
      document.querySelector('.pokeType').innerText = `${pokeTypesEdited}`;
      document.querySelector(".titleABILITY").innerText = 'Ability';
      document.querySelector('.pokeAbilities').innerHTML = `${pokeAbilitiesEdited}`
      document.getElementById('thirdSlide').textContent = '';
    })
    .catch(error => console.log(error));
};

// document.querySelector('.pokeName').innerText = '';
// let pokeData = (pokemon) => {
//   return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(response => response.data);
// };

// let pokeName = () => {
//   pokeData()
//     .then(response => console.log(`Name: ${response.name.charAt(0).toUpperCase() + response.name.slice(1)}`))
// };

// let pokeAbilities = () => {
//   pokeData()
//     .then(response => {
//       let abilitiesNames = [];
//       response.abilities.forEach(abilities => {
//         abilitiesNames.push(abilities.ability.name);
//         axios.get(`https://pokeapi.co/api/v2/ability/${abilities.ability.name}/`)
//           .then(response => {
//             const pokemon = response.data;
//             let abilitiesEffects = [];
//             pokemon.effect_entries.forEach(response => {
//               if (response.language.name == "en") {
//                 abilitiesEffects.push(response.effect);
//                 console.log(`${abilities.ability.name.charAt(0).toUpperCase()
//                   + abilities.ability.name.slice(1)} effect: ${abilitiesEffects}`);
//               };
//             });
//           })
//           .catch(error => console.log(error));
//       });
//     })
//     .catch(error => console.log(error));
// };

// let pokeTypes = () => {
//   pokeData()
//     .then(response => {
//       let typesNames = [];
//       response.types.forEach(pkmType => {
//         typesNames.push(pkmType.type.name);
//         axios.get(`https://pokeapi.co/api/v2/type/${pkmType.type.name}/`)
//           .then(response => {
//             const pokemon = response.data;
//             let doubleDamageFrom = [];
//             let doubleDamageTo = [];
//             let halfDamageFrom = [];
//             let halfDamageTo = [];
//             pokemon.damage_relations.double_damage_from.forEach(response => {
//               doubleDamageFrom.push(response.name);
//             });
//             pokemon.damage_relations.double_damage_to.forEach(response => {
//               doubleDamageTo.push(response.name);
//             });
//             pokemon.damage_relations.half_damage_from.forEach(response => {
//               halfDamageFrom.push(response.name);
//             });
//             pokemon.damage_relations.half_damage_to.forEach(response => {
//               halfDamageTo.push(response.name);
//             });
//             console.log(`Type: ${typesNames}`);
//             console.log(`Weak to: ${doubleDamageFrom}`);
//             console.log(`Resistant to: ${halfDamageFrom}`);
//             console.log(`Deals double damage against (basing on attack type): ${doubleDamageTo}`);
//             console.log(`Deals half damage against (basing on attack type): ${halfDamageTo}`);
//           })
//           .catch(error => console.log(error));
//       });
//     })
//     .catch(error => console.log(error));
// };


// var tipoArr = ['water', 'normal', 'fire', 'electric', 'grass', 'bug', 'flying', 'fighting', 'ice', 'rock', 'poison', 'psychic',
//     'ghost', 'dragon', 'dark', 'steel', 'ground', 'fairy'];

// var spanTipos = [`<span style="background: #6890F0; border-style: solid none; border-width: 1px; border-top-color: #98D8D8; border-bottom-color: #807870; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Water</span></span>`,
//     `<span style="background: #A8A878; border-style: solid none; border-width: 1px; border-top-color: #D8D8D0; border-bottom-color: #705848; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Normal</span></span>`,
//     `<span style="background: #F08030; border-style: solid none; border-width: 1px; border-top-color: #F8D030; border-bottom-color: #C03028; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fire</span></span>`,
//     `<span style="background: #F8D030; border-style: solid none; border-width: 1px; border-top-color: #F8F878; border-bottom-color: #B8A038; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Electric</span></span>`,
//     `<span style="background: #78C850; border-style: solid none; border-width: 1px; border-top-color: #C0F860; border-bottom-color: #588040; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Grass</span></span>`,
//     `<span style="background: #A8B820; border-style: solid none; border-width: 1px; border-top-color: #D8E030; border-bottom-color: #A8B820; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Bug</span></span>`,
//     `<span style="background: #A890F0; border-style: solid none; border-width: 1px; border-top-color: #C8C0F8; border-bottom-color: #705898; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Flying</span></span>`,
//     `<span style="background: #C03028; border-style: solid none; border-width: 1px; border-top-color: #F08030; border-bottom-color: #484038; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fighting</span></span>`,
//     `<span style="background: #98D8D8; border-style: solid none; border-width: 1px; border-top-color: #D0F8E8; border-bottom-color: #9090A0; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ice</span></span>`,
//     `<span style="background: #B8A038; border-style: solid none; border-width: 1px; border-top-color: #E0C068; border-bottom-color: #886830; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Rock</span></span>`,
//     `<span style="background: #A040A0; border-style: solid none; border-width: 1px; border-top-color: #D880B8; border-bottom-color: #483850; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Poison</span></span>`,
//     `<span style="background: #F85888; border-style: solid none; border-width: 1px; border-top-color: #F8C0B0; border-bottom-color: #789010; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Psychic</span></span>`,
//     `<span style="background: #705898; border-style: solid none; border-width: 1px; border-top-color: #A890F0; border-bottom-color: #483850; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ghost</span></span>`,
//     `<span style="background: #7038F8; border-style: solid none; border-width: 1px; border-top-color: #B8A0F8; border-bottom-color: #483890; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Dragon</span></span>`,
//     `<span style="background: #705848; border-style: solid none; border-width: 1px; border-top-color: #A8A878; border-bottom-color: #484038; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Dark</span></span>`,
//     `<span style="background: #B8B8D0; border-style: solid none; border-width: 1px; border-top-color: #D8D8C0; border-bottom-color: #807870; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Steel</span></span>`,
//     `<span style="background: #E0C068; border-style: solid none; border-width: 1px; border-top-color: #F8F878; border-bottom-color: #886830; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Ground</span></span>`,
//     `<span style="background: #F0B6BC; border-style: solid none; border-width: 1px; border-top-color: #F5CAD1; border-bottom-color: #905F63; border-radius: 5px; padding: 0.15em; font-size: 8pt; color: #F8F8F8; text-shadow: 0px 1px 1px #807870;"><span style="color: #F8F8F8;">Fairy</span></span>`];


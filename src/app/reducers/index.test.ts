import reducers from './index'
import * as actions from '../actions'

import favouritesFixture from '../../../test/fixtures/favourites'
import pokemonFixture from '../../../test/fixtures/pokemon'

const stateFixutre = {
  favourites: favouritesFixture,
  selected: {}
}

describe('pokemon search reducers', () => {
  it('should add pokemon entries into a sorted list when adding new favourites', () => {
    const pokemon = {
      ...pokemonFixture,
      name: 'AAAPokemon'
    }

    expect(reducers(stateFixutre, {
      type: actions.ADD_TO_FAVOURITES,
      pokemon
    })).toEqual({
      favourites: [{
        name: 'AAAPokemon',
        image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'
      }, {
        name: 'Charizard',
        image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png'
      }, {
        name: 'Eevee',
        image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'
      }],
      selected: {}
    })
  })

  it('should remove an entry from the favourites list and maintain a sorted list', () => {
    expect(reducers(stateFixutre, {
      type: actions.REMOVE_FROM_FAVOURITES,
      pokemon: pokemonFixture
    })).toEqual({
      favourites: [{
        name: 'Charizard',
        image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png'
      }],
      selected: {}
    })
  })

})
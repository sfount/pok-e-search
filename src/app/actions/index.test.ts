import * as actions from './index'

import pokemonFixture from '../../../test/fixtures/pokemon'

describe('pokesearch actions', () => {
  it('should create an action to add a new favourite', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    const expectedAction = {
      type: actions.ADD_TO_FAVOURITES,
      pokemon: pokemonFixture
    }
    expect(actions.addFavourite(pokemonFixture)).toEqual(expectedAction)
    expect(spy).toHaveBeenCalledWith(pokemonFixture.name, pokemonFixture.image_url)
  })

  it('should create an action to remove a favourite and keep local storage in sync', () => {
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    const expectedAction = {
      type: actions.REMOVE_FROM_FAVOURITES,
      pokemon: pokemonFixture
    }

    expect(actions.removeFavourite(pokemonFixture)).toEqual(expectedAction)
    expect(spy).toHaveBeenCalledWith(pokemonFixture.name)
  })

  it('should create an action to clear a pokemon from the session', () => {
    const expectedAction = {
      type: actions.CLEAR_POKEMON
    }

    expect(actions.clearPokemon()).toEqual(expectedAction)
  })

})
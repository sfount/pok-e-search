import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as fetchMock from 'fetch-mock'

import pokemonFixture from '../../../test/fixtures/pokemon'
import * as actions from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('lookup pokemon action', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates select pokemon action following successful fetch', () => {
    fetchMock.getOnce('/api/pokemon/Eevee', {
      body: pokemonFixture,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actions.SEARCH_IN_PROGRESS },
      { type: actions.SELECT_POKEMON, pokemon: pokemonFixture }
    ]
    const store = mockStore({ todos: [] })

    // @ts-ignore
    return store.dispatch(actions.lookupPokemon('Eevee')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
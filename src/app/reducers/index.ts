import { combineReducers } from 'redux'
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, SELECT_POKEMON, CLEAR_POKEMON, SEARCH_IN_PROGRESS, SEARCH_FAILED } from './../actions'

function favourites(state = [], action) {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      const updatedFavourites = [
        ...state,
        {
          image_url: action.pokemon && action.pokemon.image_url,
          name: action.pokemon && action.pokemon.name
        }
      ]
      const favouritesIndex = updatedFavourites.reduce((aggregate, favourite) => {
        aggregate[favourite.name] = favourite
        return aggregate
      }, {})
      return updatedFavourites
        .map((favourite) => favourite.name)
        .sort()
        .map((name) => favouritesIndex[name])
    case REMOVE_FROM_FAVOURITES:
      return state.filter((favourite) => !(favourite.name === action.pokemon.name))
    default:
      return state
  }
}
function selected(state = {}, action) {
  switch (action.type) {
    case SELECT_POKEMON:
      return { pokemon: action.pokemon, inProgress: false, failedCode: null }
    case CLEAR_POKEMON:
      return { pokemon: null, inProgress: false, failedCode: null }
    case SEARCH_IN_PROGRESS:
      return {
        ...state,
        inProgress: true
      }
    case SEARCH_FAILED:
      return { pokemon: null, inProgress: false, failedCode: action.code }
    default:
      return state
  }
}

const pokemonSearch = combineReducers({
  favourites,
  selected
})

export default pokemonSearch
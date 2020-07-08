import { connect } from 'react-redux'
import { addFavourite, removeFavourite } from '../actions'

import RightPanel from '../components/RightPanel'

const getSelectedPokemonIsFavourite = (selectedPokemon, favourites) => {
  return selectedPokemon && favourites
    .map((favourite) => favourite.name)
    .includes(selectedPokemon.name)
}

/**
 *
 * @param state {
 *   selected {
 *    // full pokemon response from the backend, this can only be populated given
 *    // user action and it's existence is used to track session progress
 *    pokemon: Pokemon | undefined
 *   },
 *   // helper view into the state, an up to date repsentation of if the current
 *   // details view is already in the cached favourites list
 *   selectedPokemonIsFavourite: boolean
 * }
 */
const mapStateToProps = (state) => {
  return {
    selectedPokemon: state.selected.pokemon,
    selectedPokemonIsFavourite: getSelectedPokemonIsFavourite(state.selected.pokemon, state.favourites)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFavouriteClick: (pokemon, isPokemonFavourited) => {
      if (isPokemonFavourited) {
        dispatch(removeFavourite(pokemon))
      } else {
        dispatch(addFavourite(pokemon))
      }
    }
  }
}

const SessionRightPanel = connect(mapStateToProps, mapDispatchToProps)(RightPanel)

export default SessionRightPanel